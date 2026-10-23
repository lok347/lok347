# AWS EC2 + 3x-ui + VLESS / REALITY / Vision 部署手册

> 实操整理：2026-08 至 2026-09 的 AWS Oregon 和 Singapore (SG1) 节点部署经验。更新日期：2026-10-23。
>
> **重要**：本文公开的是可复现的操作流程，**不是服务器配置备份**。公网 IP、EC2 密钥、面板随机入口、登录凭据、VLESS UUID、REALITY 私钥、公钥、Short ID 及完整节点链接均不公开。示例字段必须替换。尤其不要复制真实私钥或客户端分享链接进 GitHub。

## 0. 方案与实际验证情况

架构：

~~~text
Mac / iPhone（Shadowrocket / 其他支持 REALITY 的客户端）
                 │
                 │ VLESS + REALITY + XTLS Vision / TCP 443
                 ▼
         AWS EC2 公网 IPv4
                 │
          Xray-core + 3x-ui
                 │
             目标网站

面板管理（单独通道）：
Mac http://127.0.0.1:18080/<面板随机路径>/
   └─ SSH 本地转发 ─> EC2 127.0.0.1:<面板端口>
~~~

**两地部署方法基本相同；版本使用情况并不完全相同。**

| 项目 | Singapore / SG1 | Oregon |
| --- | --- | --- |
| 面板 | 3x-ui；安装时目标版本 v3.8.5 | 3x-ui v3.8.5 |
| 协议 | VLESS + REALITY + Vision | VLESS + REALITY + Vision |
| 入站端口 | TCP 443 | TCP 443 |
| Xray-core 实测 | **v26.9.9 可工作**，2026-09-26 已完成访问和测速 | **v26.6.27 恢复工作**；v26.9.9 曾出现客户端测试通过但 Google 不通 |
| 用途 | 主要节点（按当时测试结论；截至 2026-10-23 用户反馈仍在使用） | 备用节点 |
| 注意 | **不要因为 Oregon 的故障而主动降级 SG1** | 需要按节点分别测试兼容性 |

SG1 历史测试：Google generate_204 连续 20/20 次成功，约 0.287–0.405 秒；20MB 测试文件约 4.58 秒。当时也遇到过公司手机热点环境下的短时异常，复测时 22/443 端口和代理恢复，不能直接据此认定 EC2 故障。

> 早期还做过 **S-UI + sing-box** 测试。它是**另一套面板和核心**，不是本文的 3x-ui 安装流程；不要混用它们的服务名、面板端口或数据库路径。

## 1. AWS EC2 创建服务器

在 AWS Console → EC2 → **Launch instance / 启动实例**：

1. **Region**：SG 节点用 Asia Pacific (Singapore)，Oregon 用 US West (Oregon)。Region 只影响服务器实际位置，不改变下面的 VLESS/3x-ui 配置方法。
2. **AMI**：选择 Ubuntu Server LTS（如 22.04/24.04；以当前可用和兼容版本为准）。本教程的 SSH 用户是 Ubuntu 官方 AMI 常用的 ubuntu，其他 AMI 的默认用户名可能不同。
3. **Instance type**：选适合自己流量的实例规格；本流程无需 GPU。
4. **Key pair**：创建或选用 PEM 私钥，下载到 Mac，例如 ~/Downloads/aws-ec2.pem。丢失后不能从 AWS 重新下载同一私钥。**绝对不要上传 PEM 到 GitHub。**
5. **Network / Security Group**：允许 SSH 管理和代理服务，但**不公开 3x-ui 面板端口**。
6. 启动后复制当前实例的 **Public IPv4 address**；如长期使用，应了解 EC2 关闭/启动后的 IP 变化及 Elastic IP 的计费规则。

推荐安全组入站规则：

| Type | Protocol | Port | Source | 说明 |
| --- | --- | --- | --- | --- |
| SSH | TCP | 22 | **你的固定公网 IP/32** | SSH 管理，不建议全网开放 |
| Custom TCP | TCP | 443 | 0.0.0.0/0 | VLESS/REALITY 代理入站；若只需特定来源，可进一步收窄 |
| 3x-ui 面板 | — | 随机高位端口 | **不新增入站规则** | 面板仅用 SSH 隧道访问 |
| HTTP 80 | — | — | **不需要** | 本方案选择跳过面板 SSL，且用 SSH 隧道；若改用 Let's Encrypt 则另行评估 |

