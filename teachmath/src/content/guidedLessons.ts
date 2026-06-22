import type { FocusCell, SolveLesson, SolveStep, TeachingStage } from "../lib/solveTheater.js";

const inCell = (value: string, wide = false): FocusCell => ({ value, tone: "accent", wide });
const outCell = (value: string, wide = false): FocusCell => ({ value, tone: "blue", wide });
const dimCell = (value: string, wide = false): FocusCell => ({ value, dimmed: true, wide });
const plainCell = (value: string, wide = false): FocusCell => ({ value, wide });

function formula(instruction: string, expression: string): SolveStep {
  return {
    instruction,
    expression,
    expressionIsLatex: true
  };
}

function stage(instruction: string, stage: TeachingStage): SolveStep {
  return { instruction, stage };
}

function line(
  instruction: string,
  cells: FocusCell[],
  result?: FocusCell[],
  ariaLabel?: string
): SolveStep {
  return stage(instruction, {
    rows: [cells],
    result,
    ariaLabel
  });
}

function pick(
  instruction: string,
  source: FocusCell[],
  selected: FocusCell[],
  ariaLabel?: string
): SolveStep {
  return stage(instruction, {
    rows: [source],
    result: selected,
    ariaLabel
  });
}

export const descriptiveLesson: SolveLesson = {
  id: "descriptive-sample-sd",
  label: "描述統計",
  title: "樣本標準差怎麼考",
  prompt: "資料 60, 70, 70, 80, 100，求樣本標準差。",
  result: "答案約為 15.17。",
  steps: [
    formula("列出樣本標準差公式。", "s=\\sqrt{\\frac{\\sum (x-\\bar{x})^2}{n-1}}"),
    line("先把 60 和 70 相加。", [inCell("60"), plainCell("+"), inCell("70")], [outCell("130")]),
    line("把 130 再加上 70。", [inCell("130"), plainCell("+"), inCell("70")], [outCell("200")]),
    line("把 200 再加上 80。", [inCell("200"), plainCell("+"), inCell("80")], [outCell("280")]),
    line("把 280 再加上 100。", [inCell("280"), plainCell("+"), inCell("100")], [outCell("380")]),
    line("把總和 380 除以 5。", [inCell("380"), plainCell("÷"), inCell("5")], [outCell("76")]),
    line("取第一個資料 60 減平均 76。", [inCell("60"), plainCell("-"), inCell("76")], [outCell("-16")]),
    line("取第二個資料 70 減平均 76。", [inCell("70"), plainCell("-"), inCell("76")], [outCell("-6")]),
    line("取第三個資料 70 減平均 76。", [inCell("70"), plainCell("-"), inCell("76")], [outCell("-6")]),
    line("取第四個資料 80 減平均 76。", [inCell("80"), plainCell("-"), inCell("76")], [outCell("4")]),
    line("取第五個資料 100 減平均 76。", [inCell("100"), plainCell("-"), inCell("76")], [outCell("24")]),
    line("把 -16 平方。", [inCell("-16"), plainCell("²")], [outCell("256")]),
    line("把 -6 平方。", [inCell("-6"), plainCell("²")], [outCell("36")]),
    line("把第二個 -6 平方。", [inCell("-6"), plainCell("²")], [outCell("36")]),
    line("把 4 平方。", [inCell("4"), plainCell("²")], [outCell("16")]),
    line("把 24 平方。", [inCell("24"), plainCell("²")], [outCell("576")]),
    line("先把 256 和 36 相加。", [inCell("256"), plainCell("+"), inCell("36")], [outCell("292")]),
    line("把 292 再加上 36。", [inCell("292"), plainCell("+"), inCell("36")], [outCell("328")]),
    line("把 328 再加上 16。", [inCell("328"), plainCell("+"), inCell("16")], [outCell("344")]),
    line("把 344 再加上 576。", [inCell("344"), plainCell("+"), inCell("576")], [outCell("920")]),
    line("把樣本數 5 減 1。", [inCell("5"), plainCell("-"), inCell("1")], [outCell("4")]),
    line("把 920 除以 4。", [inCell("920"), plainCell("÷"), inCell("4")], [outCell("230")]),
    line("把 230 開根號。", [plainCell("√"), inCell("230")], [outCell("15.17")])
  ]
};

