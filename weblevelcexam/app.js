const state = {
  data: null,
  index: 0,
  score: 0,
  answered: false,
  picks: [],
};

const metaText = document.getElementById("metaText");
const sectionTag = document.getElementById("sectionTag");
const counterText = document.getElementById("counterText");
const questionTitle = document.getElementById("questionTitle");
const questionImage = document.getElementById("questionImage");
const questionImageWrap = questionImage.closest(".question-image-wrap");
const questionText = document.getElementById("questionText");
const questionNote = document.getElementById("questionNote");
const controls = document.getElementById("controls");
const resultBox = document.getElementById("resultBox");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const jumpSelect = document.getElementById("jumpSelect");
const jumpBtn = document.getElementById("jumpBtn");
const doneCard = document.getElementById("doneCard");
const questionCard = document.getElementById("questionCard");
const summaryText = document.getElementById("summaryText");
const restartBtn = document.getElementById("restartBtn");

function sectionLabel(section) {
  if (section === "true-false") return "是非題";
  if (section === "single") return "單選題";
  if (section === "multiple") return "複選題";
  return "圖像題";
}

function metaSummary(meta) {
  const parts = [`總題數 ${meta.total} 題`];
  const sectionOrder = [
    ["true-false", "是非"],
    ["single", "單選"],
    ["multiple", "複選"],
    ["image", "圖像"],
  ];

  sectionOrder.forEach(([key, label]) => {
    const count = meta.sections[key] || 0;
    if (count > 0) {
      parts.push(`${label} ${count} 題`);
    }
  });

  return parts.join("｜");
}

function extractNumericOptionsFromText(text) {
  if (!text) return [];

  const set = new Set();
  const re = /(?:^|\n)\s*([1-6])\.\s/gm;
  let m = re.exec(text);
  while (m) {
    set.add(m[1]);
    m = re.exec(text);
  }

  return [...set].sort((a, b) => Number(a) - Number(b));
}

function answerCharset(question) {
  if (question.answerType.startsWith("tf")) {
    return ["O", "X"];
  }

  const parsed = extractNumericOptionsFromText(question.text || "");
  if (parsed.length > 0) {
    return parsed;
  }

  if (question.section === "image") {
    return ["1", "2", "3", "4"];
  }

  return ["1", "2", "3", "4", "5"];
}

function ensurePickLength(question) {
  const len = question.answer.length || 1;
  if (state.picks.length !== len) {
    state.picks = new Array(len).fill("");
  }
}

function setPick(pos, value) {
  if (state.answered) return;
  state.picks[pos] = value;
  renderControls();
}

function renderControls() {
  const question = state.data.questions[state.index];
  ensurePickLength(question);

  controls.innerHTML = "";
  const charset = answerCharset(question);

  for (let i = 0; i < state.picks.length; i += 1) {
    const group = document.createElement("div");
    group.className = "group";

    const title = document.createElement("p");
    title.className = "group-title";
    title.textContent = state.picks.length === 1 ? "請選擇答案" : `第 ${i + 1} 格`;
    group.appendChild(title);

    const row = document.createElement("div");
    row.className = "option-row";

    charset.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      if (state.picks[i] === option) {
        btn.classList.add("active");
      }
      btn.textContent = option;
      btn.disabled = state.answered;
      btn.addEventListener("click", () => setPick(i, option));
      row.appendChild(btn);
    });

    group.appendChild(row);
    controls.appendChild(group);
  }
}

function renderQuestion() {
  const question = state.data.questions[state.index];
  state.answered = false;
  state.picks = [];

  sectionTag.textContent = sectionLabel(question.section);
  counterText.textContent = `${state.index + 1} / ${state.data.questions.length}`;
  jumpSelect.value = String(state.index);
  questionTitle.textContent = `第 ${state.index + 1} 題（PDF 題號 ${question.number}，第 ${question.page} 頁）`;

  if (question.useImage) {
    questionImageWrap.classList.remove("hidden");
    questionText.classList.add("hidden");
    questionImage.src = question.image;
  } else {
    questionImageWrap.classList.add("hidden");
    questionText.classList.remove("hidden");
    questionText.textContent = question.text || "（此題文字載入失敗）";
  }

  questionNote.textContent = question.note || "";

  resultBox.className = "result hidden";
  resultBox.textContent = "";

  submitBtn.disabled = false;
  nextBtn.disabled = true;

  renderControls();
}