如果使用 IPv6，需要单独设置 IPv6 安全组；未配置时不要凭空假设 IPv6 可达。出站规则应允许正常软件安装、DNS、目标站访问。服务器若启用了 UFW，必须同步允许 SSH 和 TCP 443；**先确认 SSH 通路，切勿直接启用可能锁死自己的防火墙规则。**

## 2. Mac 连接 EC2（所有命令按顺序复制）

打开 Mac「终端」，先替换下载路径中的密钥文件名，再执行：

~~~bash
chmod 400 "$HOME/Downloads/aws-ec2.pem"
ssh -i "$HOME/Downloads/aws-ec2.pem" ubuntu@YOUR_EC2_PUBLIC_IP
~~~

其中 YOUR_EC2_PUBLIC_IP 需要替换成你自己的 EC2 公网 IPv4；这是**占位符**，不能原样执行。

首次 SSH 可能询问主机指纹：

~~~text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
~~~

确认所连主机确实是自己的实例后输入：

~~~text
yes
~~~

已登录 Ubuntu 后，依次执行：

~~~bash
sudo -i
apt update
apt install -y curl ca-certificates
~~~

安装前可选检查：

~~~bash
cat /etc/os-release
uname -m
ss -lntp | grep ':443' || true
systemctl status x-ui --no-pager || true
ufw status
~~~

如果 TCP 443 被 nginx、其他 xray 或别的服务占用，先弄清该服务用途，不要直接删服务或覆盖原有配置。

## 3. 安装 3x-ui：准确记录要输入什么

我们使用的是 3x-ui 官方项目 **MHSanaei/3x-ui**，不是教程站重新打包的脚本。

**历史实际使用的固定面板版本安装方式：**

~~~bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh) v3.8.5
~~~

该命令的脚本入口跟随官方 master，参数把 3x-ui 安装版本指定为 v3.8.5。将来 master 的交互界面可能发生变化；若追求**与当时安装器代码更一致**，可以从官方 v3.8.5 标签取脚本：

~~~bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/v3.8.5/install.sh) v3.8.5
~~~

> 仅在**新服务器**上执行安装流程。已在用的 SG1 **不要重新运行安装脚本覆盖配置**。更新/迁移前先做好私下备份。

### 3.1 安装交互：四次关键输入

**这是当时安装中最值得记下的「1 → n → 4 → y」操作顺序。** 其中你记得的「四个选择」主要指第 3 步的 SSL 证书四选一，不是数据库四选一。

**① Database Selection / 选择数据库**

~~~text
1) SQLite     (default)
2) PostgreSQL
~~~

单机自用选择（也通常可按提示直接回车使用默认值）：

~~~text
1
~~~

**② Would you like to customize the Panel Port settings?**

~~~text
Would you like to customize the Panel Port settings? (If not, a random port will be applied) [y/n]:
~~~

输入：

~~~text
n
~~~

即让安装器生成**随机面板端口**。把输出端口记在自己的密码管理器内；它**不是 443 代理端口**。

**③ SSL Certificate Setup：你记得的四选一**

~~~text
Choose SSL certificate setup method:

1. Let's Encrypt for Domain
2. Let's Encrypt for IP Address
3. Custom SSL Certificate
4. Skip SSL (advanced — behind reverse proxy / SSH tunnel only)
~~~

**我们实际选的是：**

~~~text
4
~~~

也就是**跳过面板 HTTPS 证书**；这只对随后将面板绑定 localhost 并且**仅通过 SSH 隧道**访问的方案安全。不要因为选了 4 就把未加密的 HTTP 面板开放到互联网。

**④ Bind the panel to 127.0.0.1 only?**

~~~text
Bind the panel to 127.0.0.1 only? (recommended — forces SSH tunnel / reverse-proxy access) [y/N]:
~~~

输入：

~~~text
y
~~~

这样面板只能在 EC2 自身 127.0.0.1 访问，外部管理须先建立 SSH 隧道。

**四步输入速查：**

