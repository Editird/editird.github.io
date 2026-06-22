import { escapeHtml, renderLatex } from "./math.js";
const theaterStates = new WeakMap();
export function renderSolveTheater(container, lesson) {
    const existing = theaterStates.get(container);
    const sameLesson = existing?.lesson.id === lesson.id;
    const state = existing ?? { lesson, index: 0 };
    state.lesson = lesson;
    if (!sameLesson) {
        state.index = 0;
    }
    state.index = clamp(state.index, 0, lesson.steps.length - 1);
    theaterStates.set(container, state);
    if (container.dataset.solveTheaterReady !== "true") {
        container.dataset.solveTheaterReady = "true";
        container.addEventListener("click", handleTheaterClick);
    }
    paintTheater(container, state);
}
function handleTheaterClick(event) {
    const container = event.currentTarget;
    const state = theaterStates.get(container);
    const button = event.target.closest("[data-solve-action]");
    if (!state || !button) {
        return;
    }
    const action = button.dataset.solveAction;
    if (action === "previous") {
        state.index = Math.max(0, state.index - 1);
    }
    else if (action === "next") {
        state.index = Math.min(state.lesson.steps.length - 1, state.index + 1);
    }
    else if (action === "jump") {
        state.index = clamp(Number(button.dataset.solveIndex), 0, state.lesson.steps.length - 1);
    }
    paintTheater(container, state);
}
function paintTheater(container, state) {
    const { lesson } = state;
    const step = lesson.steps[state.index];
    const atStart = state.index === 0;
    const atEnd = state.index === lesson.steps.length - 1;
    container.innerHTML = `
    <section class="solve-theater ${lesson.compact ? "compact" : ""}" aria-label="${escapeHtml(lesson.title)}">
      <div class="solve-screen">
        <div class="solve-topbar">
          <span class="solve-count">Step ${state.index + 1} / ${lesson.steps.length}</span>
          <span class="solve-live-dot" aria-hidden="true"></span>
        </div>
        <p class="solve-prompt"><strong>原題：</strong>${escapeHtml(lesson.prompt)}</p>
        <div class="solve-stage" aria-live="polite">
          ${renderTeachingStage(step)}
          ${renderExpression(step)}
        </div>
        <div class="solve-caption">
          <p>${escapeHtml(step.instruction)}</p>
        </div>
        <div class="solve-progress" aria-label="lesson progress">
          ${lesson.steps
        .map((_, index) => `
                <button
                  class="${index === state.index ? "active" : ""} ${index < state.index ? "done" : ""}"
                  type="button"
                  data-solve-action="jump"
                  data-solve-index="${index}"
                  aria-label="Go to step ${index + 1}"
                ></button>
              `)
        .join("")}
        </div>
        <div class="solve-controls">
          <button class="solve-nav-button secondary" type="button" data-solve-action="previous" ${atStart ? "disabled" : ""} aria-label="Previous step">‹</button>
          <button class="solve-next-button" type="button" data-solve-action="next" ${atEnd ? "disabled" : ""}>${atEnd ? "完成" : "下一步"}</button>
        </div>
      </div>
    </section>
  `;
    renderLatex(container);
}
function renderTeachingStage(step) {
    if (!step.stage) {
        return "";
    }
    const { stage } = step;
    return `
    <div class="teaching-stage" aria-label="${escapeHtml(stage.ariaLabel ?? step.instruction)}">
      <div class="focus-stack">
        ${stage.rows
        .map((row, rowIndex) => `
              <div class="focus-row">
                <span class="focus-operator">${rowIndex === stage.rows.length - 1 ? escapeHtml(stage.operator ?? "") : ""}</span>
                ${row.map(renderFocusCell).join("")}
              </div>
            `)
        .join("")}
        ${stage.result ? `
          <div class="focus-rule"></div>
          <div class="focus-row focus-result">
            <span class="focus-operator"></span>
            ${stage.result.map(renderFocusCell).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}
function renderFocusCell(cell) {
    const classes = [
        "focus-cell",
        cell.tone ? `tone-${cell.tone}` : "",
        cell.wide ? "wide" : "",
        cell.dimmed ? "is-dimmed" : ""
    ]
        .filter(Boolean)
        .join(" ");
    const body = cell.latex
        ? `<span data-latex="${escapeHtml(cell.latex)}"></span>`
        : `<span>${escapeHtml(cell.value ?? "")}</span>`;
    return `<span class="${classes}">${body}</span>`;
}
function renderExpression(step) {
    if (!step.expression) {
        return "";
    }
    if (!step.expressionIsLatex) {
        return `<div class="solve-expression">${escapeHtml(step.expression)}</div>`;
    }
    return `
    <div
      class="solve-expression math-expression"
      data-latex="${escapeHtml(step.expression)}"
      data-latex-display="true"
      ${step.altText ? `aria-label="${escapeHtml(step.altText)}"` : ""}
    ></div>
  `;
}
function clamp(value, min, max) {
    if (!Number.isFinite(value)) {
        return min;
    }
    return Math.min(max, Math.max(min, value));
}
