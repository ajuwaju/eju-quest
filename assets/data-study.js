/* Study guide data: writing prompts, solving methods by topic, past papers, scoring, syllabus, strategy and resources.
   Facts come from JASSO (EJU guidelines, syllabus pages, outline of results, writing criteria). Links point to the source;
   nothing copyrighted is rehosted. */
window.EJU = window.EJU || {};

/* Writing (記述) practice: original prompts in the EJU style. Pick one of two, 400 to 500 characters, 30 minutes. */
EJU.writing = [
  { id:"w01", a:"テクノロジー", pair:[
    "「スマートフォンは子どもの学習に役立つ」という意見と「学習のじゃまになる」という意見があります。両方の意見に触れながら、あなたの考えを述べなさい。",
    "インターネットで買い物をする人が増えています。このことの良い点と問題点を挙げ、あなたの考えを述べなさい。" ] },
  { id:"w02", a:"教育", pair:[
    "大学の授業はオンラインで十分だという意見と、教室で受けるべきだという意見があります。あなたの考えを、理由を挙げて述べなさい。",
    "「若いうちに留学したほうがいい」という意見について、あなたはどう考えますか。賛成か反対かを明らかにし、理由を述べなさい。" ] },
  { id:"w03", a:"社会", pair:[
    "多くの国で少子高齢化が進んでいます。この問題に対して社会は何をすべきか、あなたの考えを述べなさい。",
    "都市に人口が集中することには良い点と悪い点があります。両方に触れながら、あなたの考えを述べなさい。" ] },
  { id:"w04", a:"環境", pair:[
    "環境を守るために、個人ができることと政府がすべきことのどちらがより重要だと思いますか。あなたの考えを述べなさい。",
    "レジ袋やペットボトルの使用を法律で禁止すべきだという意見があります。賛成か反対かを明らかにし、理由を述べなさい。" ] },
  { id:"w05", a:"仕事", pair:[
    "仕事を選ぶとき、収入とやりがいのどちらを重視すべきだと思いますか。あなたの考えを述べなさい。",
    "一つの会社で長く働くことと、何度か転職することには、それぞれどんな良い点がありますか。あなたの考えを述べなさい。" ] },
  { id:"w06", a:"文化", pair:[
    "外国語を学ぶとき、文法の正しさと話す量のどちらを大切にすべきだと思いますか。あなたの考えを述べなさい。",
    "伝統的な文化を守ることと、新しい文化を取り入れることについて、あなたの考えを述べなさい。" ] },
  { id:"w07", a:"生活", pair:[
    "「便利な生活は人を幸せにする」という意見について、賛成か反対かを明らかにし、あなたの考えを述べなさい。",
    "一人で勉強することとグループで勉強することには、それぞれどんな利点がありますか。あなたの考えを述べなさい。" ] },
  { id:"w08", a:"科学", pair:[
    "AI（人工知能）が人間の仕事を奪うという意見があります。あなたはどう考えますか。理由を挙げて述べなさい。",
    "科学技術の発展には良い面と悪い面があると言われます。具体例を挙げて、あなたの考えを述べなさい。" ] }
];

EJU.writingRubric = [
  ["50", "S", "Clear claim on the task, persuasive reasons, effective structure, refined expression."],
  ["45 to 40", "A", "Clear claim with valid reasons, effective structure, appropriate expression."],
  ["35 to 30", "B", "Mostly on task, generally valid reasons, sound structure, nothing that blocks meaning."],
  ["25 to 20", "C", "Claim and reasons are there, but reasons, structure or wording have problems."],
  ["10", "D", "No clear claim or structure, or barely related to the task, with many errors."],
  ["0", "NA", "Blank, off-topic, just copies the prompt, or under 40 characters of relevant Japanese."]
];
EJU.writingChecklist = [
  "I chose one prompt and answered exactly what it asked",
  "My position is clear in the first paragraph",
  "I gave at least two reasons with concrete examples",
  "I mentioned the other side and answered it",
  "My conclusion restates my position",
  "I used だ・である style all the way through",
  "No casual words (でも, だから, けど, いっぱい, ちゃんと)",
  "Between 400 and 500 characters"
];