export const probabilityLesson: SolveLesson = {
  id: "probability-function-ev-var",
  label: "機率函數",
  title: "表格題先算 E(X)，再算 Var(X)",
  prompt: "X=0,1,2；P(X)=0.2,0.5,0.3，求 E(X)、Var(X)。",
  result: "E(X)=1.1，Var(X)=0.49。",
  steps: [
    formula("列出期望值公式。", "E(X)=\\sum xP(x)"),
    pick(
      "取第一組數值。",
      [inCell("X=0"), inCell("P(X)=0.2", true), dimCell("X=1"), dimCell("P(X)=0.5", true), dimCell("X=2"), dimCell("P(X)=0.3", true)],
      [outCell("0"), outCell("0.2")]
    ),
    line("把 0 乘以 0.2。", [inCell("0"), plainCell("×"), inCell("0.2")], [outCell("0")]),
    pick(
      "取第二組數值。",
      [dimCell("X=0"), dimCell("P(X)=0.2", true), inCell("X=1"), inCell("P(X)=0.5", true), dimCell("X=2"), dimCell("P(X)=0.3", true)],
      [outCell("1"), outCell("0.5")]
    ),
    line("把 1 乘以 0.5。", [inCell("1"), plainCell("×"), inCell("0.5")], [outCell("0.5")]),
    pick(
      "取第三組數值。",
      [dimCell("X=0"), dimCell("P(X)=0.2", true), dimCell("X=1"), dimCell("P(X)=0.5", true), inCell("X=2"), inCell("P(X)=0.3", true)],
      [outCell("2"), outCell("0.3")]
    ),
    line("把 2 乘以 0.3。", [inCell("2"), plainCell("×"), inCell("0.3")], [outCell("0.6")]),
    line("先把 0 和 0.5 相加。", [inCell("0"), plainCell("+"), inCell("0.5")], [outCell("0.5")]),
    line("把 0.5 再加上 0.6。", [inCell("0.5"), plainCell("+"), inCell("0.6")], [outCell("1.1")]),
    formula("寫下期望值結果。", "E(X)=1.1"),
    formula("列出平方期望值公式。", "E(X^2)=\\sum x^2P(x)"),
    line("把第一個 X 值 0 平方。", [inCell("0"), plainCell("²")], [outCell("0")]),
    line("把 0 乘以 0.2。", [inCell("0"), plainCell("×"), inCell("0.2")], [outCell("0")]),
    line("把第二個 X 值 1 平方。", [inCell("1"), plainCell("²")], [outCell("1")]),
    line("把 1 乘以 0.5。", [inCell("1"), plainCell("×"), inCell("0.5")], [outCell("0.5")]),
    line("把第三個 X 值 2 平方。", [inCell("2"), plainCell("²")], [outCell("4")]),
    line("把 4 乘以 0.3。", [inCell("4"), plainCell("×"), inCell("0.3")], [outCell("1.2")]),
    line("先把 0 和 0.5 相加。", [inCell("0"), plainCell("+"), inCell("0.5")], [outCell("0.5")]),
    line("把 0.5 再加上 1.2。", [inCell("0.5"), plainCell("+"), inCell("1.2")], [outCell("1.7")]),
    formula("列出變異數公式。", "Var(X)=E(X^2)-[E(X)]^2"),
    line("把 1.1 平方。", [inCell("1.1"), plainCell("²")], [outCell("1.21")]),
    line("把 1.7 減掉 1.21。", [inCell("1.7"), plainCell("-"), inCell("1.21")], [outCell("0.49")]),
    formula("寫下變異數結果。", "Var(X)=0.49")
  ]
};

export const binomialLesson: SolveLesson = {
  id: "binomial-exact-two",
  label: "二項分配",
  title: "二項題先算 q，再代入公式",
  prompt: "一名籃球員每次罰球命中率為 0.3，連續罰球 8 次。求他剛好命中 2 次的機率。",
  result: "P(X=2)=0.29647548，約 29.65%。",
  steps: [
    formula("列出二項分配公式。", "P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}"),
    pick("從原題取 n 的值，也就是總共罰球 8 次。", [inCell("罰球 8 次", true), dimCell("命中率 0.3", true), dimCell("剛好命中 2 次", true)], [outCell("n=8")]),
    pick("從原題取 p 的值，也就是每次命中的機率 0.3。", [dimCell("罰球 8 次", true), inCell("命中率 0.3", true), dimCell("剛好命中 2 次", true)], [outCell("p=0.3")]),
    pick("從原題取 k 的值，也就是剛好命中 2 次。", [dimCell("罰球 8 次", true), dimCell("命中率 0.3", true), inCell("剛好命中 2 次", true)], [outCell("k=2")]),
    line("把 1 減掉 0.3。", [inCell("1"), plainCell("-"), inCell("0.3")], [outCell("0.7")]),
    line("把 8 減掉 2。", [inCell("8"), plainCell("-"), inCell("2")], [outCell("6")]),
    line("把 0.3 平方。", [inCell("0.3"), plainCell("²")], [outCell("0.09")]),
    line("把 0.7 的六次方算出來。", [inCell("0.7"), plainCell("⁶")], [outCell("0.117649", true)]),
    line("把 0.09 乘以 0.117649。", [inCell("0.09"), plainCell("×"), inCell("0.117649", true)], [outCell("0.01058841", true)]),
    formula("成功位置不一定在前兩球，所以要列出所有命中位置的排法。", "\\binom{8}{2}"),
    line("把 8 乘以 7。", [inCell("8"), plainCell("×"), inCell("7")], [outCell("56")]),
    line("把 2 乘以 1。", [inCell("2"), plainCell("×"), inCell("1")], [outCell("2")]),
    line("把 56 除以 2。", [inCell("56"), plainCell("÷"), inCell("2")], [outCell("28")]),
    line("把 28 乘以 0.01058841。", [inCell("28"), plainCell("×"), inCell("0.01058841", true)], [outCell("0.29647548", true)]),
    line("把 0.29647548 換成百分比。", [inCell("0.29647548", true), plainCell("×"), inCell("100")], [outCell("29.65%", true)])
  ]
};

