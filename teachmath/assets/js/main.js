import { latexBlock, renderLatex } from "./lib/math.js";
const chapters = [
    { href: "index.html", label: "今日焦點" },
    { href: "chapters/descriptive.html", label: "描述統計" },
    { href: "chapters/probability.html", label: "機率" },
    { href: "chapters/binomial.html", label: "二項分配" },
    { href: "chapters/normal.html", label: "常態分配" },
    { href: "chapters/exam-guide.html", label: "考前總整理" }
];
export function setupLayout(currentPath = window.location.pathname) {
    const navLinks = document.querySelectorAll("[data-nav-link]");
    navLinks.forEach((link) => {
        const linkPath = new URL(link.href).pathname;
        if (normalizePath(currentPath) === normalizePath(linkPath)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
    const select = document.querySelector("[data-mobile-nav]");
    if (select) {
        const inChapter = normalizePath(currentPath).startsWith("chapters/");
        select.innerHTML = chapters
            .map((chapter) => {
            const selected = normalizePath(currentPath) === normalizePath(chapter.href) ? "selected" : "";
            const href = inChapter && chapter.href === "index.html"
                ? "../index.html"
                : inChapter
                    ? chapter.href.replace("chapters/", "")
                    : chapter.href;
            return `<option value="${href}" ${selected}>${chapter.label}</option>`;
        })
            .join("");
        select.addEventListener("change", () => {
            window.location.href = select.value;
        });
    }
}
export function renderPracticeSet(container, questions, diagnostics) {
    let streak = 0;
    const diagnosticMap = new Map(diagnostics.map((item) => [item.id, item]));
    container.innerHTML = `
    <div class="practice-header">
      <span class="section-label">小練習</span>
      <span class="streak" data-practice-streak>連對：0</span>
    </div>
    ${questions
        .map((question, questionIndex) => `
          <div class="quiz-item">
            <strong>${question.prompt}</strong>
            <div class="quiz-options" role="group" aria-label="${question.prompt}">
              ${question.options
        .map((option, optionIndex) => `
                    <button class="ghost" type="button" data-practice-question="${questionIndex}" data-practice-option="${optionIndex}">
                      ${option.label}
                    </button>
                  `)
        .join("")}
            </div>
            <div class="feedback" data-practice-feedback="${questionIndex}" aria-live="polite"></div>
          </div>
        `)
        .join("")}
  `;
    container.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-practice-question]");
        if (!button) {
            return;
        }
        const questionIndex = Number(button.dataset.practiceQuestion);
        const optionIndex = Number(button.dataset.practiceOption);
        const question = questions[questionIndex];
        const option = question.options[optionIndex];
        const correct = optionIndex === question.answerIndex;
        streak = correct ? streak + 1 : 0;
        container
            .querySelectorAll(`button[data-practice-question="${questionIndex}"]`)
            .forEach((item) => item.classList.remove("correct", "wrong"));
        button.classList.add(correct ? "correct" : "wrong");
        const feedback = container.querySelector(`[data-practice-feedback="${questionIndex}"]`);
        if (feedback) {
            feedback.className = `feedback ${correct ? "good" : "bad"}`;
            if (correct) {
                feedback.innerHTML = `<strong>答對了。</strong><p>${question.successFeedback}</p>`;
            }
            else {
                const diagnostic = option.diagnosticId ? diagnosticMap.get(option.diagnosticId) : undefined;
                feedback.innerHTML = diagnostic
                    ? `
            <strong>${diagnostic.title}</strong>
            <p>${diagnostic.reason}</p>
            <p>${diagnostic.fix}</p>
            <p>${diagnostic.contrastExample}</p>
          `
                    : "<strong>先停一下。</strong><p>回到題目關鍵字，重新判斷它在考哪個概念。</p>";
            }
        }
        const streakLabel = container.querySelector("[data-practice-streak]");
        if (streakLabel) {
            streakLabel.textContent = `連對：${streak}`;
        }
    });
}
export function renderExamDrills(container, drills) {
    container.innerHTML = drills
        .map((drill) => `
        <article class="exam-card">
          <div class="trainer-topline">
            <span class="section-label">${drill.title}</span>
            <span class="tag">考題</span>
          </div>
          <p class="question-text">${drill.prompt}</p>
          <p class="exam-hint">先自己判斷題型，再打開解法。</p>
          <details class="exam-solution">
            <summary>查看分步解法</summary>
            <dl class="exam-steps">
              <div><dt>公式</dt><dd>${latexBlock(normalizeLatex(drill.formula))}</dd></div>
              <div><dt>代入</dt><dd>${latexBlock(normalizeLatex(drill.substitution))}</dd></div>
              <div><dt>答案</dt><dd>${drill.answer}</dd></div>
              <div><dt>考試提醒</dt><dd>${drill.examNote}</dd></div>
            </dl>
          </details>
        </article>
      `)
        .join("");
    renderLatex(container);
}
function normalizeLatex(value) {
    return value
        .replaceAll("<sup>", "^{")
        .replaceAll("</sup>", "}")
        .replaceAll("<sub>", "_{")
        .replaceAll("</sub>", "}")
        .replaceAll("繩", "\\div")
        .replaceAll("?", " ");
}
function normalizePath(path) {
    const cleanPath = path.replaceAll("\\", "/").split("?")[0].split("#")[0];
    if (cleanPath === "/" || cleanPath.endsWith("/")) {
        return "index.html";
    }
    const parts = cleanPath.split("/").filter(Boolean);
    const fileName = parts.at(-1) ?? "index.html";
    const parent = parts.at(-2) === "chapters" ? "chapters/" : "";
    return `${parent}${fileName}`;
}