/* Step-by-step methods by topic, shown in the explanation tab for every question in that topic. */
EJU.methods = {
  "Connectors": ["Read the sentences before and after the blank.","Decide the relationship: cause → result, contrast, addition, example, rephrasing or condition.","Pick the connector for that relationship: そのため (result), しかし/一方 (contrast), さらに (addition), たとえば (example), つまり (rephrase), ただし (condition)."],
  "Grammar": ["Look at what comes right after the blank: the ending often decides the pattern (とは限らない, べきだ, そうだ).","Translate each option into English and test it in the sentence.","Watch for fixed pairs: からといって…とは限らない, によると…そうだ."],
  "Vocabulary": ["Look for collocations: which noun goes with the verb (合意に達する, 人口が集中する).","Eliminate words with the right reading but wrong meaning (homophones like 施行/試行).","Read the full sentence again with your choice."],
  "Reading": ["Read the question first so you know what to look for.","Find turning words (しかし, ところが, つまり): the writer's opinion usually follows.","Match the option to the text, not to your own opinion. Wrong options often say too much or the opposite."],
  "Listening": ["Read the question and options before the audio starts.","Note who does what and when. The real instruction often comes after ただ, でも or じゃあ.","Don't pick an option just because you heard the same word."],
  "Writing": ["Structure: claim → reasons with examples → counterargument → conclusion.","Use だ・である style and written words (しかし, したがって, 多く).","Aim for 400 to 500 characters and leave 3 minutes to check."],
  "Quadratic functions": ["Complete the square to find the vertex.","Sketch the parabola and mark the allowed range.","If the vertex is outside the range, the max or min is at an end point."],
  "Quadratic equations": ["Discriminant D = b² − 4ac: D > 0 two roots, D = 0 one, D < 0 none.","Factor when you can; otherwise use the formula."],
  "Probability": ["List or count all equally likely outcomes.","Use nCr for 'exactly r times'.","For 'at least one', use 1 − P(none)."],
  "Counting": ["Order matters → permutation. Order doesn't → combination.","Things that must be together: glue them into one block.","Things that can't be together: total − together."],
  "Trigonometric ratios": ["Draw the triangle and label sides and angles.","Two sides and the angle between: law of cosines. Side and opposite angle: law of sines.","Area = ½ab sin C."],
  "Differential calculus": ["Differentiate: power, product, quotient and chain rules.","Set f'(x) = 0 for turning points; check the sign change.","Tangent line: y − f(a) = f'(a)(x − a)."],
  "Integral calculus": ["Find the antiderivative, then evaluate top minus bottom limit.","For areas, integrate (upper curve − lower curve).","Products like x·sin x: integration by parts."],
  "Sequences": ["Identify the type: arithmetic (add d) or geometric (multiply r).","Use the formula for the nth term or the sum.","For recurrences like aₙ₊₁ = paₙ + q, shift by the fixed point."],
  "Vectors": ["Write components.","Dot product = x₁x₂ + y₁y₂ = |a||b|cos θ.","Perpendicular ⇔ dot product 0."],
  "Kinematics": ["List known values: v₀, v, a, t, x.","Choose the equation missing the unknown you don't need.","Check units and signs (up or down)."],
  "Newton's laws": ["Draw a free-body diagram with every force.","Split forces along and across the motion.","Apply ma = net force along the motion."],
  "Energy": ["Identify kinetic, potential and work done by friction.","Initial energy + work in = final energy.","Solve for the unknown."],
  "Electricity": ["Simplify the circuit: series adds, parallel adds reciprocals.","V = IR for the whole circuit, then each part.","Power P = VI = I²R = V²/R."],
  "Moles": ["Convert to moles first: mass ÷ molar mass, or volume ÷ 22.4 L.","Use the equation's mole ratio.","Convert back to the unit asked."],
  "Thermochemistry": ["The 2026 syllabus uses enthalpy: ΔH < 0 is exothermic.","Scale ΔH by the moles that react.","Hess's law: add equations like algebra, and their ΔH values too."],
  "Equilibrium": ["Write the equilibrium expression.","Le Chatelier: the system shifts to undo the change.","Catalysts don't move equilibrium."],
  "Genetics": ["Write parent genotypes and gametes.","Use a Punnett square.","Convert genotypes to phenotypes and give the ratio."],
  "Economics": ["Draw a supply and demand sketch.","Shift the right curve (demand: tastes, income; supply: costs, technology).","Read the new price and quantity."],
  "Politics": ["Recall the article or institution named.","Match powers to the right body: Diet, Cabinet, courts.","Watch for numbers: terms, seats, majorities."],
  "History": ["Place events on a timeline.","Link cause → event → result.","Eliminate options from the wrong century or country."],
  "Geography": ["Time zones: 15° of longitude = 1 hour.","Climate depends on latitude, pressure belts and ocean currents.","Read graphs carefully: units and years."]
};