export const normalLesson: SolveLesson = {
  id: "normal-z-greater",
  label: "常態分配",
  title: "常態題先把 X 轉成 Z",
  prompt: "平均 70，標準差 10，求 X 大於 80 的機率。",
  result: "P(X>80)=0.1587，約 15.87%。",
  steps: [
    formula("列出 Z 分數公式。", "Z=\\frac{X-\\mu}{\\sigma}"),
    pick("取 X 的值。", [inCell("X=80"), dimCell("mu=70"), dimCell("sigma=10", true)], [outCell("80")]),
    pick("取平均數。", [dimCell("X=80"), inCell("mu=70"), dimCell("sigma=10", true)], [outCell("70")]),
    line("把 80 減掉 70。", [inCell("80"), plainCell("-"), inCell("70")], [outCell("10")]),
    pick("取標準差。", [dimCell("X=80"), dimCell("mu=70"), inCell("sigma=10", true)], [outCell("10")]),
    line("把 10 除以 10。", [inCell("10"), plainCell("÷"), inCell("10")], [outCell("1")]),
    formula("查出 Z=1 的左尾機率。", "P(Z<1)=0.8413"),
    line("把 1 減掉 0.8413。", [inCell("1"), plainCell("-"), inCell("0.8413", true)], [outCell("0.1587", true)]),
    formula("寫回原題答案。", "P(X>80)=0.1587")
  ]
};

export const confidenceLesson: SolveLesson = {
  id: "confidence-interval-mean",
  label: "信賴區間",
  title: "平均數信賴區間：估計值加減誤差",
  prompt: "樣本平均 68，標準差 10，n=25，求 95% 信賴區間。",
  result: "95% 信賴區間為 [64.08, 71.92]。",
  steps: [
    formula("列出信賴區間公式。", "\\bar{x}\\pm z^*\\frac{s}{\\sqrt{n}}"),
    pick("取 95% 的臨界值。", [inCell("95%"), dimCell("90%"), dimCell("99%")], [outCell("1.96")]),
    line("把 25 開根號。", [plainCell("√"), inCell("25")], [outCell("5")]),
    line("把 10 除以 5。", [inCell("10"), plainCell("÷"), inCell("5")], [outCell("2")]),
    line("把 1.96 乘以 2。", [inCell("1.96"), plainCell("×"), inCell("2")], [outCell("3.92")]),
    line("把 68 減掉 3.92。", [inCell("68"), plainCell("-"), inCell("3.92")], [outCell("64.08")]),
    line("把 68 加上 3.92。", [inCell("68"), plainCell("+"), inCell("3.92")], [outCell("71.92")]),
    formula("寫出區間。", "[64.08,71.92]")
  ]
};

export const hypergeometricLesson: SolveLesson = {
  id: "hypergeometric-without-replacement",
  label: "超幾何分配",
  title: "超幾何分配：成功抽法乘失敗抽法再除以全部抽法",
  prompt: "20 件中有 7 件成功，不放回抽 5 件，剛好 2 件成功。",
  result: "機率約為 0.3875，也就是 38.75%。",
  steps: [
    formula("列出超幾何公式。", "P(X=x)=\\frac{\\binom{K}{x}\\binom{N-K}{n-x}}{\\binom{N}{n}}"),
    line("把 20 減掉 7。", [inCell("20"), plainCell("-"), inCell("7")], [outCell("13")]),
    line("把 5 減掉 2。", [inCell("5"), plainCell("-"), inCell("2")], [outCell("3")]),
    formula("列出成功抽法。", "\\binom{7}{2}"),
    line("把 7 乘以 6。", [inCell("7"), plainCell("×"), inCell("6")], [outCell("42")]),
    line("把 2 乘以 1。", [inCell("2"), plainCell("×"), inCell("1")], [outCell("2")]),
    line("把 42 除以 2。", [inCell("42"), plainCell("÷"), inCell("2")], [outCell("21")]),
    formula("列出失敗抽法。", "\\binom{13}{3}"),
    line("把 13 乘以 12。", [inCell("13"), plainCell("×"), inCell("12")], [outCell("156")]),
    line("把 156 乘以 11。", [inCell("156"), plainCell("×"), inCell("11")], [outCell("1716")]),
    line("把 3 乘以 2。", [inCell("3"), plainCell("×"), inCell("2")], [outCell("6")]),
    line("把 1716 除以 6。", [inCell("1716"), plainCell("÷"), inCell("6")], [outCell("286")]),
    formula("列出全部抽法。", "\\binom{20}{5}"),
    line("把 20 乘以 19。", [inCell("20"), plainCell("×"), inCell("19")], [outCell("380")]),
    line("把 380 乘以 18。", [inCell("380"), plainCell("×"), inCell("18")], [outCell("6840")]),
    line("把 6840 乘以 17。", [inCell("6840"), plainCell("×"), inCell("17")], [outCell("116280")]),
    line("把 116280 乘以 16。", [inCell("116280", true), plainCell("×"), inCell("16")], [outCell("1860480", true)]),
    line("把 5 乘以 4。", [inCell("5"), plainCell("×"), inCell("4")], [outCell("20")]),
    line("把 20 乘以 3。", [inCell("20"), plainCell("×"), inCell("3")], [outCell("60")]),
    line("把 60 乘以 2。", [inCell("60"), plainCell("×"), inCell("2")], [outCell("120")]),
    line("把 120 乘以 1。", [inCell("120"), plainCell("×"), inCell("1")], [outCell("120")]),
    line("把 1860480 除以 120。", [inCell("1860480", true), plainCell("÷"), inCell("120")], [outCell("15504", true)]),
    line("把 21 乘以 286。", [inCell("21"), plainCell("×"), inCell("286")], [outCell("6006")]),
    line("把 6006 除以 15504。", [inCell("6006"), plainCell("÷"), inCell("15504", true)], [outCell("0.3875")])
  ]
};

