import { diagnostics } from "../content/diagnostics.js";
import { chapterLessons } from "../content/guidedLessons.js";
import { examDrills, practiceSets } from "../content/practice.js";
import { escapeHtml, renderLatex } from "../lib/math.js";
import { renderSolveTheater } from "../lib/solveTheater.js";
import { renderExamDrills, renderPracticeSet, setupLayout } from "../main.js";

setupLayout();

const lessonRoot = document.querySelector<HTMLElement>("[data-lesson-root]");
const practice = document.querySelector<HTMLElement>("[data-practice]");
const examContainer = document.querySelector<HTMLElement>("[data-exam-drills]");

if (lessonRoot) {
  renderChapterLessonList(lessonRoot, chapterLessons.binomial);
}

if (practice) {
  renderPracticeSet(practice, practiceSets.binomial, diagnostics);
}

if (examContainer) {
  renderExamDrills(examContainer, examDrills.binomial);
  renderLatex(examContainer);
}

renderLatex();

function renderChapterLessonList(container: HTMLElement, lessons: typeof chapterLessons.binomial): void {
  if (lessons.length === 1) {
    renderSolveTheater(container, lessons[0]);
    return;
  }

  container.innerHTML = lessons
    .map(
      (lesson) => `
        <section class="lesson-section">
          <div class="section-heading">
            <span class="section-label">${escapeHtml(lesson.label)}</span>
            <h2>${escapeHtml(lesson.title)}</h2>
          </div>
          <div data-chapter-theater="${escapeHtml(lesson.id)}"></div>
        </section>
      `
    )
    .join("");

  lessons.forEach((lesson) => {
    const target = container.querySelector<HTMLElement>(`[data-chapter-theater="${lesson.id}"]`);
    if (target) {
      renderSolveTheater(target, lesson);
    }
  });
}
