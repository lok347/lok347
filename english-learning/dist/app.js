const lessons = [
  {
    theme: "HELLO", title: "Hello, little explorer!", goal: "今天只做一件事：开心地听见并说出 Hello。", hello: "Hello, little explorer!",
    words: [["hello", "👋", "Hello, Bear!"], ["bye-bye", "🙌", "Bye-bye, Bear!"], ["friend", "🧸", "My friend."]],
    action: ["👋", "Wave and say", "一起挥挥手，说：Hello!", "Wave your hand. Say: Hello!"],
    chant: ["Hello, hello!", "Wave to a friend.", "Bye-bye, bye-bye!", "See you again!"], quiz: 0
  },
  {
    theme: "FAMILY", title: "My lovely family", goal: "用照片或真人指一指，让声音直接连接家人。", hello: "Hello, family!",
    words: [["mommy", "👩", "Hello, Mommy!"], ["daddy", "👨", "Hello, Daddy!"], ["baby", "👶", "Hello, baby!"]],
    action: ["🤗", "Give a hug", "抱一抱，说：I love you!", "Give a hug. Say: I love you!"],
    chant: ["Mommy, daddy, baby too.", "My family, I love you!"], quiz: 1
  },
  {
    theme: "MY FACE", title: "Funny little face", goal: "边听边触摸五官，不要求孩子跟读。", hello: "Touch your face!",
    words: [["eyes", "👀", "Touch your eyes."], ["nose", "👃", "Touch your nose."], ["mouth", "👄", "Touch your mouth."]],
    action: ["😜", "Make a funny face", "一起做鬼脸，说：Funny face!", "Make a funny face!"],
    chant: ["Eyes, nose, mouth.", "This is my face!"], quiz: 1
  },
  {
    theme: "SNACK TIME", title: "Yummy, yummy!", goal: "把英语放进真实的加餐时间：吃、喝、还要。", hello: "Snack time!",
    words: [["eat", "😋", "I eat."], ["drink", "🥤", "I drink."], ["more", "➕", "More, please!"]],
    action: ["🥄", "Pretend to eat", "假装吃一口，说：Yummy!", "Take a bite. Say: Yummy!"],
    chant: ["Eat, eat, yummy food.", "Drink, drink, very good!"], quiz: 2
  },
  {
    theme: "COLORS", title: "A rainbow day", goal: "在家里寻找三种颜色，每次只说英文颜色词。", hello: "Let's find colors!",
    words: [["red", "🔴", "It is red."], ["blue", "🔵", "It is blue."], ["yellow", "🟡", "It is yellow."]],
    action: ["🌈", "Find a color", "找一样蓝色的东西，说：Blue!", "Find something blue!"],
    chant: ["Red and blue.", "Yellow too.", "Colors, colors, all around you!"], quiz: 1
  },
  {
    theme: "SIZE", title: "Big and small", goal: "拿一大一小两个玩具做对比，配合夸张手势。", hello: "Big or small?",
    words: [["big", "🐘", "A big elephant."], ["small", "🐭", "A small mouse."], ["little", "🐥", "A little chick."]],
    action: ["🙆", "Show me big", "张开双臂，说：Big!", "Stretch your arms. Big!"],
    chant: ["Big, big, big!", "Small, small, small!", "Big and small, I know them all!"], quiz: 1
  },
  {
    theme: "REVIEW", title: "Week one star mission", goal: "只复习孩子最熟悉的词，用游戏结束第一周。", hello: "You are a star!",
    words: [["hello", "👋", "Hello!"], ["eyes", "👀", "My eyes."], ["blue", "🔵", "Blue!"]],
    action: ["⭐", "Touch and shout", "家长说一个词，孩子快速指图。", "Listen, touch and say!"],
    chant: ["Hello, hello!", "Eyes and nose.", "Red and blue.", "Look at you!"], quiz: 2
  },
  {
    theme: "ANIMALS", title: "Animal friends", goal: "用动物叫声引起兴趣，再输入英语名称。", hello: "Hello, animals!",
    words: [["cat", "🐱", "A cat. Meow!"], ["dog", "🐶", "A dog. Woof!"], ["bird", "🐦", "A bird. Tweet! Tweet!"]],
    action: ["🐾", "Walk like an animal", "学小猫走路，说：Cat!", "Walk like a cat!"],
    chant: ["Cat says meow.", "Dog says woof.", "Bird says tweet, up on the roof!"], quiz: 0
  },
  {
    theme: "MOVE", title: "Move your body", goal: "三岁孩子靠动作记忆；让身体先理解，嘴巴随后。", hello: "Ready, set, go!",
    words: [["jump", "🦘", "Jump, jump!"], ["clap", "👏", "Clap your hands!"], ["turn", "🌀", "Turn around!"]],
    action: ["🎉", "Do all three", "跳一跳、拍拍手、转一圈。", "Jump, clap and turn around!"],
    chant: ["Jump up high.", "Clap one, two.", "Turn around.", "I see you!"], quiz: 1
  },
  {
    theme: "FEELINGS", title: "How do you feel?", goal: "用表情和语气演出来，允许孩子只用表情回应。", hello: "How do you feel?",
    words: [["happy", "😄", "I am happy."], ["sad", "😢", "I am sad."], ["sleepy", "🥱", "I am sleepy."]],
    action: ["🎭", "Show a feeling", "做一个开心表情，说：Happy!", "Show me a happy face!"],
    chant: ["Happy face, big smile.", "Sleepy eyes, rest a while."], quiz: 0
  },
  {
    theme: "DIRECTIONS", title: "Up, down, stop!", goal: "把口令变成追逐游戏，先听懂再表达。", hello: "Let's move!",
    words: [["up", "⬆️", "Hands up!"], ["down", "⬇️", "Hands down!"], ["stop", "🛑", "Stop!"]],
    action: ["🚦", "Play the stop game", "边走边听 Stop，马上变木头人。", "Go, go, go... Stop!"],
    chant: ["Hands up.", "Hands down.", "Turn around.", "Stop right now!"], quiz: 2
  },
  {
    theme: "NUMBERS", title: "One, two, three", goal: "数真实物品，不做数字认读和书写。", hello: "Let's count!",
    words: [["one", "1️⃣", "One star."], ["two", "2️⃣", "Two stars."], ["three", "3️⃣", "Three stars."]],
    action: ["🧱", "Count three toys", "摆出三个玩具，一件一件数。", "One, two, three!"],
    chant: ["One, two, three.", "Clap with me!", "One, two, three.", "Happy as can be!"], quiz: 2
  },
  {
    theme: "LET'S GO", title: "Open, close, go", goal: "在门、盒子和出发场景里使用三个生活口令。", hello: "Ready to go?",
    words: [["open", "📖", "Open it."], ["close", "📕", "Close it."], ["go", "🚀", "Let's go!"]],
    action: ["📦", "Open and close", "反复打开、合上一个盒子。", "Open. Close. Let's go!"],
    chant: ["Open, close.", "Open, close.", "Ready, steady, go!"], quiz: 0
  },
  {
    theme: "REVIEW", title: "Move and giggle", goal: "用动作复习第二周，孩子做对就立即称赞。", hello: "Let's play again!",
    words: [["dog", "🐶", "A dog!"], ["jump", "🦘", "Jump!"], ["happy", "😄", "I am happy!"]],
    action: ["🏆", "Animal action game", "像小狗一样跳，然后做开心脸。", "Jump like a happy dog!"],
    chant: ["Dog and cat.", "Jump and clap.", "Happy, happy.", "Just like that!"], quiz: 1
  },
  {
    theme: "FOOD", title: "Food I love", goal: "用真实食物练习，请孩子选择而不是背诵。", hello: "What do you want?",
    words: [["apple", "🍎", "An apple."], ["banana", "🍌", "A banana."], ["milk", "🥛", "Some milk."]],
    action: ["🛒", "Choose a snack", "拿两个食物问：Apple or banana?", "Apple or banana?"],
    chant: ["Apple, banana, milk for me.", "Yummy food: one, two, three!"], quiz: 0
  },
  {
    theme: "TOYS", title: "Let's play", goal: "把词直接放进玩耍，不需要中英文对照。", hello: "Let's play!",
    words: [["ball", "⚽", "A ball."], ["car", "🚗", "A car."], ["teddy", "🧸", "My teddy."]],
    action: ["⚽", "Roll the ball", "滚动小球，说：Roll the ball!", "Roll the ball!"],
    chant: ["Ball rolls fast.", "Car goes far.", "Teddy gives a hug."], quiz: 2
  },
  {
    theme: "CLEAN UP", title: "Wash and dry", goal: "洗手时固定使用这三个口令，形成场景记忆。", hello: "Time to wash!",
    words: [["wash", "🫧", "Wash your hands."], ["dry", "🧻", "Dry your hands."], ["clean", "✨", "All clean!"]],
    action: ["👐", "Wash your hands", "真实洗一次手，全程只说三句口令。", "Wash. Wash. Dry. All clean!"],
    chant: ["Wash, wash, wash.", "Dry, dry, dry.", "Clean little hands.", "High five!"], quiz: 2
  },
  {
    theme: "GET DRESSED", title: "Ready to go", goal: "穿衣时指向实物，一次输入一个词。", hello: "Let's get dressed!",
    words: [["shoes", "👟", "My shoes."], ["socks", "🧦", "My socks."], ["hat", "🧢", "My hat."]],
    action: ["👟", "Put on your shoes", "穿鞋时说：Shoes on!", "Put on your shoes!"],
    chant: ["Socks on.", "Shoes on.", "Hat on my head.", "Off we go!"], quiz: 2
  },
  {
    theme: "KIND WORDS", title: "Please and thank you", goal: "在真实请求中示范礼貌用语，不要求空口表演。", hello: "Kind words are magic!",
    words: [["please", "🙏", "More, please."], ["thank you", "💛", "Thank you!"], ["welcome", "🌟", "You're welcome!"]],
    action: ["🎁", "Pass a toy", "递玩具时完整演示礼貌对话。", "Here you are. Thank you!"],
    chant: ["Please is kind.", "Thank you too.", "You're welcome.", "I like you!"], quiz: 1
  },
  {
    theme: "MY CHOICE", title: "Yes, no, again", goal: "给孩子真实选择，让英语成为有用的表达工具。", hello: "You can choose!",
    words: [["yes", "👍", "Yes, please."], ["no", "🙅", "No, thank you."], ["again", "🔁", "Again, please!"]],
    action: ["🎵", "Choose a song", "唱完问 Again? 接受 Yes 或 No。", "Again? Yes or no?"],
    chant: ["Yes, please.", "No, thank you.", "Again, again!", "One more time!"], quiz: 2
  },
  {
    theme: "REVIEW", title: "I can choose", goal: "复习食物、玩具和礼貌表达，重点让孩子主动选择。", hello: "What do you want?",
    words: [["banana", "🍌", "Banana, please."], ["ball", "⚽", "The ball, please."], ["thank you", "💛", "Thank you!"]],
    action: ["🎪", "Little shop game", "家长当店员，孩子用词或手势选商品。", "What do you want?"],
    chant: ["Ball, please.", "Here you are.", "Thank you!", "You are a star!"], quiz: 0
  },
  {
    theme: "THE SKY", title: "Look at the sky", goal: "白天找太阳，夜晚找月亮，把词放回真实世界。", hello: "Look up!",
    words: [["sun", "☀️", "The sun."], ["moon", "🌙", "The moon."], ["star", "⭐", "A star."]],
    action: ["🔭", "Point to the sky", "指向窗外，说：Look at the sky!", "Look at the sky!"],
    chant: ["Sun in the day.", "Moon at night.", "Little stars are shining bright!"], quiz: 2
  },
  {
    theme: "WEATHER", title: "What's the weather?", goal: "每天看窗外 10 秒，说一句天气英语。", hello: "What's the weather?",
    words: [["rain", "🌧️", "I see rain."], ["cloud", "☁️", "I see a cloud."], ["wind", "🌬️", "I feel the wind."]],
    action: ["🪟", "Look outside", "一起看窗外，用动作演今天的天气。", "Look outside. What's the weather?"],
    chant: ["Rain comes down.", "Clouds float by.", "Wind says whoosh across the sky!"], quiz: 1
  },
  {
    theme: "NATURE", title: "A little nature walk", goal: "户外散步时听见、触摸、看见三个自然词。", hello: "Let's go outside!",
    words: [["tree", "🌳", "A big tree."], ["flower", "🌼", "A yellow flower."], ["leaf", "🍃", "A green leaf."]],
    action: ["🚶", "Take a tiny walk", "找一片叶子，说：I see a leaf!", "I see a leaf!"],
    chant: ["Tree so tall.", "Flower small.", "Little green leaves for us all!"], quiz: 2
  },
  {
    theme: "I SEE", title: "I see something!", goal: "把已知名词装进第一个完整句型 I see...", hello: "What do you see?",
    words: [["I see a cat", "🐱", "I see a cat."], ["I see a car", "🚗", "I see a car."], ["I see the moon", "🌙", "I see the moon."]],
    action: ["👀", "Play I see", "家长先说 I see...，孩子可指物完成回答。", "What do you see? I see a car!"],
    chant: ["I see a cat.", "I see a car.", "I see the moon.", "I see a star!"], quiz: 1
  },
  {
    theme: "I LIKE", title: "Things I like", goal: "孩子选择喜欢的东西，建立 I like... 句型。", hello: "What do you like?",
    words: [["I like apples", "🍎", "I like apples."], ["I like dogs", "🐶", "I like dogs."], ["I like stars", "⭐", "I like stars."]],
    action: ["💛", "Choose what you like", "展示两个选项，让孩子用指、说或点头回答。", "What do you like?"],
    chant: ["I like apples.", "I like stars.", "I like you just as you are!"], quiz: 0
  },
  {
    theme: "TAKING TURNS", title: "My turn, your turn", goal: "在滚球或搭积木时练习轮流，英语服务于社交。", hello: "Let's play together!",
    words: [["my turn", "🙋", "My turn!"], ["your turn", "👉", "Your turn!"], ["together", "🤝", "Let's play together!"]],
    action: ["⚽", "Take turns", "滚球游戏：轮到谁就说相应短语。", "My turn. Your turn. Together!"],
    chant: ["My turn.", "Your turn.", "Round and round.", "Friends together, happy sound!"], quiz: 1
  },
  {
    theme: "MONTH ONE", title: "Big star celebration", goal: "用熟悉场景完成月度复习，不增加新词。", hello: "You did it!",
    words: [["hello", "👋", "Hello, friend!"], ["I like it", "💛", "I like it!"], ["again, please", "🔁", "Again, please!"]],
    action: ["🎊", "Family English party", "选最喜欢的歌、游戏和词卡，各玩一次。", "Let's have an English party!"],
    chant: ["Hello, friend!", "Let's play.", "English time is fun today!"], quiz: 2
  }
];