export const cltLesson: SolveLesson = {
  id: "sampling-distribution-clt",
  label: "抽樣分配",
  title: "樣本平均要用標準誤",
  prompt: "母平均 70，母標準差 12，n=36，求樣本平均大於 74 的機率。",
  result: "Z=2，右尾機率約為 0.0228。",
  steps: [
    formula("列出樣本平均的 Z 公式。", "Z=\\frac{\\bar{x}-\\mu}{\\sigma/\\sqrt{n}}"),
    line("把 36 開根號。", [plainCell("√"), inCell("36")], [outCell("6")]),
    line("把 12 除以 6。", [inCell("12"), plainCell("÷"), inCell("6")], [outCell("2")]),
    line("把 74 減掉 70。", [inCell("74"), plainCell("-"), inCell("70")], [outCell("4")]),
    line("把 4 除以 2。", [inCell("4"), plainCell("÷"), inCell("2")], [outCell("2")]),
    formula("查出 Z=2 的左尾機率。", "P(Z<2)=0.9772"),
    line("把 1 減掉 0.9772。", [inCell("1"), plainCell("-"), inCell("0.9772", true)], [outCell("0.0228", true)])
  ]
};

export const criticalValueLesson: SolveLesson = {
  id: "critical-values-choice",
  label: "t / chi-square / F",
  title: "臨界值題先代入對應統計量",
  prompt: "題目出現平均、變異數、兩個變異數或 ANOVA 時，該查哪張表？",
  result: "先判斷統計量，再查對應自由度與尾端。",
  steps: [
    formula("寫出平均數檢定的統計量。", "t=\\frac{\\bar{x}-\\mu_0}{s/\\sqrt{n}}"),
    line("把樣本數 n 減掉 1。", [inCell("n"), plainCell("-"), inCell("1")], [outCell("df")]),
    formula("寫出單一變異數檢定的統計量。", "\\chi^2=\\frac{(n-1)s^2}{\\sigma_0^2}"),
    line("把樣本數 n 減掉 1。", [inCell("n"), plainCell("-"), inCell("1")], [outCell("df")]),
    formula("寫出兩個變異數比例。", "F=\\frac{s_1^2}{s_2^2}"),
    line("把第一組樣本數減 1。", [inCell("n_1"), plainCell("-"), inCell("1")], [outCell("df_1")]),
    line("把第二組樣本數減 1。", [inCell("n_2"), plainCell("-"), inCell("1")], [outCell("df_2")])
  ]
};

export const conditionalProbabilityLesson: SolveLesson = {
  id: "conditional-union-job-offers",
  label: "基本機率",
  title: "條件機率題先補交集，再算聯集",
  prompt: "第一份工作機率 0.4，第二份工作機率 0.7，且 P(第二份|第一份)=0.5，求至少得到一份工作的機率。",
  result: "P(A∪B)=0.9。",
  steps: [
    formula("列出聯集公式。", "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)"),
    formula("列出條件機率乘回交集。", "P(A\\cap B)=P(A)P(B|A)"),
    pick("取 P(A) 的值。", [inCell("P(A)=0.4", true), dimCell("P(B)=0.7", true), dimCell("P(B|A)=0.5", true)], [outCell("0.4")]),
    pick("取 P(B|A) 的值。", [dimCell("P(A)=0.4", true), dimCell("P(B)=0.7", true), inCell("P(B|A)=0.5", true)], [outCell("0.5")]),
    line("把 0.4 乘以 0.5。", [inCell("0.4"), plainCell("×"), inCell("0.5")], [outCell("0.2")]),
    pick("取 P(B) 的值。", [dimCell("P(A)=0.4", true), inCell("P(B)=0.7", true), dimCell("P(A∩B)=0.2", true)], [outCell("0.7")]),
    line("先把 0.4 和 0.7 相加。", [inCell("0.4"), plainCell("+"), inCell("0.7")], [outCell("1.1")]),
    line("把 1.1 減掉 0.2。", [inCell("1.1"), plainCell("-"), inCell("0.2")], [outCell("0.9")]),
    formula("寫下至少一份的機率。", "P(A\\cup B)=0.9")
  ]
};

