import { examGuideLessons } from "../content/guidedLessons.js";
import { renderLatex } from "../lib/math.js";
import { renderSolveTheater } from "../lib/solveTheater.js";
import { setupLayout } from "../main.js";

setupLayout();

const lessonRoot = document.querySelector<HTMLElement>("[data-exam-guide-lessons]");

if (lessonRoot) {
  lessonRoot.innerHTML = examGuideLessons
    .map(
      (lesson, index) => `
        <section class="lesson-section">
          <div class="section-heading">
            <span class="section-label">總複習 ${index + 1}</span>
            <h2>${lesson.title}</h2>
          </div>
          <div data-exam-guide-theater="${lesson.id}"></div>
        </section>
      `
    )
    .join("");

  for (const lesson of examGuideLessons) {
    const container = lessonRoot.querySelector<HTMLElement>(
      `[data-exam-guide-theater="${lesson.id}"]`
    );
    if (container) {
      renderSolveTheater(container, lesson);
    }
  }
}

renderLatex();
