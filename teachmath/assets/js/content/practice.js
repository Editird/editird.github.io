export const practiceSets = {
    descriptive: [
        {
            id: "sample-variance-denominator",
            chapter: "descriptive",
            prompt: "資料 4, 6, 8 的平方離差和是 8。樣本變異數要怎麼算？",
            answerIndex: 1,
            successFeedback: "樣本變異數分母用 n-1，所以 8/(3-1)=4。",
            options: [
                { label: "8/3", diagnosticId: "sample-denominator" },
                { label: "8/2" },
                { label: "8/4", diagnosticId: "sample-denominator" }
            ]
        },
        {
            id: "sd-meaning",
            chapter: "descriptive",
            prompt: "標準差最接近下列哪一個意思？",
            answerIndex: 0,
            successFeedback: "標準差描述資料通常離平均數多遠。",
            options: [
                { label: "資料離平均數的典型距離" },
                { label: "資料的最大值", diagnosticId: "wrong-question-type" },
                { label: "資料筆數", diagnosticId: "wrong-question-type" }
            ]
        },
        {
            id: "descriptive-type",
            chapter: "descriptive",
            prompt: "題目給 60, 70, 80, 90，要求平均和中位數。這是哪一類？",
            answerIndex: 0,
            successFeedback: "給一串資料並要求摘要，這是描述統計。",
            options: [
                { label: "描述統計" },
                { label: "二項分配", diagnosticId: "wrong-question-type" },
                { label: "假設檢定", diagnosticId: "wrong-question-type" }
            ]
        }
    ],
    probability: [
        {
            id: "probability-dice-basic",
            chapter: "probability",
            prompt: "擲一顆公平骰子，出現偶數的機率？",
            answerIndex: 0,
            successFeedback: "偶數是 2,4,6，共 3 個；全部 6 個，所以 3/6=0.5。",
            options: [
                { label: "3/6 = 0.5" },
                { label: "2/6", diagnosticId: "wrong-sample-space" },
                { label: "1/6", diagnosticId: "wrong-sample-space" }
            ]
        },
        {
            id: "conditional-denominator",
            chapter: "probability",
            prompt: "40 人中 12 人及格，其中 9 人有交作業。已知及格，交作業的機率？",
            answerIndex: 1,
            successFeedback: "已知及格後，分母變成 12，所以是 9/12。",
            options: [
                { label: "9/40", diagnosticId: "conditional-denominator" },
                { label: "9/12" },
                { label: "12/40", diagnosticId: "conditional-denominator" }
            ]
        },
        {
            id: "expected-value",
            chapter: "probability",
            prompt: "X=0,1,2；P(X)=0.2,0.5,0.3。E(X) 是多少？",
            answerIndex: 2,
            successFeedback: "E(X)=0(0.2)+1(0.5)+2(0.3)=1.1。",
            options: [
                { label: "(0+1+2)/3 = 1", diagnosticId: "expected-value-weights" },
                { label: "0.2+0.5+0.3 = 1", diagnosticId: "expected-value-weights" },
                { label: "1.1" }
            ]
        }
    ],
    binomial: [
        {
            id: "binomial-q",
            chapter: "binomial",
            prompt: "二項分配中 p=0.3，失敗率 q 是多少？",
            answerIndex: 1,
            successFeedback: "q=1-p=0.7。",
            options: [
                { label: "0.3", diagnosticId: "missing-q" },
                { label: "0.7" },
                { label: "2/8", diagnosticId: "wrong-question-type" }
            ]
        },
        {
            id: "binomial-combination",
            chapter: "binomial",
            prompt: "0.3^2(0.7)^6 代表什麼？",
            answerIndex: 0,
            successFeedback: "這只是一種固定順序的機率，還不是剛好 2 次成功的總機率。",
            options: [
                { label: "某一種順序的機率" },
                { label: "剛好 2 次成功的總機率", diagnosticId: "sequence-as-total" },
                { label: "組合數", diagnosticId: "missing-combination" }
            ]
        },
        {
            id: "binomial-type",
            chapter: "binomial",
            prompt: "固定做 10 次，每次成功率相同，問剛好成功 3 次。這是哪一類？",
            answerIndex: 1,
            successFeedback: "固定次數、成功/失敗、剛好 k 次，是二項分配。",
            options: [
                { label: "描述統計", diagnosticId: "wrong-question-type" },
                { label: "二項分配" },
                { label: "信賴區間", diagnosticId: "wrong-question-type" }
            ]
        }
    ],
    normal: [
        {
            id: "normal-z-meaning",
            chapter: "normal",
            prompt: "Z=1.5 表示什麼？",
            answerIndex: 2,
            successFeedback: "Z=1.5 表示 X 比平均數高 1.5 個標準差。",
            options: [
                { label: "機率是 1.5", diagnosticId: "wrong-question-type" },
                { label: "X 比平均數低 1.5 個標準差", diagnosticId: "wrong-question-type" },
                { label: "X 比平均數高 1.5 個標準差" }
            ]
        },
        {
            id: "normal-greater",
            chapter: "normal",
            prompt: "查表得 P(Z<1)=0.8413，P(Z>1) 怎麼算？",
            answerIndex: 1,
            successFeedback: "右尾機率是 1-0.8413=0.1587。",
            options: [
                { label: "直接用 0.8413", diagnosticId: "normal-greater-tail" },
                { label: "1 - 0.8413" },
                { label: "0.8413 - 1", diagnosticId: "normal-greater-tail" }
            ]
        },
        {
            id: "normal-between",
            chapter: "normal",
            prompt: "P(60<\nX<80) 應該怎麼用左尾表？",
            answerIndex: 0,
            successFeedback: "介於兩數之間，用右界左尾減左界左尾。",
            options: [
                { label: "P(X<80)-P(X<60)" },
                { label: "只算 P(X<80)", diagnosticId: "normal-between" },
                { label: "1-P(X<60)", diagnosticId: "normal-between" }
            ]
        }
    ]
};
export const examDrills = {
    descriptive: [
        {
            id: "exam-sample-sd",
            chapter: "descriptive",
            title: "樣本標準差",
            prompt: "資料 60, 70, 70, 80, 100，求樣本標準差。",
            formula: "s=\\sqrt{\\frac{\\sum(x-\\bar{x})^2}{n-1}}",
            substitution: "\\bar{x}=76,\\ \\sum(x-\\bar{x})^2=920,\\ s=\\sqrt{920/4}",
            answer: "s≈15.17",
            examNote: "樣本標準差分母用 n-1。"
        },
        {
            id: "exam-mean-median-range",
            chapter: "descriptive",
            title: "平均、中位數、全距",
            prompt: "資料 12, 15, 15, 18, 30，求平均、中位數、全距。",
            formula: "\\bar{x}=\\frac{\\sum x}{n},\\ Median=\\text{middle},\\ Range=max-min",
            substitution: "\\sum x=90,\\ n=5,\\ Median=15,\\ Range=30-12",
            answer: "平均=18，中位數=15，全距=18",
            examNote: "先排序再找中位數。"
        }
    ],
    probability: [
        {
            id: "exam-probability-complement",
            chapter: "probability",
            title: "補集",
            prompt: "擲一顆骰子，求不大於 4 的機率。",
            formula: "P(A^c)=1-P(A)",
            substitution: "A=\\{5,6\\},\\ P(A)=2/6,\\ P(A^c)=1-2/6",
            answer: "2/3",
            examNote: "看到「不」可以先想補集。"
        },
        {
            id: "exam-conditional-probability",
            chapter: "probability",
            title: "條件機率",
            prompt: "40 人中 12 人及格，其中 9 人有交作業。已知及格，求交作業機率。",
            formula: "P(A|B)=\\frac{P(A\\cap B)}{P(B)}",
            substitution: "P(交作業|及格)=\\frac{9/40}{12/40}=\\frac{9}{12}",
            answer: "0.75",
            examNote: "已知 B 後，分母只看 B。"
        },
        {
            id: "exam-probability-function",
            chapter: "probability",
            title: "期望值與變異數",
            prompt: "X=0,1,2；P(X)=0.2,0.5,0.3，求 E(X)、Var(X)。",
            formula: "E(X)=\\sum xP(x),\\ Var(X)=E(X^2)-[E(X)]^2",
            substitution: "E(X)=1.1,\\ E(X^2)=1.7,\\ Var(X)=1.7-1.1^2",
            answer: "E(X)=1.1，Var(X)=0.49",
            examNote: "不要把 X 直接平均，要用機率權重。"
        },
        {
            id: "exam-job-offer-union",
            chapter: "probability",
            title: "條件機率與聯集",
            prompt: "P(A)=0.4，P(B)=0.7，P(B|A)=0.5，求 P(A∪B)。",
            formula: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B),\\ P(A\\cap B)=P(A)P(B|A)",
            substitution: "P(A\\cap B)=0.4(0.5)=0.2,\\ P(A\\cup B)=0.4+0.7-0.2",
            answer: "0.9",
            examNote: "先用條件機率補交集，再代回聯集公式。"
        },
        {
            id: "exam-car-sales-discrete",
            chapter: "probability",
            title: "缺值機率表",
            prompt: "X=0,1,2,3,4,5；P(X)=0.10,c,0.25,c,0.15,0.10，且 E(X)=2.4，求 P(X≥3)。",
            formula: "E(X)=\\sum xP(x)",
            substitution: "c+0.5+3c+0.6+0.5=2.4,\\ c=0.2,\\ P(X\\ge3)=0.2+0.15+0.10",
            answer: "0.45",
            examNote: "表格缺 c 時，先用題目給的平均數或總機率補值。"
        },
        {
            id: "exam-discrete-pmf",
            chapter: "probability",
            title: "離散機率函數",
            prompt: "X=1,3,5；f(x)=x/9，求 P(X≤4)、E(X)、E(X²)、Var(X)。",
            formula: "E(X)=\\sum xP(x),\\ E(X^2)=\\sum x^2P(x),\\ Var(X)=E(X^2)-[E(X)]^2",
            substitution: "P(X\\le4)=1/9+3/9,\\ E(X)=35/9,\\ E(X^2)=17",
            answer: "P(X≤4)=4/9，E(X)=35/9，E(X²)=17，Var(X)=152/81",
            examNote: "Var(X) 是平方期望值減期望值平方，不是直接開根號。"
        },
        {
            id: "exam-linearity-cost",
            chapter: "probability",
            title: "線性轉換期望與變異數",
            prompt: "E(X)=1500，Var(X)=2000，C=50X+8000，求 E(C)、Var(C)。",
            formula: "E(aX+b)=aE(X)+b,\\ Var(aX+b)=a^2Var(X)",
            substitution: "E(C)=50(1500)+8000,\\ Var(C)=50^2(2000)",
            answer: "E(C)=83000，Var(C)=5000000",
            examNote: "常數平移會改變期望值，但不會增加變異數。"
        },
        {
            id: "exam-dice-events",
            chapter: "probability",
            title: "骰子事件運算",
            prompt: "投擲一公正骰子，A=奇數點，B=大於 3，C=小於等於 4，求各事件、交集與聯集機率。",
            formula: "P(A\\cup C)=P(A)+P(C)-P(A\\cap C)",
            substitution: "A=\\{1,3,5\\},\\ B=\\{4,5,6\\},\\ C=\\{1,2,3,4\\}",
            answer: "P(A)=1/2，P(B)=1/2，P(C)=2/3，P(A∩B)=1/6，P(A∩C)=1/3，P(A∪C)=5/6，P(B∪C)=1",
            examNote: "先列集合，再做交集或聯集。"
        },
        {
            id: "exam-certificates",
            chapter: "probability",
            title: "三種證照比例",
            prompt: "電腦 30%、英文 21%、會計 28%、電腦及英文 5%、電腦及會計 7%、英文及會計 8%、三者都有 2%，求指定證照機率。",
            formula: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B),\\ P(E|A)=\\frac{P(E\\cap A)}{P(A)}",
            substitution: "P(電腦∪英文)=0.30+0.21-0.05,\\ P(至少一種)=0.30+0.21+0.28-0.05-0.07-0.08+0.02",
            answer: "電腦或英文=0.46，會計或英文=0.41，P(英文|會計)=0.2857，至少一種=0.61，沒有任何證照=0.39",
            examNote: "三集合聯集要把重複扣掉，再把三者都有加回來。"
        },
        {
            id: "exam-tv-defect-bayes",
            chapter: "probability",
            title: "生產線不良品反推",
            prompt: "三條生產線占 20%、50%、30%，不良率為 0.1、0.01、0.05，求整體不良率與不良品來自各線的機率。",
            formula: "P(D)=\\sum P(B_i)P(D|B_i),\\ P(B_i|D)=\\frac{P(B_i)P(D|B_i)}{P(D)}",
            substitution: "P(D)=0.2(0.1)+0.5(0.01)+0.3(0.05)=0.04",
            answer: "整體不良率=0.04；P(B1|D)=0.5，P(B2|D)=0.125，P(B3|D)=0.375",
            examNote: "這類題先算整體不良率，再反推來源。"
        },
        {
            id: "exam-bakery-bayes",
            chapter: "probability",
            title: "蛋糕烘焙失敗來源",
            prompt: "B1、B2、B3 失敗率為 0.01、0.02、0.1，負責比例為 50%、40%、10%，求失敗蛋糕來自 B1 的機率。",
            formula: "P(B_1|D)=\\frac{P(B_1)P(D|B_1)}{\\sum P(B_i)P(D|B_i)}",
            substitution: "P(D)=0.5(0.01)+0.4(0.02)+0.1(0.1)=0.023,\\ P(B_1|D)=0.005/0.023",
            answer: "約 0.2174",
            examNote: "先把每個來源的失敗貢獻算出來。"
        },
        {
            id: "exam-continuous-pdf",
            chapter: "probability",
            title: "連續機率密度函數",
            prompt: "f(x)=3x²，0<x<1，其他為 0，求 P(X≤0.5)、E(X)、E(X²)、Var(X)。",
            formula: "P(a<X<b)=\\int_a^b f(x)dx,\\ E(X)=\\int x f(x)dx",
            substitution: "P(X\\le0.5)=\\int_0^{0.5}3x^2dx=0.5^3,\\ E(X)=\\int_0^1 3x^3dx,\\ E(X^2)=\\int_0^1 3x^4dx",
            answer: "P(X≤0.5)=0.125，E(X)=0.75，E(X²)=0.6，Var(X)=0.0375",
            examNote: "連續型機率看面積，不看單點高度。"
        },
        {
            id: "exam-investment-portfolio",
            chapter: "probability",
            title: "投資組合期望與變異數",
            prompt: "投資報酬率與比例為 -1.5(2%)、6.5(50%)、8.0(28%)、20.5(20%)，求每一元投資的期望值與變異數。",
            formula: "E(X)=\\sum xP(x),\\ Var(X)=E(X^2)-[E(X)]^2",
            substitution: "E(X)=-1.5(0.02)+6.5(0.5)+8(0.28)+20.5(0.2)=9.56",
            answer: "E(X)=9.56，Var(X)=31.7464",
            examNote: "投資比例就是機率權重。"
        }
    ],
    binomial: [
        {
            id: "exam-binomial-exact",
            chapter: "binomial",
            title: "剛好 k 次",
            prompt: "一名籃球員每次罰球命中率為 0.3，連續罰球 8 次。求他剛好命中 2 次的機率。",
            formula: "P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}",
            substitution: "P(X=2)=\\binom{8}{2}(0.3)^2(0.7)^6",
            answer: "0.29647548，約 29.65%",
            examNote: "命中的 2 球可以出現在 8 次中的任何位置，別漏掉組合數。"
        },
        {
            id: "exam-binomial-at-least-one",
            chapter: "binomial",
            title: "至少一次",
            prompt: "成功率 0.9，做 4 次，至少成功 1 次。",
            formula: "P(X\\ge1)=1-P(X=0)",
            substitution: "1-\\binom{4}{0}(0.9)^0(0.1)^4",
            answer: "0.9999",
            examNote: "至少一次通常用補集最快。"
        },
        {
            id: "exam-binomial-ice-cream",
            chapter: "binomial",
            title: "恰有與至少",
            prompt: "購買機率 0.7，抽 10 人，求恰有 3 人購買與至少 7 人購買。",
            formula: "P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}",
            substitution: "P(X=3)=\\binom{10}{3}(0.7)^3(0.3)^7,\\ P(X\\ge7)=\\sum_{k=7}^{10}\\binom{10}{k}(0.7)^k(0.3)^{10-k}",
            answer: "P(X=3)≈0.0090，P(X≥7)≈0.6496",
            examNote: "至少 7 人要把 7、8、9、10 四項加起來。"
        },
        {
            id: "exam-binomial-edible-boxes",
            chapter: "binomial",
            title: "最多與全部成功",
            prompt: "每批可立即食用機率 0.9，抽 6 批，求恰有 4 批、至多 3 批、全部可食用的機率。",
            formula: "P(X=k)=\\binom{6}{k}(0.9)^k(0.1)^{6-k}",
            substitution: "P(4)=\\binom{6}{4}(0.9)^4(0.1)^2,\\ P(X\\le3)=\\sum_{k=0}^{3}P(k),\\ P(6)=0.9^6",
            answer: "P(4)≈0.0984，P(X≤3)≈0.0159，P(6)=0.531441",
            examNote: "至多 3 批要含 0、1、2、3。"
        },
        {
            id: "exam-hypergeometric-dentist",
            chapter: "binomial",
            title: "超幾何：不放回抽樣",
            prompt: "20 位牙醫中 12 位推薦某品牌，抽 5 位不放回，求恰有 3 位與至少 4 位推薦的機率。",
            formula: "P(X=x)=\\frac{\\binom{K}{x}\\binom{N-K}{n-x}}{\\binom{N}{n}}",
            substitution: "P(3)=\\frac{\\binom{12}{3}\\binom{8}{2}}{\\binom{20}{5}},\\ P(X\\ge4)=\\frac{\\binom{12}{4}\\binom{8}{1}+\\binom{12}{5}\\binom{8}{0}}{\\binom{20}{5}}",
            answer: "P(3)≈0.3973，P(X≥4)≈0.3065",
            examNote: "不放回、母體大小有限時，先想超幾何分配。"
        },
        {
            id: "exam-poisson-clinic",
            chapter: "binomial",
            title: "卜瓦松：平均次數",
            prompt: "每天預約取消平均 2 次，求恰有 3 次取消與兩天都沒有取消的機率。",
            formula: "P(X=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}",
            substitution: "P(X=3)=e^{-2}\\frac{2^3}{3!},\\ P(兩天0次)=e^{-4}",
            answer: "P(X=3)≈0.1804，兩天都沒有取消≈0.0183",
            examNote: "一段時間平均次數固定時，可把區間拉長後調整 λ。"
        },
        {
            id: "exam-poisson-fried-chicken",
            chapter: "binomial",
            title: "卜瓦松近似二項",
            prompt: "約一成客人不會點脆皮炸雞，100 位客人中恰有 2 人不點脆皮炸雞的近似機率。",
            formula: "\\lambda=np,\\ P(X=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}",
            substitution: "\\lambda=100(0.1)=10,\\ P(X=2)=e^{-10}\\frac{10^2}{2!}",
            answer: "約 0.00227",
            examNote: "二項分配 n 大、p 小時，可以用卜瓦松近似。"
        }
    ],
    normal: [
        {
            id: "exam-normal-less",
            chapter: "normal",
            title: "小於某值",
            prompt: "X~N(70,10^2)，求 X<85。",
            formula: "Z=\\frac{X-\\mu}{\\sigma}",
            substitution: "Z=\\frac{85-70}{10}=1.5",
            answer: "P(Z<1.5)≈0.9332",
            examNote: "小於直接查左尾表。"
        },
        {
            id: "exam-normal-greater",
            chapter: "normal",
            title: "大於某值",
            prompt: "X~N(70,10^2)，求 X>80。",
            formula: "P(X>80)=1-P(X<80)",
            substitution: "Z=\\frac{80-70}{10}=1,\\ 1-P(Z<1)",
            answer: "1-0.8413=0.1587",
            examNote: "大於要用右尾。"
        },
        {
            id: "exam-normal-between",
            chapter: "normal",
            title: "介於兩值",
            prompt: "X~N(70,10^2)，求 80<X<90。",
            formula: "P(a<X<b)=P(Z<z_b)-P(Z<z_a)",
            substitution: "z_a=1,\\ z_b=2,\\ P(Z<2)-P(Z<1)",
            answer: "0.9772-0.8413=0.1359",
            examNote: "介於兩值要用兩個左尾相減。"
        },
        {
            id: "exam-uniform-anesthesia",
            chapter: "normal",
            title: "均勻分配",
            prompt: "麻醉效果時間服從 20 到 30 分鐘的均勻分配，求 E(X)、Var(X)、P(X>27)。",
            formula: "E(X)=\\frac{a+b}{2},\\ Var(X)=\\frac{(b-a)^2}{12},\\ P(X>c)=\\frac{b-c}{b-a}",
            substitution: "E(X)=25,\\ Var(X)=10^2/12,\\ P(X>27)=3/10",
            answer: "E(X)=25，Var(X)≈8.33，P(X>27)=0.3",
            examNote: "均勻分配的機率就是區間長度比例。"
        },
        {
            id: "exam-normal-bottle",
            chapter: "normal",
            title: "常態區間機率",
            prompt: "茶飲容量 X~N(600,10²)，求 580<X<605 與 X<595 的機率。",
            formula: "Z=\\frac{X-\\mu}{\\sigma}",
            substitution: "z_{580}=-2,\\ z_{605}=0.5,\\ z_{595}=-0.5",
            answer: "P(580<X<605)≈0.6687，P(X<595)≈0.3085",
            examNote: "先把兩個界線各自標準化，再查左尾。"
        },
        {
            id: "exam-exponential-breakfast",
            chapter: "normal",
            title: "指數分配等待時間",
            prompt: "早餐店每位客人平均用餐 15 分鐘，求用餐少於 10 分鐘與超過 20 分鐘的機率。",
            formula: "P(X<t)=1-e^{-t/\\mu},\\ P(X>t)=e^{-t/\\mu}",
            substitution: "P(X<10)=1-e^{-10/15},\\ P(X>20)=e^{-20/15}",
            answer: "P(X<10)≈0.4866，P(X>20)≈0.2636",
            examNote: "指數分配常用在等待時間或壽命時間。"
        },
        {
            id: "exam-sampling-proportion-brand",
            chapter: "normal",
            title: "樣本比例抽樣分配",
            prompt: "手機市占率 12%，抽 150 人，求樣本比例誤差不超過 6% 的近似機率。",
            formula: "SE=\\sqrt{\\frac{p(1-p)}{n}},\\ Z=\\frac{\\hat{p}-p}{SE}",
            substitution: "SE=\\sqrt{0.12(0.88)/150}\\approx0.0265,\\ z=0.06/0.0265\\approx2.26",
            answer: "約 0.9762",
            examNote: "樣本比例題用 p(1-p)/n 算標準誤。"
        },
        {
            id: "exam-sampling-mean-weight",
            chapter: "normal",
            title: "樣本平均抽樣分配",
            prompt: "平均體重 48.5 公斤、標準差 6 公斤，抽 100 位，求平均體重超過 50 公斤的機率。",
            formula: "Z=\\frac{\\bar{X}-\\mu}{\\sigma/\\sqrt{n}}",
            substitution: "SE=6/10=0.6,\\ z=(50-48.5)/0.6=2.5",
            answer: "P(Z>2.5)≈0.0062",
            examNote: "問樣本平均時，分母用標準誤，不是原標準差。"
        },
        {
            id: "exam-sampling-mean-normal",
            chapter: "normal",
            title: "樣本平均的期望與變異數",
            prompt: "母體 N(20,100)，抽 25 個樣本，求 X̄ 的期望值、變異數、分配與 P(X̄<25)。",
            formula: "E(\\bar{X})=\\mu,\\ Var(\\bar{X})=\\frac{\\sigma^2}{n}",
            substitution: "E(\\bar{X})=20,\\ Var(\\bar{X})=100/25=4,\\ z=(25-20)/2=2.5",
            answer: "X̄~N(20,4)，P(X̄<25)≈0.9938",
            examNote: "母體常態時，樣本平均仍為常態。"
        },
        {
            id: "exam-sample-proportion-binomial",
            chapter: "normal",
            title: "二項樣本比例",
            prompt: "X~B(100,0.2)，p̂=X/n，求 p̂ 的期望、變異數、近似分配與 P(p̂>0.15)。",
            formula: "E(\\hat{p})=p,\\ Var(\\hat{p})=\\frac{p(1-p)}{n}",
            substitution: "E(\\hat{p})=0.2,\\ Var(\\hat{p})=0.2(0.8)/100=0.0016,\\ z=(0.15-0.2)/0.04=-1.25",
            answer: "p̂ 約為 N(0.2,0.0016)，P(p̂>0.15)≈0.8944",
            examNote: "樣本比例可用常態近似時，平均是 p，變異數是 p(1-p)/n。"
        },
        {
            id: "exam-hospital-wait",
            chapter: "normal",
            title: "平均等待時間",
            prompt: "候診等待時間 X~N(10,25)，抽 20 人，求 X̄ 的分配與平均等待超過 12 分鐘的機率。",
            formula: "\\bar{X}\\sim N\\left(\\mu,\\frac{\\sigma^2}{n}\\right)",
            substitution: "\\bar{X}\\sim N(10,25/20),\\ z=(12-10)/\\sqrt{1.25}",
            answer: "P(X̄>12)≈0.0368",
            examNote: "抽樣平均的變異數要除以樣本數。"
        },
        {
            id: "exam-cans-mean",
            chapter: "normal",
            title: "罐頭平均重量",
            prompt: "台糖蜆精平均 150 公克、標準差 10 公克，抽 80 罐，求 X̄ 的分配與 P(X̄>150.5)。",
            formula: "\\bar{X}\\sim N\\left(150,\\frac{10^2}{80}\\right)",
            substitution: "z=(150.5-150)/\\sqrt{100/80}",
            answer: "P(X̄>150.5)≈0.3274",
            examNote: "標準誤會隨樣本數增加而縮小。"
        },
        {
            id: "exam-two-means",
            chapter: "normal",
            title: "兩個樣本平均差",
            prompt: "X1~N(38,10²)、X2~N(30,15²)，各抽 25 個，求 P(X̄1-X̄2<10)。",
            formula: "\\bar{X}_1-\\bar{X}_2\\sim N\\left(\\mu_1-\\mu_2,\\frac{\\sigma_1^2}{n_1}+\\frac{\\sigma_2^2}{n_2}\\right)",
            substitution: "\\mu_D=8,\\ Var(D)=100/25+225/25=13,\\ z=(10-8)/\\sqrt{13}",
            answer: "P(X̄1-X̄2<10)≈0.7105",
            examNote: "兩組獨立時，平均差的變異數要相加。"
        },
        {
            id: "exam-two-city-vacancy",
            chapter: "normal",
            title: "兩城市房價負擔率差",
            prompt: "台北平均 35、變異數 32，高雄平均 26、變異數 40，各抽 36 筆，求 X̄1-X̄2 的抽樣分配與 P(X̄1-X̄2>7)。",
            formula: "\\bar{X}_1-\\bar{X}_2\\sim N\\left(\\mu_1-\\mu_2,\\frac{\\sigma_1^2}{n_1}+\\frac{\\sigma_2^2}{n_2}\\right)",
            substitution: "\\mu_D=9,\\ Var(D)=32/36+40/36=2,\\ z=(7-9)/\\sqrt{2}",
            answer: "P(X̄1-X̄2>7)≈0.9213",
            examNote: "問差大於某值時，先把差的平均與變異數算出來。"
        },
        {
            id: "exam-male-proportion",
            chapter: "normal",
            title: "單一樣本比例",
            prompt: "顧客中 75% 為男性，抽 100 位，求 p̂ 的抽樣分配與 p̂>0.78 的機率。",
            formula: "\\hat{p}\\approx N\\left(p,\\frac{p(1-p)}{n}\\right)",
            substitution: "Var(\\hat{p})=0.75(0.25)/100,\\ z=(0.78-0.75)/\\sqrt{0.001875}",
            answer: "P(p̂>0.78)≈0.2442",
            examNote: "比例題先確認 p，再算 p(1-p)/n。"
        },
        {
            id: "exam-two-proportions",
            chapter: "normal",
            title: "兩條生產線瑕疵率差",
            prompt: "p1=0.10、p2=0.08，各抽 100 個，求 p̂1-p̂2 的抽樣分配與 P(p̂1-p̂2>0.03)。",
            formula: "\\hat{p}_1-\\hat{p}_2\\approx N\\left(p_1-p_2,\\frac{p_1(1-p_1)}{n_1}+\\frac{p_2(1-p_2)}{n_2}\\right)",
            substitution: "\\mu_D=0.02,\\ Var(D)=0.1(0.9)/100+0.08(0.92)/100,\\ z=(0.03-0.02)/\\sqrt{0.001636}",
            answer: "P(p̂1-p̂2>0.03)≈0.4024",
            examNote: "兩個比例差的變異數也是兩邊相加。"
        },
        {
            id: "exam-sampling-statistics",
            chapter: "normal",
            title: "常態母體抽樣統計量",
            prompt: "Xi iid~N(μ,σ²)，列出 X̄、已知 σ 的 Z、未知 σ 的 t、以及樣本變異數統計量的分配。",
            formula: "\\bar{X}\\sim N\\left(\\mu,\\frac{\\sigma^2}{n}\\right),\\ \\frac{\\bar{X}-\\mu}{\\sigma/\\sqrt{n}}\\sim N(0,1),\\ \\frac{\\bar{X}-\\mu}{S/\\sqrt{n}}\\sim t_{n-1},\\ \\frac{(n-1)S^2}{\\sigma^2}\\sim\\chi^2_{n-1}",
            substitution: "df=n-1",
            answer: "依序為常態、標準常態、t 分配、卡方分配",
            examNote: "σ 已知用 Z；σ 未知且用 S 取代時用 t。"
        },
        {
            id: "exam-confidence-sales",
            chapter: "normal",
            title: "平均數信賴區間",
            prompt: "平均 3500 元、標準差 1100 元、n=16，求 95% 信賴區間。",
            formula: "\\bar{x}\\pm z^*\\frac{\\sigma}{\\sqrt{n}}",
            substitution: "3500\\pm1.96(1100/4)=3500\\pm539",
            answer: "[2961, 4039]",
            examNote: "題目要四捨五入到整數時，先算誤差界再取整。"
        },
        {
            id: "exam-required-sample-size",
            chapter: "normal",
            title: "比例估計樣本數",
            prompt: "90% 信賴度下，希望抽樣誤差小於 3%，求有效樣本數。",
            formula: "n=\\frac{(z^*)^2}{4E^2}",
            substitution: "n=\\frac{1.645^2}{4(0.03)^2}=751.7",
            answer: "至少 752 人",
            examNote: "沒有先驗比例時，用 p=0.5 的保守公式。"
        },
        {
            id: "exam-required-sample-size-mean",
            chapter: "normal",
            title: "平均數樣本數反推",
            prompt: "μ=50、σ=5，要求 P(|X̄-50|≤1)≥0.99，求需要抽多少樣本。",
            formula: "P\\left(|Z|\\le \\frac{E}{\\sigma/\\sqrt{n}}\\right)\\ge0.99",
            substitution: "\\frac{1}{5/\\sqrt{n}}\\ge2.576,\\ \\sqrt{n}\\ge12.88",
            answer: "n 至少 166",
            examNote: "99% 中央機率對應兩尾各 0.005，所以用 z=2.576。"
        },
        {
            id: "exam-poll-margin",
            chapter: "normal",
            title: "民調抽樣誤差",
            prompt: "400 人電話訪問，支持度 80%，95% 信賴度下抽樣誤差是多少？",
            formula: "E=z^*\\sqrt{\\frac{\\hat{p}(1-\hat{p})}{n}}",
            substitution: "E=1.96\\sqrt{0.8(0.2)/400}",
            answer: "0.0392",
            examNote: "這是信賴區間的半長，也就是常說的正負抽樣誤差。"
        },
        {
            id: "exam-ci-length-difference",
            chapter: "normal",
            title: "信賴區間長度差",
            prompt: "續月平均銷售額題，90% 信賴度且 σ 未知、S=1100 時，與 90% σ 已知區間長度相差多少？",
            formula: "L=2c\\frac{S}{\\sqrt{n}}",
            substitution: "2(t_{0.05,15}-z_{0.05})\\frac{1100}{4}=2(1.753-1.645)(275)",
            answer: "約 59.4",
            examNote: "σ 未知用 t 臨界值，區間會比同信賴度的 Z 區間略長。"
        },
        {
            id: "exam-ci-length-sample-size",
            chapter: "normal",
            title: "樣本數與區間長度",
            prompt: "信賴水準不變，樣本大小增加 3 倍，常態母體信賴區間長度是原本的幾倍？",
            formula: "L\\propto\\frac{1}{\\sqrt{n}}",
            substitution: "L_{new}/L_{old}=\\sqrt{n}/\\sqrt{3n}",
            answer: "1/√3",
            examNote: "樣本數放大 k 倍，區間長度只會縮成 1/√k。"
        }
    ]
};
