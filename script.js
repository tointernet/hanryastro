const questions = [
  { text: "Q1", element: "fire" },
  { text: "Q2", element: "earth" },
  { text: "Q3", element: "water" },
  { text: "Q4", element: "air" },
  { text: "Q5", element: "fire" },
  { text: "Q6", element: "earth" },
  { text: "Q7", element: "water" },
  { text: "Q8", element: "air" },
  { text: "Q9", element: "fire" },
  { text: "Q10", element: "earth" },
  { text: "Q11", element: "water" },
  { text: "Q12", element: "air" }
];

let current = 0;
let answers = [];
let locked = false;

function renderQuestion() {
  document.getElementById("question-text").innerText = questions[current].text;
  document.getElementById("progress").innerText = `${current + 1} / 12`;
}

function handleAnswer(isYes) {
  if (locked) return;
  locked = true;

  answers[current] = isYes;

  setTimeout(() => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
      locked = false;
    } else {
      showResult();
    }
  }, 200);
}

function showResult() {
  document.getElementById("question-page").style.display = "none";
  document.getElementById("result-page").style.display = "block";

  let elements = { fire:0, earth:0, water:0, air:0 };

  answers.forEach((ans, i) => {
    if (ans) {
      elements[questions[i].element]++;
    }
  }
                 const imgs = document.querySelectorAll("#share-card img");

Promise.all([...imgs].map(img => {
  return new Promise(resolve => {
    if (img.complete) resolve();
    else img.onload = resolve;
  });
}))
  .then(() => {
  // 圖片全部載入完成
});

  const container = document.getElementById("results");
  container.innerHTML = "";

  const order = ["fire", "earth", "water", "air"];

  order.forEach(key => {
    const count = elements[key];

    const img = document.createElement("img");
    img.src = getImage(key, count);
    img.classList.add("result-img");

    container.appendChild(img);
  });
}
document.getElementById("img-fire").src = getImage("fire", elements.fire);
document.getElementById("img-earth").src = getImage("earth", elements.earth);
document.getElementById("img-water").src = getImage("water", elements.water);
document.getElementById("img-air").src = getImage("air", elements.air);
// 🔥 圖片對應
function getImage(element, count) {
  if (count > 3) count = 3;
  if (count < 0) count = 0;

  return `images/${element}_${count}.png`;
}

// 📸 截圖
function capture() {
  html2canvas(document.getElementById("result-page")).then(canvas => {
    const link = document.createElement("a");
    link.download = "result.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
function capture() {
  const card = document.getElementById("share-card");

  // 先顯示
  card.style.opacity = "1";
  card.style.zIndex = "999";

  setTimeout(() => {
    html2canvas(card).then(canvas => {
      const link = document.createElement("a");
      link.download = "ig-result.png";
      link.href = canvas.toDataURL();
      link.click();

      // 截完再隱藏
      card.style.opacity = "0";
      card.style.zIndex = "-1";
    });
  }, 300); // 等圖片渲染
}
// 📤 分享
function share() {
  if (navigator.share) {
    navigator.share({
      title: "占卜結果",
      text: "來測看看你的結果",
      url: location.href
    });
  } else {
    alert("請手動分享網址");
  }
}

// 初始化
renderQuestion();