| 出现提示 | 具体输入 | 结果 |
| --- | --- | --- |
| Database Selection | **1** | SQLite |
| Customize Panel Port? | **n** | 随机端口 |
| SSL Certificate Setup (1/2/3/4) | **4** | 跳过面板 SSL |
| Bind panel to 127.0.0.1 only? | **y** | 面板仅本机监听 |

安装后软件会生成或显示**面板用户名、随机密码、面板端口、随机 WebBasePath**。这些均须自行保存，不能放到公开仓库。安装器文字及提问顺序应以运行时为准；若未来版本变化，不要机械地将上述字符连发。

## 4. 访问 3x-ui：用 SSH 本地端口转发

**此步在 Mac 新开的终端窗口执行，不是在 EC2 root shell 内执行。** 把 REMOTE_PANEL_PORT 改成安装结果输出的**真实面板端口**，把 YOUR_EC2_PUBLIC_IP 改成实际公网 IPv4：

~~~bash
ssh -i "$HOME/Downloads/aws-ec2.pem" \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -o ExitOnForwardFailure=yes \
  -N \
  -L 18080:127.0.0.1:REMOTE_PANEL_PORT \
  ubuntu@YOUR_EC2_PUBLIC_IP
~~~

此命令启动后终端**保持占用属于正常现象**；关闭该终端或中断 SSH 后，面板网页就不能继续通过此隧道访问。

然后在 Mac 浏览器打开：

~~~text
http://127.0.0.1:18080/YOUR_RANDOM_PANEL_PATH/
~~~

这里的 18080 是**Mac 本地临时管理端口**；REMOTE_PANEL_PORT 是 EC2 上真实的面板端口；**两者不必相同**。路径末尾的 / 以及随机路径都以安装器/面板真实输出为准。

若忘了面板端口、WebBasePath 或密码，可以先 SSH 登入服务器，再运行：

~~~bash
sudo x-ui
~~~

根据实际版本的菜单查看或重置面板设置；不要把面板登录页 URL 粘贴到公开 Issue。

## 5. 3x-ui 内创建 VLESS + REALITY + Vision 入站

打开面板，前往 **Inbounds / 入站列表 → Add Inbound / 添加入站**。不同版本字段名称、标签位置略有差异，按含义配置：