const $ = (selector) => document.querySelector(selector);
const storageKey = "littleEnglishAdventure.v1";
const todayISO = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
const readState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.startDate && Array.isArray(saved.completed)) return saved;
  } catch (_) {}
  return { startDate: todayISO(), completed: [] };
};
let state = readState();
let todayNumber = Math.max(1, Math.floor((new Date(`${todayISO()}T00:00:00`) - new Date(`${state.startDate}T00:00:00`)) / 86400000) + 1);
let selectedDay = todayNumber;
let heard = new Set();
let quizSolved = false;
let voices = [];

const saveState = () => localStorage.setItem(storageKey, JSON.stringify(state));
const lessonFor = (day) => lessons[(day - 1) % lessons.length];
const englishVoice = () => voices.find(v => /Samantha|Ava|Google UK English Female|Microsoft Aria|Karen/i.test(v.name)) || voices.find(v => /^en[-_]/i.test(v.lang));

function loadVoices() { voices = window.speechSynthesis?.getVoices?.() || []; }
loadVoices();
if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = loadVoices;

function speak(text, button) {
  if (!("speechSynthesis" in window)) {
    alert("当前浏览器不支持语音播放，请使用最新版 Safari、Chrome 或 Edge。");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.72;
  utterance.pitch = 1.08;
  const voice = englishVoice();
  if (voice) utterance.voice = voice;
  if (button) {
    button.classList.add("speaking");
    utterance.onend = utterance.onerror = () => button.classList.remove("speaking");
  }
  window.speechSynthesis.speak(utterance);
}

function renderLesson() {
  const lesson = lessonFor(selectedDay);
  heard = new Set();
  quizSolved = false;
  $("#dayLabel").textContent = `DAY ${selectedDay}`;
  $("#themeLabel").textContent = lesson.theme;
  $("#lessonTitle").textContent = lesson.title;
  $("#lessonGoal").textContent = lesson.goal;
  $("#helloPhrase").textContent = lesson.hello;
  $("#moveEmoji").textContent = lesson.action[0];
  $("#moveTitle").textContent = lesson.action[1];
  $("#movePrompt").textContent = lesson.action[2];
  $("#chantLines").innerHTML = lesson.chant.map(line => `<span>${line}</span>`).join("");
  $("#wordProgress").textContent = "0 / 3";
  $("#quizFeedback").textContent = "";

  $("#wordGrid").innerHTML = lesson.words.map((word, index) => `
    <button class="word-card" type="button" data-word="${index}" aria-label="播放 ${word[0]}">
      <span class="word-emoji" aria-hidden="true">${word[1]}</span>
      <strong>${word[0]}</strong>
      <small>${word[2]}</small>
    </button>`).join("");

  $("#quizOptions").innerHTML = lesson.words.map((word, index) => `
    <button class="quiz-option" type="button" data-answer="${index}" aria-label="选项 ${word[0]}">${word[1]}</button>`).join("");

  document.querySelectorAll(".word-card").forEach(card => card.addEventListener("click", () => {
    const index = Number(card.dataset.word);
    heard.add(index);
    card.classList.add("heard");
    $("#wordProgress").textContent = `${heard.size} / 3`;
    speak(lesson.words[index][2], card);
    updateFinishButton();
  }));

  document.querySelectorAll(".quiz-option").forEach(option => option.addEventListener("click", () => {
    const answer = Number(option.dataset.answer);
    document.querySelectorAll(".quiz-option").forEach(item => item.classList.remove("correct", "wrong"));
    if (answer === lesson.quiz) {
      option.classList.add("correct");
      quizSolved = true;
      $("#quizFeedback").textContent = "Great job! You found it! ★";
      speak("Great job! You found it!");
    } else {
      option.classList.add("wrong");
      $("#quizFeedback").textContent = "Let's listen one more time.";
      speak(`Where is ${lesson.words[lesson.quiz][0]}?`);
    }
    updateFinishButton();
  }));

  const isDone = state.completed.includes(selectedDay);
  if (isDone) {
    heard = new Set([0, 1, 2]);
    quizSolved = true;
    document.querySelectorAll(".word-card").forEach(card => card.classList.add("heard"));
    $("#wordProgress").textContent = "3 / 3";
  }
  updateFinishButton();
  renderParent();
}

function updateFinishButton() {
  const done = state.completed.includes(selectedDay);
  const ready = heard.size === 3 && quizSolved;
  $("#finishButton").disabled = !ready;
  $("#finishButton strong").textContent = done ? "今天已完成，再拿一颗星" : "完成今天的探险";
}

function renderParent() {
  const lesson = lessonFor(selectedDay);
  $("#totalStars").textContent = state.completed.length;
  $("#streakCount").textContent = calculateStreak();
  $("#sessionSteps").innerHTML = [
    ["问候热身", "2 分钟"],
    [`三张词卡：${lesson.words.map(w => w[0]).join(" / ")}`, "4 分钟"],
    [`动作游戏：${lesson.action[1]}`, "4 分钟"],
    ["短韵律 + 找图挑战", "3 分钟"],
    ["拥抱、击掌、说 Bye-bye", "2 分钟"]
  ].map(([label, time]) => `<li><strong>${label}</strong><span>${time}</span></li>`).join("");

  const weekStart = Math.floor((selectedDay - 1) / 7) * 7 + 1;
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i);
  const labels = ["一", "二", "三", "四", "五", "六", "日"];
  $("#weekStrip").innerHTML = weekDays.map((day, i) => {
    const done = state.completed.includes(day);
    const selected = day === selectedDay;
    return `<button type="button" class="week-day${done ? " done" : ""}${selected ? " selected" : ""}" data-day="${day}"><small>周${labels[i]}</small><strong>${done ? "✓" : lessonFor(day).words[0][1]}</strong></button>`;
  }).join("");
  const completeCount = weekDays.filter(day => state.completed.includes(day)).length;
  $("#weekProgressText").textContent = `${completeCount} / 7 完成`;
  document.querySelectorAll(".week-day").forEach(button => button.addEventListener("click", () => {
    selectedDay = Number(button.dataset.day);
    showView("learn");
    renderLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
}

function calculateStreak() {
  let streak = 0;
  for (let day = todayNumber; day >= 1; day -= 1) {
    if (state.completed.includes(day)) streak += 1;
    else if (day !== todayNumber) break;
  }
  return Math.max(streak, state.completed.length ? 1 : 0);
}

function showView(view) {
  const isLearn = view === "learn";
  $("#learnView").hidden = !isLearn;
  $("#parentView").hidden = isLearn;
  document.querySelectorAll(".bottom-nav button").forEach(button => button.classList.toggle("active", button.dataset.view === view));
}

$("#helloButton").addEventListener("click", () => speak(lessonFor(selectedDay).hello, $("#helloButton")));
$("#actionButton").addEventListener("click", () => speak(lessonFor(selectedDay).action[3], $("#actionButton")));
$("#chantButton").addEventListener("click", () => speak(lessonFor(selectedDay).chant.join(" "), $("#chantButton")));
$("#quizPrompt").addEventListener("click", () => {
  const lesson = lessonFor(selectedDay);
  speak(`Where is ${lesson.words[lesson.quiz][0]}?`, $("#quizPrompt"));
});

$("#finishButton").addEventListener("click", () => {
  if (!state.completed.includes(selectedDay)) {
    state.completed.push(selectedDay);
    state.completed.sort((a, b) => a - b);
    saveState();
  }
  renderParent();
  $("#celebration").hidden = false;
  speak("Amazing! You did it! High five!");
});
$("#closeCelebration").addEventListener("click", () => { $("#celebration").hidden = true; });
$("#celebration").addEventListener("click", event => { if (event.target === $("#celebration")) $("#celebration").hidden = true; });

document.querySelectorAll(".bottom-nav button").forEach(button => button.addEventListener("click", () => {
  showView(button.dataset.view);
  window.scrollTo({ top: 0, behavior: "smooth" });
}));
$("#prevDay").addEventListener("click", () => { selectedDay = Math.max(1, selectedDay - 1); renderLesson(); });
$("#nextDay").addEventListener("click", () => { selectedDay += 1; renderLesson(); });
$("#todayDay").addEventListener("click", () => { selectedDay = todayNumber; renderLesson(); });
$("#resetButton").addEventListener("click", () => {
  if (!confirm("确定清除所有星星并从第 1 天重新开始吗？")) return;
  state = { startDate: todayISO(), completed: [] };
  todayNumber = 1;
  selectedDay = 1;
  saveState();
  renderLesson();
  showView("learn");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && window.speechSynthesis) window.speechSynthesis.cancel();
});

renderLesson();
