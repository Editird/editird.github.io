export interface Diagnostic {
  id: string;
  title: string;
  reason: string;
  fix: string;
  contrastExample: string;
}

export const diagnostics: Diagnostic[] = [
  {
    id: "decimal-percent",
    title: "百分比沒有換成小數",
    reason: "30% 不能直接當 30 放進機率公式。",
    fix: "把百分比除以 100，30% 寫成 0.3。",
    contrastExample: "命中率 30%，二項公式裡的 p 是 0.3。"
  },
  {
    id: "missing-q",
    title: "忘記失敗率 q",
    reason: "二項分配同時需要成功率 p 與失敗率 q。",
    fix: "先算 q=1-p，再代入公式。",
    contrastExample: "p=0.3 時，q=1-0.3=0.7。"
  },
  {
    id: "wrong-sample-space",
    title: "樣本空間數錯",
    reason: "基本機率的分母必須是所有可能結果。",
    fix: "先列出全部結果，再數有利結果。",
    contrastExample: "一顆骰子出偶數是 {2,4,6}，所以是 3/6。"
  },
  {
    id: "conditional-denominator",
    title: "條件機率分母用錯",
    reason: "給定 B 發生後，分母要縮小成 B 的範圍。",
    fix: "把問題改讀成：在 B 裡面，有多少也屬於 A？",
    contrastExample: "12 人及格，其中 9 人交作業，P(交作業|及格)=9/12。"
  },
  {
    id: "independence-conditional",
    title: "把獨立和條件混在一起",
    reason: "獨立不是兩件事不能同時發生，而是 B 不改變 A 的機率。",
    fix: "檢查 P(A|B)=P(A)，或 P(A∩B)=P(A)P(B)。",
    contrastExample: "P(A)=0.3, P(B)=0.5, P(A∩B)=0.15，所以 A 與 B 獨立。"
  },
  {
    id: "expected-value-weights",
    title: "期望值忘記機率權重",
    reason: "E(X) 不是把 X 的數值直接平均。",
    fix: "每個 X 都要乘上它自己的 P(X)。",
    contrastExample: "X=0,1,2；P=0.2,0.5,0.3，E(X)=0(0.2)+1(0.5)+2(0.3)=1.1。"
  },
  {
    id: "missing-combination",
    title: "二項題漏掉 C(n,k)",
    reason: "p^kq^(n-k) 只是一種順序，不是剛好 k 次成功的全部情況。",
    fix: "看到「剛好 k 次」就補上組合數。",
    contrastExample: "8 次中剛好 2 次成功，要乘 C(8,2)。"
  },
  {
    id: "sequence-as-total",
    title: "把單一順序當成總機率",
    reason: "SSFFFFFF 只是其中一種排列。",
    fix: "若題目問剛好 2 次成功，還要乘上所有排列數。",
    contrastExample: "0.3^2(0.7)^6 是單一順序；P(X=2) 是 C(8,2)0.3^2(0.7)^6。"
  },
  {
    id: "sample-denominator",
    title: "樣本變異數分母用 n",
    reason: "樣本資料用來估計母體時，變異數分母要用 n-1。",
    fix: "題目出現樣本標準差或樣本變異數，就檢查 n-1。",
    contrastExample: "資料 4,6,8 的平方離差和是 8，樣本變異數是 8/(3-1)=4。"
  },
  {
    id: "normal-greater-tail",
    title: "右尾機率忘記用 1 減",
    reason: "常見 Z 表給的是左尾 P(Z<z)。",
    fix: "題目問大於時，用 1-P(Z<z)。",
    contrastExample: "P(Z>1)=1-0.8413=0.1587。"
  },
  {
    id: "normal-between",
    title: "介於兩數沒有相減",
    reason: "兩個界線之間的面積，是右界左尾減左界左尾。",
    fix: "先算兩個 Z，再做 P(Z<z_b)-P(Z<z_a)。",
    contrastExample: "P(60<X<80)=P(X<80)-P(X<60)。"
  },
  {
    id: "p-alpha-direction",
    title: "p-value 和 alpha 方向看反",
    reason: "p-value 越小，越不支持 H0。",
    fix: "p-value < alpha 時拒絕 H0。",
    contrastExample: "p-value=0.03, alpha=0.05，所以拒絕 H0。"
  },
  {
    id: "prove-null",
    title: "把不拒絕 H0 說成證明 H0",
    reason: "檢定只能說證據不足以拒絕 H0，不能說 H0 一定正確。",
    fix: "寫成「不拒絕 H0」或「沒有足夠證據拒絕 H0」。",
    contrastExample: "p-value=0.2 時，是不拒絕 H0，不是證明 H0 為真。"
  },
  {
    id: "wrong-question-type",
    title: "題型判斷錯誤",
    reason: "公式前先看題目在問描述、機率、分配、常態或推論。",
    fix: "圈出關鍵字，再選公式。",
    contrastExample: "固定次數且成功/失敗是二項；平均數區間是信賴區間。"
  }
];

export function getDiagnostic(id: string): Diagnostic {
  const diagnostic = diagnostics.find((item) => item.id === id);
  if (!diagnostic) {
    throw new Error(`Unknown diagnostic: ${id}`);
  }
  return diagnostic;
}
