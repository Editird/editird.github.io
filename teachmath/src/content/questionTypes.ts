export type QuestionType =
  | "描述統計"
  | "基本機率"
  | "機率函數"
  | "二項分配"
  | "常態分配"
  | "信賴區間"
  | "假設檢定";

export const questionTypeOptions: QuestionType[] = [
  "描述統計",
  "基本機率",
  "機率函數",
  "二項分配",
  "常態分配",
  "信賴區間",
  "假設檢定"
];

export interface QuestionTypeItem {
  id: string;
  prompt: string;
  answer: QuestionType;
  keywords: string[];
  reason: string[];
  distractors: Partial<Record<QuestionType, string>>;
}

export interface QuestionTypeGuide {
  href: string;
  label: string;
  focus: string;
}

export const questionTypeGuides: Record<QuestionType, QuestionTypeGuide> = {
  描述統計: {
    href: "/chapters/descriptive.html",
    label: "描述統計",
    focus: "平均數、變異數、標準差與資料摘要。"
  },
  基本機率: {
    href: "/chapters/probability.html",
    label: "基本機率",
    focus: "樣本空間、補集、條件機率與獨立。"
  },
  機率函數: {
    href: "/chapters/probability.html",
    label: "機率函數",
    focus: "P(X) 表格、期望值與變異數。"
  },
  二項分配: {
    href: "/chapters/binomial.html",
    label: "二項分配",
    focus: "固定 n 次、成功率 p、剛好 k 次。"
  },
  常態分配: {
    href: "/chapters/normal.html",
    label: "常態分配",
    focus: "X 轉 Z，判斷小於、大於或介於。"
  },
  信賴區間: {
    href: "/chapters/exam-guide.html",
    label: "信賴區間",
    focus: "估計值加減誤差界。"
  },
  假設檢定: {
    href: "/chapters/exam-guide.html",
    label: "假設檢定",
    focus: "H0、H1、alpha、p-value 與拒絕規則。"
  }
};

export const questionTypeItems: QuestionTypeItem[] = [
  {
    id: "binomial-free-throws",
    prompt: "一名籃球員每次罰球命中率為 0.3，連續罰球 8 次。求他剛好命中 2 次的機率。",
    answer: "二項分配",
    keywords: ["固定 8 次", "罰進/沒進", "剛好 2 次", "p=0.3"],
    reason: ["每次罰球結果只有命中或沒命中。", "次數固定。", "命中率固定。", "題目問剛好 k 次。"],
    distractors: {
      基本機率: "這不是單純數有利結果，因為有重複試驗與成功率。",
      描述統計: "題目不是整理資料，而是算事件機率。"
    }
  },
  {
    id: "descriptive-scores",
    prompt: "5 筆成績 60, 70, 70, 80, 100，求平均數和樣本標準差。",
    answer: "描述統計",
    keywords: ["成績資料", "平均數", "樣本標準差"],
    reason: ["題目給一串資料。", "要求摘要數值。", "沒有機率或抽樣推論條件。"],
    distractors: {
      常態分配: "有平均數或標準差不代表一定是常態分配。",
      信賴區間: "題目沒有要求估計母體區間。"
    }
  },
  {
    id: "normal-score",
    prompt: "某分數服從平均 70、標準差 10 的常態分配，求高於 85 的機率。",
    answer: "常態分配",
    keywords: ["常態分配", "平均 70", "標準差 10", "高於 85"],
    reason: ["題目明說常態。", "要把 X 轉成 Z。", "高於代表右尾。"],
    distractors: {
      描述統計: "這裡不是整理一串資料。",
      假設檢定: "題目沒有 H0、alpha 或 p-value。"
    }
  },
  {
    id: "confidence-interval",
    prompt: "樣本平均 1200、樣本標準差 160、n=64，求 95% 信賴區間。",
    answer: "信賴區間",
    keywords: ["樣本平均", "樣本標準差", "95%", "區間"],
    reason: ["題目要一段可能範圍。", "需要標準誤。", "答案形式是估計值加減誤差。"],
    distractors: {
      描述統計: "描述統計只整理樣本本身，不會給信賴程度。",
      常態分配: "常態臨界值只是工具，題型是信賴區間。"
    }
  },
  {
    id: "hypothesis-test",
    prompt: "檢定平均數是否為 10，p-value=0.03，alpha=0.05，是否拒絕 H0？",
    answer: "假設檢定",
    keywords: ["檢定", "p-value", "alpha", "H0"],
    reason: ["題目要求做決策。", "有 p-value 和 alpha。", "答案是拒絕或不拒絕 H0。"],
    distractors: {
      信賴區間: "信賴區間通常問一段範圍，不是 p-value 決策。",
      常態分配: "可能會用 Z 或 t，但題型是檢定。"
    }
  },
  {
    id: "basic-probability",
    prompt: "擲一顆公平骰子，出現偶數的機率？",
    answer: "基本機率",
    keywords: ["骰子", "偶數", "機率"],
    reason: ["先列樣本空間。", "偶數是 2,4,6。", "有利結果除以全部結果。"],
    distractors: {
      二項分配: "沒有固定重複 n 次的成功/失敗試驗。",
      描述統計: "題目不是整理資料。"
    }
  },
  {
    id: "probability-function",
    prompt: "X=0,1,2；P(X)=0.2,0.5,0.3，求 E(X) 和 Var(X)。",
    answer: "機率函數",
    keywords: ["P(X)", "E(X)", "Var(X)", "表格"],
    reason: ["題目給離散隨機變數。", "要用機率權重。", "變異數用 E(X^2)-[E(X)]^2。"],
    distractors: {
      基本機率: "這不是只算某個事件的機率。",
      描述統計: "P(X) 是機率權重，不是一串原始資料。"
    }
  }
];