export const discreteCarSalesLesson: SolveLesson = {
  id: "discrete-car-sales-missing-c",
  label: "機率函數",
  title: "表格缺值題先用期望值補 c",
  prompt: "每日賣車數 X=0,1,2,3,4,5；P(X)=0.10,c,0.25,c,0.15,0.10，且 E(X)=2.4，求 P(X≥3)。",
  result: "P(X≥3)=0.45。",
  steps: [
    formula("列出期望值公式。", "E(X)=\\sum xP(x)"),
    line("把 0 乘以 0.10。", [inCell("0"), plainCell("×"), inCell("0.10")], [outCell("0")]),
    line("把 1 乘以 c。", [inCell("1"), plainCell("×"), inCell("c")], [outCell("c")]),
    line("把 2 乘以 0.25。", [inCell("2"), plainCell("×"), inCell("0.25")], [outCell("0.5")]),
    line("把 3 乘以 c。", [inCell("3"), plainCell("×"), inCell("c")], [outCell("3c")]),
    line("把 4 乘以 0.15。", [inCell("4"), plainCell("×"), inCell("0.15")], [outCell("0.6")]),
    line("把 5 乘以 0.10。", [inCell("5"), plainCell("×"), inCell("0.10")], [outCell("0.5")]),
    line("先把 c 和 3c 相加。", [inCell("c"), plainCell("+"), inCell("3c")], [outCell("4c")]),
    line("先把 0.5 和 0.6 相加。", [inCell("0.5"), plainCell("+"), inCell("0.6")], [outCell("1.1")]),
    line("把 1.1 再加上 0.5。", [inCell("1.1"), plainCell("+"), inCell("0.5")], [outCell("1.6")]),
    formula("把期望值寫成方程式。", "4c+1.6=2.4"),
    line("把 2.4 減掉 1.6。", [inCell("2.4"), plainCell("-"), inCell("1.6")], [outCell("0.8")]),
    line("把 0.8 除以 4。", [inCell("0.8"), plainCell("÷"), inCell("4")], [outCell("0.2")]),
    pick("取 X=3 的機率。", [dimCell("P(0)=0.10", true), dimCell("P(1)=0.2", true), dimCell("P(2)=0.25", true), inCell("P(3)=0.2", true), dimCell("P(4)=0.15", true), dimCell("P(5)=0.10", true)], [outCell("0.2")]),
    pick("取 X=4 的機率。", [dimCell("P(0)=0.10", true), dimCell("P(1)=0.2", true), dimCell("P(2)=0.25", true), dimCell("P(3)=0.2", true), inCell("P(4)=0.15", true), dimCell("P(5)=0.10", true)], [outCell("0.15")]),
    pick("取 X=5 的機率。", [dimCell("P(0)=0.10", true), dimCell("P(1)=0.2", true), dimCell("P(2)=0.25", true), dimCell("P(3)=0.2", true), dimCell("P(4)=0.15", true), inCell("P(5)=0.10", true)], [outCell("0.10")]),
    line("先把 0.2 和 0.15 相加。", [inCell("0.2"), plainCell("+"), inCell("0.15")], [outCell("0.35")]),
    line("把 0.35 再加上 0.10。", [inCell("0.35"), plainCell("+"), inCell("0.10")], [outCell("0.45")])
  ]
};

export const discreteDistributionLesson: SolveLesson = {
  id: "discrete-pmf-ev-var-photo",
  label: "機率函數",
  title: "離散機率函數一次算到 Var(X)",
  prompt: "X=1,3,5；f(x)=x/9，求 P(X≤4)、E(X)、E(X²)、Var(X)。",
  result: "P(X≤4)=4/9，E(X)=35/9，E(X²)=17，Var(X)=152/81。",
  steps: [
    formula("列出機率函數。", "f(x)=\\frac{x}{9},\\ x=1,3,5"),
    line("把 1 代入 x/9。", [inCell("1"), plainCell("÷"), inCell("9")], [outCell("1/9")]),
    line("把 3 代入 x/9。", [inCell("3"), plainCell("÷"), inCell("9")], [outCell("3/9")]),
    line("把 5 代入 x/9。", [inCell("5"), plainCell("÷"), inCell("9")], [outCell("5/9")]),
    pick("取 X=1 的機率。", [inCell("P(1)=1/9", true), dimCell("P(3)=3/9", true), dimCell("P(5)=5/9", true)], [outCell("1/9")]),
    pick("取 X=3 的機率。", [dimCell("P(1)=1/9", true), inCell("P(3)=3/9", true), dimCell("P(5)=5/9", true)], [outCell("3/9")]),
    line("把 1/9 和 3/9 相加。", [inCell("1/9"), plainCell("+"), inCell("3/9")], [outCell("4/9")]),
    formula("列出期望值公式。", "E(X)=\\sum xP(x)"),
    line("把 1 乘以 1/9。", [inCell("1"), plainCell("×"), inCell("1/9")], [outCell("1/9")]),
    line("把 3 乘以 3/9。", [inCell("3"), plainCell("×"), inCell("3/9")], [outCell("9/9")]),
    line("把 5 乘以 5/9。", [inCell("5"), plainCell("×"), inCell("5/9")], [outCell("25/9")]),
    line("先把 1/9 和 9/9 相加。", [inCell("1/9"), plainCell("+"), inCell("9/9")], [outCell("10/9")]),
    line("把 10/9 再加上 25/9。", [inCell("10/9"), plainCell("+"), inCell("25/9")], [outCell("35/9")]),
    formula("列出平方期望值公式。", "E(X^2)=\\sum x^2P(x)"),
    line("把 1 平方。", [inCell("1"), plainCell("²")], [outCell("1")]),
    line("把 1 乘以 1/9。", [inCell("1"), plainCell("×"), inCell("1/9")], [outCell("1/9")]),
    line("把 3 平方。", [inCell("3"), plainCell("²")], [outCell("9")]),
    line("把 9 乘以 3/9。", [inCell("9"), plainCell("×"), inCell("3/9")], [outCell("27/9")]),
    line("把 5 平方。", [inCell("5"), plainCell("²")], [outCell("25")]),
    line("把 25 乘以 5/9。", [inCell("25"), plainCell("×"), inCell("5/9")], [outCell("125/9")]),
    line("先把 1/9 和 27/9 相加。", [inCell("1/9"), plainCell("+"), inCell("27/9")], [outCell("28/9")]),
    line("把 28/9 再加上 125/9。", [inCell("28/9"), plainCell("+"), inCell("125/9")], [outCell("153/9")]),
    line("把 153/9 約成整數。", [inCell("153"), plainCell("÷"), inCell("9")], [outCell("17")]),
    formula("列出變異數公式。", "Var(X)=E(X^2)-[E(X)]^2"),
    line("把 35/9 平方。", [inCell("35/9"), plainCell("²")], [outCell("1225/81")]),
    line("把 17 換成分母 81。", [inCell("17"), plainCell("×"), inCell("81")], [outCell("1377/81", true)]),
    line("把 1377/81 減掉 1225/81。", [inCell("1377/81", true), plainCell("-"), inCell("1225/81", true)], [outCell("152/81", true)])
  ]
};

