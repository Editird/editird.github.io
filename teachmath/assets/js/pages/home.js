import { homeShowcaseLesson } from "../content/guidedLessons.js";
import { renderSolveTheater } from "../lib/solveTheater.js";
import { setupLayout } from "../main.js";
setupLayout();
const homeTheater = document.querySelector("[data-home-theater]");
if (homeTheater) {
    renderSolveTheater(homeTheater, homeShowcaseLesson);
}