function jumpToSelected() {
  if (!state.data) return;
  const selected = Number.parseInt(jumpSelect.value, 10);
  if (Number.isNaN(selected)) return;
  if (selected < 0 || selected >= state.data.questions.length) return;

  state.index = selected;
  renderQuestion();
}

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

function pickByKeyboard(option) {
  const question = state.data.questions[state.index];
  if (!question || state.answered) return;

  ensurePickLength(question);

  let slot = state.picks.findIndex((v) => !v);
  if (slot === -1) {
    slot = state.picks.length - 1;
  }

  state.picks[slot] = option;
  renderControls();
}

function removeLastPick() {
  const question = state.data.questions[state.index];
  if (!question || state.answered) return;

  ensurePickLength(question);

  for (let i = state.picks.length - 1; i >= 0; i -= 1) {
    if (state.picks[i]) {
      state.picks[i] = "";
      renderControls();
      return;
    }
  }
}

function onGlobalKeydown(event) {
  if (!state.data) return;

  const inTypingTarget = isTypingTarget(event.target);

  if (event.key === "Enter") {
    if (inTypingTarget) return;
    event.preventDefault();

    if (questionCard.classList.contains("hidden")) {
      return;
    }

    if (state.answered) {
      nextQuestion();
    } else {
      submitCurrent();
    }
    return;
  }

  if (inTypingTarget || questionCard.classList.contains("hidden")) return;

  if (event.key === "Backspace") {
    event.preventDefault();
    removeLastPick();
    return;
  }

  const question = state.data.questions[state.index];
  const charset = answerCharset(question);
  const key = event.key.toUpperCase();

  if (charset.includes(key)) {
    event.preventDefault();
    pickByKeyboard(key);
  }
}

function submitCurrent() {
  if (state.answered) return;

  const question = state.data.questions[state.index];
  const userAnswer = state.picks.join("");

  if (state.picks.some((v) => !v)) {
    resultBox.className = "result bad";
    resultBox.textContent = "請先把本題每一格都選完。";
    return;
  }

  const isCorrect = userAnswer === question.answer;
  if (isCorrect) {
    state.score += 1;
  }

  state.answered = true;
  submitBtn.disabled = true;
  nextBtn.disabled = false;

  resultBox.className = `result ${isCorrect ? "ok" : "bad"}`;
  resultBox.textContent = isCorrect
    ? `答對。正確答案：${question.answer}`
    : `答錯。你的答案：${userAnswer}；正確答案：${question.answer}`;

  renderControls();
}

function nextQuestion() {
  if (!state.answered) return;
  state.index += 1;

  if (state.index >= state.data.questions.length) {
    questionCard.classList.add("hidden");
    doneCard.classList.remove("hidden");

    const total = state.data.questions.length;
    const pct = Math.round((state.score / total) * 100);
    summaryText.textContent = `你完成 ${total} 題，答對 ${state.score} 題，得分 ${pct}%。`;
    return;
  }

  renderQuestion();
}

function restartExam() {
  state.index = 0;
  state.score = 0;
  doneCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  renderQuestion();
}

async function init() {
  const resp = await fetch("exam_data/questions.json");
  state.data = await resp.json();

  const meta = state.data.meta;
  metaText.textContent = metaSummary(meta);

  jumpSelect.innerHTML = "";
  state.data.questions.forEach((q, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = `第 ${idx + 1} 題（PDF 題號 ${q.number}）`;
    jumpSelect.appendChild(opt);
  });

  renderQuestion();
}

submitBtn.addEventListener("click", submitCurrent);
nextBtn.addEventListener("click", nextQuestion);
jumpBtn.addEventListener("click", jumpToSelected);
restartBtn.addEventListener("click", restartExam);
document.addEventListener("keydown", onGlobalKeydown);

init().catch((err) => {
  metaText.textContent = "載入失敗";
  questionTitle.textContent = "題庫讀取錯誤";
  questionNote.textContent = String(err);
});