/* Official past papers on JASSO's site (free PDFs with answers). Japanese and Japan and the World are posted only up to 2018 1st session. */
EJU.pastPapers = [
  { session:"2021 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2021_1.html", has:"Math, Science" },
  { session:"2020 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2020_2.html", has:"Math, Science" },
  { session:"2019 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2019_1.html", has:"Math, Science" },
  { session:"2018 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2018_2.html", has:"Math, Science" },
  { session:"2018 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2018_1.html", has:"All subjects" },
  { session:"2017 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2017_2.html", has:"All subjects" },
  { session:"2017 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2017_1.html", has:"All subjects" },
  { session:"2016 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2016_2.html", has:"All subjects" },
  { session:"2016 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2016_1.html", has:"All subjects" },
  { session:"2015 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2015_2.html", has:"All subjects" },
  { session:"2015 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2015_1.html", has:"All subjects" },
  { session:"2014 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2014_2.html", has:"All subjects" },
  { session:"2014 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2014_1.html", has:"All subjects" },
  { session:"2013 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2013_2.html", has:"All subjects" },
  { session:"2013 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2013_1.html", has:"All subjects" },
  { session:"2012 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2012_2.html", has:"All subjects" },
  { session:"2012 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2012_1.html", has:"All subjects" },
  { session:"2011 2nd", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2011_2.html", has:"All subjects" },
  { session:"2011 1st", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/pastpaper_2011_1.html", has:"All subjects" }
];

/* Average scores from JASSO's Outline of Results, 2026 1st session (June 2026). */
EJU.averages = {
  source:"https://www.jasso.go.jp/en/ryugaku/eju/about/data/result/__icsFiles/afieldfile/2026/07/24/outline_of_results_e_2026-1.pdf",
  label:"2026 1st session (June 2026)",
  rows:[
    ["Japanese: reading", "136.2 / 200", "199"],
    ["Japanese: listening and listening-reading", "100.8 / 200", "175"],
    ["Japanese: total", "237.0 / 400", "374"],
    ["Japanese: writing", "33.1 / 50", "50"],
    ["Physics", "53.8 / 100", "95"],
    ["Chemistry", "52.4 / 100", "98"],
    ["Biology", "63.8 / 100", "92"],
    ["Japan and the World", "122.5 / 200", "199"],
    ["Math Course 1", "97.3 / 200", "194"],
    ["Math Course 2", "108.5 / 200", "200"]
  ]
};

/* The Japanese test in detail. */
EJU.japaneseParts = [
  { part:"Writing (記述)", time:"30 min", score:"0 to 50", detail:"Choose one of two themes and write an opinion essay of 400 to 500 characters on manuscript-style lines. Scored by trained raters in levels S, A, B, C, D (50, 45 to 40, 35 to 30, 25 to 20, 10)." },
  { part:"Reading (読解)", time:"40 min", score:"0 to 200", detail:"About 25 questions: short passages of 400 to 500 characters with one question each, and longer passages of 800 to 1,000 characters with two or three. Budget about 90 seconds per question." },
  { part:"Listening-reading (聴読解)", time:"about 55 min with listening", score:"0 to 200 together", detail:"About 12 questions. You hear a lecture or conversation while looking at a chart, slide or notice in the booklet." },
  { part:"Listening (聴解)", time:"", score:"", detail:"About 15 questions. Audio only, played once. Lectures, advice from teachers and campus conversations." }
];

/* Syllabus outline (2026 revision). */
EJU.syllabus = [
  { subj:"Math Course 1", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/mathematics.html",
    items:["Numbers and expressions","Sets and propositions","Quadratic functions","Figures and measurements (trig ratios, laws of sines and cosines)","Counting and probability, now including expected value","Properties of integers (gcd, Euclid, indefinite equations, bases)","Properties of figures (triangle centres, Ceva, Menelaus, circles, solids)"] },
  { subj:"Math Course 2", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/mathematics.html",
    items:["Everything in Course 1","Various expressions (polynomial division, binomial theorem, proofs, complex roots, remainder theorem)","Figures and equations (lines, circles, regions)","Exponential and logarithmic functions","Trigonometric functions","Sequences and induction","Probability distributions (new in 2026)","Vectors","Complex plane","Equations and curves (parabolas, ellipses, hyperbolas, polar and parametric)","Functions, limits, differentiation and integration"] },
  { subj:"Physics", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/science_phy.html",
    items:["Mechanics: motion, forces, energy, momentum, circular motion, oscillation, gravity","Thermodynamics: heat, gas laws, kinetic theory","Waves: sound and light","Electricity and magnetism: fields, circuits, induction, AC","Atoms: electrons, light and matter, nuclei"] },
  { subj:"Chemistry", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/science_chem.html",
    items:["Structure of matter, bonding, states, solutions","Reactions and energy: enthalpy ΔH replaces thermochemical equations","Rates and equilibrium, including solubility product (new)","Acids, bases, redox, electrochemistry","Inorganic chemistry: groups 3 to 12 are all transition elements now, all of group 2 are alkaline earth metals","Organic chemistry and polymers (formyl group, cis-trans isomers, deposition 凝華: new terms)"] },
  { subj:"Biology", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/science_bio.html",
    items:["Evolution now comes first: genes, meiosis, crossing over, natural selection","Phylogeny and classification","Life and molecules, metabolism","Gene expression and development","Human homeostasis and immunity","Animal responses and behaviour","Plant growth and responses","Ecology, including ecosystems and human activities (new)"] },
  { subj:"Japan and the World", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/japan_theworld.html",
    items:["Politics: democracy, Japan's government and constitution, elections, local government, international politics and law","Economy: markets and market failure, GDP, money and the Bank of Japan, public finance, social security, Japan's postwar economy, trade and exchange rates","Society: environment and energy, consumer issues, labour, ICT, human rights and SDGs","Geography: maps, time zones, climate, landforms, population, cities, resources, regions of the world","History: modernisation, the two world wars, the Cold War and the world after it"] }
];

EJU.strategy = [
  { h:"Know your target", p:"Each university sets its own requirements and cut-offs. Pick 3 to 5 target schools early, check which subjects, math course and exam language they need, and whether they accept June or November scores." },
  { h:"Japanese carries the most weight", p:"It's worth up to 450 points and nearly every school requires it. Reading is the fastest to improve; listening needs daily exposure for months." },
  { h:"Past papers are the best practice", p:"Do JASSO's free past papers under real time limits. Mark them, then redo every wrong answer a week later." },
  { h:"Use both sessions", p:"Scores stay valid for two years and you can take the exam as many times as you like. Many students take June as a real attempt and November to improve. Schools usually want all subjects from one session." },
  { h:"Scores are scaled", p:"There's no pass mark and raw scores aren't shown. Use the published averages to see where you stand: about 237 / 400 in Japanese and 100 to 110 / 200 in math is the middle of the field." },
  { h:"Scholarship bonus", p:"High scorers can be reserved for the Monbukagakusho Honors Scholarship (48,000 yen a month) through the EJU application. Tick the box when you apply." }
];

/* Resources tab, sorted by type. */
EJU.resources = [
  { group:"Official", icon:"intel", items:[
    { name:"JASSO EJU home", url:"https://www.jasso.go.jp/en/ryugaku/eju/index.html", note:"News, rules and every official page." },
    { name:"Guidelines for 2027 EJU", url:"https://www.jasso.go.jp/en/ryugaku/eju/about/eju_guide/index.html", note:"Dates, fees, venues and subjects for the exam he takes." },
    { name:"Exam schedule", url:"https://www.jasso.go.jp/en/ryugaku/eju/schedule.html", note:"Application windows, voucher and result dates." },
    { name:"EJU syllabus (2026 revision)", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/index.html", note:"Exactly what each subject can test, with printable PDFs." },
    { name:"What changed in the 2026 syllabus", url:"https://www.jasso.go.jp/en/ryugaku/eju/about/revision/rev_basic.html", note:"Enthalpy, solubility product, expected value, probability distributions and more." },
    { name:"Writing scoring criteria", url:"https://www.jasso.go.jp/en/ryugaku/eju/faq_eju/score.html", note:"How the 0 to 50 essay score is given." },
    { name:"Outline of results and average scores", url:EJU.averages.source, note:"Averages, highest scores and score distributions for June 2026." },
    { name:"Schools that use the EJU", url:"https://www.studyinjapan.go.jp/en/search-for-schools/school_search.php", note:"Search universities that accept EJU scores." },
    { name:"Honors Scholarship reservation", url:"https://www.jasso.go.jp/en/ryugaku/scholarship_j/shoreihi/yoyaku_eju/index.html", note:"48,000 yen a month for top EJU scorers." },
    { name:"EJU Online", url:"https://www.jasso.go.jp/en/ryugaku/eju/ejuonline/index.html", note:"Apply and check results here." },
    { name:"Study in Japan", url:"https://www.studyinjapan.go.jp/en/", note:"Government guide to universities, costs and visas." }
  ]},
  { group:"Past papers and practice", icon:"target", items:[
    { name:"JASSO past exam questions (free)", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/index.html", note:"Real papers with answers from 2011 to 2021. The full list of sessions is below." },
    { name:"Official question booklets (with audio)", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/publish.html", note:"JASSO's printed past papers with listening audio, published by Bonjinsha. Recent years are only in print." },
    { name:"Bonjinsha EJU page", url:"https://www.bonjinsha.com/page_eju.html", note:"Where to buy the latest official papers (2025 edition out January 2026)." },
    { name:"Answer sheet sample", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/procedure/ans_method.html", note:"How to mark the answer sheet. Practise on it before exam day." },
    { name:"JLPT sample questions", url:"https://www.jlpt.jp/e/samples/forlearners.html", note:"Extra official reading and listening practice." }
  ]},
  { group:"Books", icon:"shard", items:[
    { name:"日本留学試験 試験問題 (JASSO, Bonjinsha)", url:"https://www.bonjinsha.com/page_eju.html", note:"Official past papers. One edition a year, with listening audio." },
    { name:"EJU 模試と解説 series (ASK)", url:"https://www.bonjinsha.com/item/486639479", note:"Six full mock tests per book with detailed answers. Japanese, Math 1 and 2, Science and Japan and the World." },
    { name:"ハイレベル series (ASK)", url:"https://www.bonjinsha.com/item/486639952", note:"Topic-by-topic drills. The science edition was revised for the 2026 syllabus." },
    { name:"聴解・聴読解 ポイント＆プラクティス (3A Network)", url:"https://www.bonjinsha.com/item/488319963", note:"Step-by-step listening strategies with English translations. Good first listening book." },
    { name:"EJU book list by subject (Sogakusha)", url:"https://sogakusha.co.jp/ejulist/eju-list2017n.html", note:"A bookshop's complete list of EJU prep books for every subject." }
  ]},
  { group:"Free study sites", icon:"map", items:[
    { name:"NHK News Web Easy", url:"https://www3.nhk.or.jp/news/easy/", note:"Real news in simpler Japanese with furigana and audio. Read one a day." },
    { name:"JF Japanese e-Learning Minato", url:"https://minato-jf.jp/", note:"Free courses from the Japan Foundation." },
    { name:"Tae Kim's guide", url:"https://guidetojapanese.org/learn/", note:"Clear free grammar explanations." },
    { name:"Khan Academy", url:"https://www.khanacademy.org/", note:"Free lessons and exercises in math, physics, chemistry and biology." },
    { name:"OpenStax", url:"https://openstax.org/subjects/science", note:"Free full textbooks for every science." },
    { name:"PhET simulations", url:"https://phet.colorado.edu/", note:"Interactive physics and chemistry simulations." },
    { name:"Statistical Handbook of Japan", url:"https://www.stat.go.jp/english/data/handbook/index.html", note:"Population, economy and society in charts." },
    { name:"Web Japan", url:"https://web-japan.org/", note:"Government overview of Japanese society, politics and culture." },
    { name:"Our World in Data", url:"https://ourworldindata.org/", note:"Clear charts on population, energy and economics." }
  ]},
  { group:"Apps", icon:"bolt", items:[
    { name:"Anki", url:"https://apps.ankiweb.net/", note:"Spaced-repetition flashcards for vocabulary and formulas." },
    { name:"Jisho", url:"https://jisho.org/", note:"Fast dictionary for words and kanji." },
    { name:"Takoboto", url:"https://takoboto.jp/", note:"Offline Japanese dictionary app with example sentences." },
    { name:"Bunpro", url:"https://bunpro.jp/", note:"Grammar practice with spaced repetition." },
    { name:"WaniKani", url:"https://www.wanikani.com/", note:"Kanji and vocabulary with mnemonics. The first levels are free." }
  ]},
  { group:"Video", icon:"play", items:[
    { name:"Try IT (Japanese)", url:"https://www.try-it.jp/", note:"Free Japanese high school video lessons in every EJU subject. Great for learning the Japanese terms." },
    { name:"NHK for School", url:"https://www.nhk.or.jp/school/", note:"Short NHK videos on science and social studies, in Japanese." },
    { name:"Khan Academy videos", url:"https://www.khanacademy.org/", note:"Clear English explanations for math and science." },
    { name:"3Blue1Brown", url:"https://www.3blue1brown.com/", note:"Visual explanations of calculus, linear algebra and probability." },
    { name:"Crash Course", url:"https://thecrashcourse.com/", note:"Fast video courses on world history, economics, chemistry and biology." }
  ]}
];