export const binomialIceLesson: SolveLesson = {
  id: "binomial-ice-cream-promo",
  label: "二項分配",
  title: "二項分配：10 人中至少 7 人購買",
  prompt: "活動吸引購買機率 0.7，隨機抽取 10 人，求恰有 3 人購買與至少 7 人購買的機率。",
  result: "P(X=3)=0.0090，P(X≥7)=0.6496。",
  steps: [
    formula("列出二項分配公式。", "P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}"),
    pick("取 n 的值。", [inCell("n=10"), dimCell("p=0.7"), dimCell("k=3")], [outCell("10")]),
    pick("取 p 的值。", [dimCell("n=10"), inCell("p=0.7"), dimCell("k=3")], [outCell("0.7")]),
    line("把 1 減掉 0.7。", [inCell("1"), plainCell("-"), inCell("0.7")], [outCell("0.3")]),
    pick("取 k=3。", [dimCell("n=10"), dimCell("p=0.7"), inCell("k=3")], [outCell("3")]),
    line("把 10 減掉 3。", [inCell("10"), plainCell("-"), inCell("3")], [outCell("7")]),
    formula("列出恰有 3 人購買。", "P(X=3)=\\binom{10}{3}(0.7)^3(0.3)^7"),
    line("把 0.7 的三次方算出來。", [inCell("0.7"), plainCell("³")], [outCell("0.343")]),
    line("把 0.3 的七次方算出來。", [inCell("0.3"), plainCell("⁷")], [outCell("0.0002187", true)]),
    line("把 0.343 乘以 0.0002187。", [inCell("0.343"), plainCell("×"), inCell("0.0002187", true)], [outCell("0.0000750141", true)]),
    line("把 10 乘以 9。", [inCell("10"), plainCell("×"), inCell("9")], [outCell("90")]),
    line("把 90 乘以 8。", [inCell("90"), plainCell("×"), inCell("8")], [outCell("720")]),
    line("把 3 乘以 2。", [inCell("3"), plainCell("×"), inCell("2")], [outCell("6")]),
    line("把 720 除以 6。", [inCell("720"), plainCell("÷"), inCell("6")], [outCell("120")]),
    line("把 120 乘以 0.0000750141。", [inCell("120"), plainCell("×"), inCell("0.0000750141", true)], [outCell("0.0090")]),
    formula("列出至少 7 人的四個機率。", "P(X\\ge 7)=0.2668+0.2335+0.1211+0.0282"),
    line("先把 0.2668 和 0.2335 相加。", [inCell("0.2668"), plainCell("+"), inCell("0.2335")], [outCell("0.5003")]),
    line("把 0.5003 再加上 0.1211。", [inCell("0.5003"), plainCell("+"), inCell("0.1211")], [outCell("0.6214")]),
    line("把 0.6214 再加上 0.0282。", [inCell("0.6214"), plainCell("+"), inCell("0.0282")], [outCell("0.6496")])
  ]
};

export const hypergeometricDentistLesson: SolveLesson = {
  id: "hypergeometric-dentist-brand",
  label: "超幾何分配",
  title: "不放回抽樣：推薦牙醫人數",
  prompt: "20 位牙醫中 12 位推薦某品牌，抽 5 位且不放回，求恰有 3 位推薦與至少 4 位推薦的機率。",
  result: "P(X=3)=0.3973，P(X≥4)=0.3065。",
  steps: [
    formula("列出超幾何公式。", "P(X=x)=\\frac{\\binom{K}{x}\\binom{N-K}{n-x}}{\\binom{N}{n}}"),
    line("把 20 減掉 12。", [inCell("20"), plainCell("-"), inCell("12")], [outCell("8")]),
    line("把 5 減掉 3。", [inCell("5"), plainCell("-"), inCell("3")], [outCell("2")]),
    formula("列出恰有 3 位推薦。", "\\frac{\\binom{12}{3}\\binom{8}{2}}{\\binom{20}{5}}"),
    line("把 12 乘以 11。", [inCell("12"), plainCell("×"), inCell("11")], [outCell("132")]),
    line("把 132 乘以 10。", [inCell("132"), plainCell("×"), inCell("10")], [outCell("1320")]),
    line("把 3 乘以 2。", [inCell("3"), plainCell("×"), inCell("2")], [outCell("6")]),
    line("把 1320 除以 6。", [inCell("1320"), plainCell("÷"), inCell("6")], [outCell("220")]),
    line("把 8 乘以 7。", [inCell("8"), plainCell("×"), inCell("7")], [outCell("56")]),
    line("把 56 除以 2。", [inCell("56"), plainCell("÷"), inCell("2")], [outCell("28")]),
    line("把 220 乘以 28。", [inCell("220"), plainCell("×"), inCell("28")], [outCell("6160")]),
    line("把 6160 除以 15504。", [inCell("6160"), plainCell("÷"), inCell("15504", true)], [outCell("0.3973")]),
    formula("列出至少 4 位推薦的兩個機率。", "P(X\\ge 4)=0.2554+0.0511"),
    line("把 0.2554 和 0.0511 相加。", [inCell("0.2554"), plainCell("+"), inCell("0.0511")], [outCell("0.3065")])
  ]
};