| 字段 | 输入 / 选择 | 说明 |
| --- | --- | --- |
| Remark / 备注 | AWS-SG-Reality（或自定义） | 仅显示名 |
| Enable / 启用 | on | 启用该入站 |
| Protocol / 协议 | **VLESS** | 不选 VMess/Trojan |
| Listen / 监听地址 | 默认或全接口（常见 [::]） | 不要误设为 127.0.0.1，否则外部客户端无法接入 |
| Port / 端口 | **443** | 和 AWS 安全组 TCP 443 对应 |
| Clients / 客户端 | 添加一个客户端，生成新 UUID | **不**使用示例/别人的 UUID |
| Flow | **xtls-rprx-vision** | Vision |
| Encryption / Decryption | **none**（以界面适用字段为准） | VLESS 协议层 |
| Transport / 传输 | **TCP / RAW** | 不能误选 WS/gRPC |
| Security / 安全 | **REALITY** | 与面板自身选择跳过 SSL 是两回事 |
| Target / Dest | 例如 **www.microsoft.com:443** | REALITY 握手目标，示例并非 SG 当前真实目标 |
| Server Names / SNI | 例如 **www.microsoft.com** | 应与目标域名及真实握手条件兼容 |
| Fingerprint / uTLS | **chrome** | 客户端对应设置也用 chrome |
| Xver | **0** | 当时配置习惯 |
| SpiderX | **/** | 当时配置习惯（部分客户端展示） |
| Private/Public Key | 点击**生成** | 服务器保留 REALITY 私钥，客户端使用其对应公钥 |
| Short ID | 点击**生成** | 客户端须与实际服务端生成的值一致 |
| Sniffing / Routing | 默认先保持简单 | 故障定位前不额外添加复杂分流 |

**不要把 Target 当成自己的 EC2 IP**；REALITY 的目标/SNI应选可用、TLS 条件匹配的实际 HTTPS 站点。上表用 www.microsoft.com 仅展示字段格式，并非声称它适合每个环境。旧的 Oregon 配置也曾测试过其他 SNI；实际节点参数须以**当前面板**为准。

保存入站，确认已启用，Xray 正常运行且监听 443。确认端口未被其他程序占用：

~~~bash
sudo x-ui status
sudo ss -lntp | grep ':443'
~~~

如入站保存成功但 Xray 没有监听，应先读错误日志和检查 443 冲突、UUID/Short ID、REALITY 目标设置等，不要盲目重装。

## 6. Shadowrocket 导入和逐项核对

在 3x-ui 的入站客户端菜单，选择**导出/复制分享链接**（具体按钮依版本变化），在 Shadowrocket 等支持 REALITY 的客户端中导入。**不要在公开 issue、截图、GitHub 仓库留下实际分享链接。**

导入后需要逐项核对：

| 客户端字段 | 必须与服务器一致 |
| --- | --- |
| Server / Address | **EC2 公网 IP / 解析到它的域名**；绝不是 127.0.0.1 |
| Port | 443 |
| Type | VLESS |
| UUID / ID | 当前入站客户端的 UUID |
| Transport | TCP / RAW |
| TLS / Security | REALITY |
| Flow | xtls-rprx-vision |
| SNI / Server Name | 对应 REALITY serverName |
| Fingerprint | chrome |
| Public Key / pbk | 服务器 REALITY **公钥**，不是私钥 |
| Short ID / sid | 当前配置生成的 Short ID |

导入后先测连接，再打开实际网站。**客户端“测试通过”不等于所有网站可访问**；曾在 Oregon 遇到过已显示连接但 Google 访问失败的情况。

如果导出节点地址显示 127.0.0.1 或服务器私网地址，应改为**实际 EC2 公网 IPv4**后再测。这是早期部署中真实遇到过的错误。

## 7. 验收：要复制的检查命令

### 7.1 在 EC2 服务器检查

~~~bash
sudo x-ui status
sudo systemctl status x-ui --no-pager
sudo ss -lntp | grep ':443'
sudo ufw status
curl -I --max-time 10 https://www.google.com
~~~

服务器上 curl 通，仅证明 EC2 自身出站可能正常，**不能独立证明 VLESS 客户端路径正常**。

### 7.2 在 Mac 检查网络通断

先在 Mac 终端：

~~~bash
nc -vz YOUR_EC2_PUBLIC_IP 443
nc -vz YOUR_EC2_PUBLIC_IP 22
~~~

若已让 Mac 流量确实经过代理，可再检查目标网站及出口地址：

~~~bash
curl -sS -o /dev/null -w 'HTTP=%{http_code} time=%{time_total}s\n' \
  https://www.google.com/generate_204

curl -sS https://api.ipify.org
~~~

**注意**：以上 curl 是否经过代理取决于客户端的系统代理、TUN、路由规则和网络环境。若本机开启了 SOCKS5 端口，可明确指定它进行验证（将 LOCAL_SOCKS_PORT 改成客户端实际端口）：

~~~bash
curl --socks5-hostname 127.0.0.1:LOCAL_SOCKS_PORT \
  https://api.ipify.org
~~~

预期出口应与节点实际服务器出口一致。根据节点使用的出口地址，地理位置可表现为 Singapore 或 US。

## 8. 已遇到的故障与正确处理顺序

### A. Oregon：3x-ui 可运行，客户端测试通过，但访问 Google 不通

- 当时组合：3x-ui v3.8.5 + **Xray-core 26.9.9**。
- 实际处理：**仅把 Oregon 的 Xray-core 改回 v26.6.27**，问题得到恢复。
- 按面板中 **Xray 版本管理/版本切换**功能选择并安装目标版本；切换后可按需执行：

~~~bash
sudo x-ui restart-xray
sudo x-ui status
~~~

- **保留**原 UUID、REALITY 密钥、Short ID、目标/SNI、443 和客户端参数，避免一次改动多个变量。
- 结论仅适用于当时 Oregon 的实际故障。**SG1 用 26.9.9 测试成功，不建议主动套用 Oregon 回退方案。**
- 回退后 Oregon 仍有图片加载较慢的问题，需分别检测丢包、拥塞、线路和客户端 UDP/QUIC 行为；**恢复连通性不等于恢复最佳速度**。

### B. SG1：使用公司移动热点时短时无法访问

后来独立复测，EC2 的 443/22 TCP 连通、Google 204 和代理出口均恢复，符合**临时网络/路由或客户端会话异常**的表现；没有足够证据说明 EC2 必须重装。

建议检查顺序：不同 Wi‑Fi/5G 网络对照 → Shadowrocket 重连 → TCP 443 可达性 → SSH 22 → x-ui/Xray 服务 → 安全组/实例状态 → 最后才考虑更改软件版本或入站参数。

### C. SSH 可进，面板打不开

1. SSH 隧道的**右侧端口**写成 EC2 实际 panel port，而不是自动照填 443。
2. 访问的是 Mac 的 127.0.0.1:18080 及实际随机路径；不是直接访问 EC2_IP:PANEL_PORT。
3. SSH 隧道那个终端窗口需保持打开。
4. 确认面板确实监听在 EC2 127.0.0.1；**无需把面板端口加到 AWS 安全组**。
5. 如果本机 18080 已被占用，改用未占用的 Mac 本地端口（浏览器地址同步修改）。

### D. 端口可达但代理不通

分离定位四层：AWS SG / OS firewall → 服务器 TCP 443 是否监听 → Xray 入站和日志 → 客户端参数（UUID、REALITY 公钥、Short ID、SNI、flow、fp、地址）。不要仅凭 ping 或 Shadowrocket“延迟检测”判断业务 HTTPS 必然可用。

## 9. 在用节点维护：先备份，后改动

1. 在面板通过**备份/导出**功能保存真实配置，存入私人的、加密的位置；SQLite 常见数据库路径是 /etc/x-ui/x-ui.db。**数据库、备份、JSON 配置及任何密钥都不能提交公开仓库。**
2. 将 EC2 区域、实例 ID、面板端口和随机路径记录在密码管理器，**不要记录在本 README**。
3. 先确认版本与当前客户端可用性，再单独变更面板或 Xray；每次变更都做实际网站验证。
4. 维护 SG1 等现用服务器时，不要重新运行安装器、删除已有入站或复制另一节点的密钥。
5. 如要公开故障截图，先涂掉 IP、UUID、公钥/私钥、Short ID、面板路径、账号、分享二维码和订阅 URL。
6. 注意 EC2 实例、IPv4、数据传输和 Elastic IP 等可能产生的 AWS 费用。

## 10. 一页速查：从空白 EC2 到可用节点

~~~text
AWS：创建 Ubuntu EC2 → 下载 PEM → 安全组 22(本人 IP)、443(TCP)
Mac：chmod 400 PEM → ssh -i PEM ubuntu@公网 IP
EC2：sudo -i → apt update → apt install -y curl ca-certificates
安装：运行 MHSanaei/3x-ui 官方安装脚本，面板 v3.8.5
交互：数据库 1 → 随机面板端口 n → SSL 四选一选 4 → 本机绑定 y
保存：随机面板端口 + 账号密码 + WebBasePath（仅私人保存）
Mac：ssh -N -L 18080:127.0.0.1:远端面板端口 ubuntu@公网 IP
浏览器：http://127.0.0.1:18080/随机路径/
面板：Add Inbound → VLESS → TCP/RAW → 443 → REALITY → Vision
生成：UUID、REALITY key pair、Short ID
客户端：公网地址、443、UUID、SNI、Public Key、Short ID、chrome、Vision
验收：ss 监听 443 → nc TCP 443 → 实际代理出口 → Google 204 / 业务网站
~~~

**相关官方来源**：

- 3x-ui 官方项目与安装说明：https://github.com/MHSanaei/3x-ui
- 3x-ui v3.8.5 Release：https://github.com/MHSanaei/3x-ui/releases/tag/v3.8.5
- AWS EC2 官方文档：https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html

---

**文档边界**：本手册来自已记录的历史部署交互与测试，不是对 SG1 当前服务器的在线检查。2026-09 的版本/测试结果不保证 2026-10 当前软件状态。所有示例域名、IP 占位符和面板路径均须以实际机器值为准；没有从当前 EC2 读取 UUID、密钥、面板配置。
