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
  document.getElementById("progress").innerText = `${current+1} / 12`;
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

  // 計算每個元素的「是」
  answers.forEach((ans, i) => {
    if (ans) {
      elements[questions[i].element]++;
    }
  });

  const container = document.getElementById("results");
  container.innerHTML = "";

  // 依序輸出四個元素（固定順序）
  const order = ["fire", "earth", "water", "air"];

  order.forEach(key => {
    const count = elements[key];

    const img = document.createElement("img");
    img.src = getImage(key, count);

    img.classList.add("result-img");

    container.appendChild(img);
  });
}

  document.getElementById("total").innerText = `是：${totalYes}`;

  const container = document.getElementById("results");
  container.innerHTML = "";

  for (let key in elements) {
    const div = document.createElement("div");
    div.innerHTML = `${key}：${elements[key]}`;
    container.appendChild(div);
  }
}

renderQuestion();
function capture() {
  html2canvas(document.getElementById("result-page")).then(canvas => {
    const link = document.createElement("a");
    link.download = "result.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function share() {
  if (navigator.share) {
    navigator.share({
      title: "占卜結果",
      text: "來測看看你的結果",
      url: location.href
    });
    function getImage(element, count) {
  // 保護機制（避免超過3）
  if (count > 3) count = 3;
  if (count < 0) count = 0;

  return `images/${element}_${count}.png`;
}
  } else {
    alert("請手動分享網址");
  }
}