export const poissonClinicLesson: SolveLesson = {
  id: "poisson-clinic-cancel",
  label: "卜瓦松分配",
  title: "平均每天 2 次取消就用卜瓦松",
  prompt: "每天預約取消平均 2 次，令 X 為某天取消次數，求恰有 3 次與兩天都沒有取消的機率。",
  result: "P(X=3)=0.1804，兩天都沒有取消約 0.0183。",
  steps: [
    formula("列出卜瓦松公式。", "P(X=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}"),
    pick("取平均次數。", [inCell("lambda=2", true), dimCell("k=3")], [outCell("2")]),
    pick("取 k 的值。", [dimCell("lambda=2", true), inCell("k=3")], [outCell("3")]),
    line("把 2 的三次方算出來。", [inCell("2"), plainCell("³")], [outCell("8")]),
    line("把 3 乘以 2。", [inCell("3"), plainCell("×"), inCell("2")], [outCell("6")]),
    formula("代入恰有 3 次。", "P(X=3)=e^{-2}\\frac{8}{6}"),
    line("把 8 除以 6。", [inCell("8"), plainCell("÷"), inCell("6")], [outCell("1.3333")]),
    line("把 0.1353 乘以 1.3333。", [inCell("0.1353"), plainCell("×"), inCell("1.3333")], [outCell("0.1804")]),
    pick("取兩天的平均次數。", [inCell("2 天", true), inCell("每天 2 次", true)], [outCell("4")]),
    formula("列出兩天都沒有取消。", "P(X=0)=e^{-4}"),
    formula("寫下兩天沒有取消的機率。", "e^{-4}=0.0183")
  ]
};

export const uniformAnesthesiaLesson: SolveLesson = {
  id: "uniform-anesthesia-duration",
  label: "連續分配",
  title: "均勻分配用區間長度除以總長度",
  prompt: "麻醉效果時間服從 20 到 30 分鐘的均勻分配，求期望值、變異數與超過 27 分鐘的機率。",
  result: "E(X)=25，Var(X)=8.33，P(X>27)=0.3。",
  steps: [
    formula("列出均勻分配平均公式。", "E(X)=\\frac{a+b}{2}"),
    line("先把 20 和 30 相加。", [inCell("20"), plainCell("+"), inCell("30")], [outCell("50")]),
    line("把 50 除以 2。", [inCell("50"), plainCell("÷"), inCell("2")], [outCell("25")]),
    formula("列出均勻分配變異數公式。", "Var(X)=\\frac{(b-a)^2}{12}"),
    line("把 30 減掉 20。", [inCell("30"), plainCell("-"), inCell("20")], [outCell("10")]),
    line("把 10 平方。", [inCell("10"), plainCell("²")], [outCell("100")]),
    line("把 100 除以 12。", [inCell("100"), plainCell("÷"), inCell("12")], [outCell("8.33")]),
    line("把 30 減掉 27。", [inCell("30"), plainCell("-"), inCell("27")], [outCell("3")]),
    line("把 30 減掉 20。", [inCell("30"), plainCell("-"), inCell("20")], [outCell("10")]),
    line("把 3 除以 10。", [inCell("3"), plainCell("÷"), inCell("10")], [outCell("0.3")])
  ]
};

export const sampleProportionLesson: SolveLesson = {
  id: "sample-proportion-phone-brand",
  label: "抽樣分配",
  title: "樣本比例先算標準誤",
  prompt: "某廠牌手機市占率 12%，抽 150 人，求樣本比例誤差不超過 6% 的近似機率。",
  result: "近似機率約為 0.9762。",
  steps: [
    formula("列出樣本比例標準誤。", "SE=\\sqrt{\\frac{p(1-p)}{n}}"),
    line("把 1 減掉 0.12。", [inCell("1"), plainCell("-"), inCell("0.12")], [outCell("0.88")]),
    line("把 0.12 乘以 0.88。", [inCell("0.12"), plainCell("×"), inCell("0.88")], [outCell("0.1056")]),
    line("把 0.1056 除以 150。", [inCell("0.1056"), plainCell("÷"), inCell("150")], [outCell("0.000704", true)]),
    line("把 0.000704 開根號。", [plainCell("√"), inCell("0.000704", true)], [outCell("0.0265")]),
    formula("把誤差界線轉成 Z。", "Z=\\frac{0.06}{0.0265}"),
    line("把 0.06 除以 0.0265。", [inCell("0.06"), plainCell("÷"), inCell("0.0265")], [outCell("2.26")]),
    formula("把中間機率寫成左尾差。", "P(-2.26<Z<2.26)"),
    line("把 0.9881 減掉 0.0119。", [inCell("0.9881"), plainCell("-"), inCell("0.0119")], [outCell("0.9762")])
  ]
};

export const samplingMeanTLesson: SolveLesson = {
  id: "sampling-mean-t-commercials",
  label: "抽樣分配",
  title: "σ 未知的小樣本用 t 分配",
  prompt: "廣告蓋台時間近似常態，抽 25 段，樣本平均 20 秒，樣本標準差 6 秒，求樣本平均大於 23 秒的機率。",
  result: "t=2.5，右尾機率約為 0.01。",
  steps: [
    formula("列出 t 統計量。", "t=\\frac{\\bar{X}-\\mu}{S/\\sqrt{n}}"),
    line("把 25 開根號。", [plainCell("√"), inCell("25")], [outCell("5")]),
    line("把 6 除以 5。", [inCell("6"), plainCell("÷"), inCell("5")], [outCell("1.2")]),
    line("把 23 減掉 20。", [inCell("23"), plainCell("-"), inCell("20")], [outCell("3")]),
    line("把 3 除以 1.2。", [inCell("3"), plainCell("÷"), inCell("1.2")], [outCell("2.5")]),
    line("把 25 減掉 1。", [inCell("25"), plainCell("-"), inCell("1")], [outCell("24")]),
    formula("查 t 表右尾。", "P(t_{24}>2.5)\\approx 0.01")
  ]
};

export const confidenceSalesLesson: SolveLesson = {
  id: "confidence-sales-commission",
  label: "信賴區間",
  title: "業務月平均銷售額信賴區間",
  prompt: "每筆金額常態，平均 3500 元、標準差 1100 元；某業務一月約接 16 個訂單，求月平均銷售金額 95% 雙尾信賴區間。",
  result: "95% 信賴區間為 [2961, 4039]。",
  steps: [
    formula("列出平均數信賴區間。", "\\bar{x}\\pm z^*\\frac{\\sigma}{\\sqrt{n}}"),
    pick("取 95% 的臨界值。", [inCell("95%"), dimCell("90%"), dimCell("99%")], [outCell("1.96")]),
    line("把 16 開根號。", [plainCell("√"), inCell("16")], [outCell("4")]),
    line("把 1100 除以 4。", [inCell("1100"), plainCell("÷"), inCell("4")], [outCell("275")]),
    line("把 1.96 乘以 275。", [inCell("1.96"), plainCell("×"), inCell("275")], [outCell("539")]),
    line("把 3500 減掉 539。", [inCell("3500"), plainCell("-"), inCell("539")], [outCell("2961")]),
    line("把 3500 加上 539。", [inCell("3500"), plainCell("+"), inCell("539")], [outCell("4039")]),
    formula("寫出區間。", "[2961,4039]")
  ]
};

export const requiredSampleSizeLesson: SolveLesson = {
  id: "required-sample-size-poll",
  label: "信賴區間",
  title: "民調樣本數用誤差界反推",
  prompt: "電話民調想在 90% 信賴度下，把抽樣誤差控制在 3% 以下，求至少需要多少有效樣本。",
  result: "至少約 752 人。",
  steps: [
    formula("列出保守樣本數公式。", "n=\\frac{(z^*)^2}{4E^2}"),
    pick("取 90% 的臨界值。", [inCell("90%"), dimCell("95%"), dimCell("99%")], [outCell("1.645")]),
    pick("取抽樣誤差 E。", [inCell("3%"), dimCell("5%")], [outCell("0.03")]),
    line("把 1.645 平方。", [inCell("1.645"), plainCell("²")], [outCell("2.706")]),
    line("把 0.03 平方。", [inCell("0.03"), plainCell("²")], [outCell("0.0009")]),
    line("把 4 乘以 0.0009。", [inCell("4"), plainCell("×"), inCell("0.0009")], [outCell("0.0036")]),
    line("把 2.706 除以 0.0036。", [inCell("2.706"), plainCell("÷"), inCell("0.0036")], [outCell("751.7")]),
    formula("把樣本數無條件進位。", "n=752")
  ]
};

export const homeShowcaseLesson = binomialLesson;

export const chapterLessons: Record<string, SolveLesson[]> = {
  descriptive: [descriptiveLesson],
  probability: [probabilityLesson, conditionalProbabilityLesson, discreteCarSalesLesson, discreteDistributionLesson],
  binomial: [binomialLesson, binomialIceLesson, hypergeometricDentistLesson],
  normal: [normalLesson, sampleProportionLesson, samplingMeanTLesson]
};

export const examGuideLessons: SolveLesson[] = [
  probabilityLesson,
  conditionalProbabilityLesson,
  discreteCarSalesLesson,
  discreteDistributionLesson,
  binomialLesson,
  binomialIceLesson,
  normalLesson,
  hypergeometricLesson,
  hypergeometricDentistLesson,
  poissonClinicLesson,
  uniformAnesthesiaLesson,
  cltLesson,
  sampleProportionLesson,
  samplingMeanTLesson,
  confidenceLesson,
  confidenceSalesLesson,
  requiredSampleSizeLesson,
  criticalValueLesson,
  descriptiveLesson
];
