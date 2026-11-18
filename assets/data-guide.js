/* Exam facts (from JASSO's Guidelines for 2027 EJU, published November 2026) and curated resources. */
window.EJU = window.EJU || {};

EJU.sessions = [
  { id:"jun2027", label:"June 2027 (1st session)", exam:"2027-06-20", apply:["2027-02-15","2027-03-11"], voucher:"2027-05-21", results:"Late July 2027" },
  { id:"nov2027", label:"November 2027 (2nd session)", exam:"2027-11-14", apply:["2027-07-12","2027-08-05"], voucher:"2027-10-22", results:"Mid December 2027" }
];

EJU.format = [
  { subj:"Japanese as a Foreign Language", time:"125 min", score:"0–400, plus writing 0–50", lang:"Japanese only",
    parts:"Writing (30 min), reading comprehension, then listening-reading and listening comprehension (about 55 min together). Reading is 0–200, listening and listening-reading 0–200." },
  { subj:"Science", time:"80 min", score:"0–200", lang:"Japanese or English",
    parts:"Pick two of physics, chemistry and biology on the exam day. Answering only one means the science test is not graded." },
  { subj:"Japan and the World", time:"80 min", score:"0–200", lang:"Japanese or English",
    parts:"Politics, economics, society, geography and modern history, focused on reasoning. You cannot take both Science and Japan and the World." },
  { subj:"Mathematics", time:"80 min", score:"0–200", lang:"Japanese or English",
    parts:"Course 1 (Math I and A) for humanities and lighter-math science programs. Course 2 (Math I, II, III, A, B, C) for science and engineering. Your university decides which." }
];

EJU.facts = [
  "Held twice a year, in June and November, in Japan and 14 other countries and regions.",
  "Scores are valid for two years. Universities usually ask for all subjects from the same session.",
  "Every part is multiple choice except the Japanese writing task.",
  "Scores are scaled so different sessions can be compared fairly, so there is no fixed pass mark.",
  "Exam fee in Japan for 2027: ¥13,000 for one subject, ¥25,000 for two or three.",
  "Results are checked online through EJU Online. No paper score report is mailed."
];

EJU.tracks = [
  { id:"sci", name:"Science track", jp:"理系", subjects:["jp","m2","phy","chem","bio"], note:"Japanese, Science (two of physics, chemistry, biology) and usually Math Course 2." },
  { id:"hum", name:"Humanities track", jp:"文系", subjects:["jp","m1","jw"], note:"Japanese, Japan and the World and usually Math Course 1." },
  { id:"all", name:"Everything", jp:"全部", subjects:["jp","m1","m2","phy","chem","bio","jw"], note:"Not sure yet? Practice it all and decide once you pick universities." }
];

EJU.resources = [
  { group:"Official (start here)", items:[
    { name:"JASSO EJU home", url:"https://www.jasso.go.jp/en/ryugaku/eju/index.html", note:"News, rules and every official page." },
    { name:"Guidelines for 2027 EJU", url:"https://www.jasso.go.jp/en/ryugaku/eju/about/eju_guide/2027.html", note:"Dates, fees, venues and subjects for next year." },
    { name:"Exam schedule", url:"https://www.jasso.go.jp/en/ryugaku/eju/schedule.html", note:"Application windows, voucher and result dates." },
    { name:"EJU syllabus", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/syllabus/index.html", note:"Exactly what each subject can test. The 2026 revision still applies." },
    { name:"Past exam questions (free PDFs)", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/pastpaper_sample/index.html", note:"Real past papers with answers. The best practice there is." },
    { name:"How to apply", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/procedure/application.html", note:"Applications go through EJU Online." },
    { name:"Schools that use the EJU", url:"https://www.jasso.go.jp/en/ryugaku/eju/examinee/use/index.html", note:"Check which subjects and math course each university wants." },
    { name:"Study in Japan guide", url:"https://www.studyinjapan.go.jp/en/", note:"Government guide to universities, costs and visas." }
  ]},
  { group:"Japanese", items:[
    { name:"NHK News Web Easy", url:"https://www3.nhk.or.jp/news/easy/", note:"Real news in simpler Japanese with furigana and audio. Read one a day." },
    { name:"NHK World Easy Japanese", url:"https://www.nhk.or.jp/lesson/en/", note:"Free lessons and audio." },
    { name:"JF Japanese e-Learning Minato", url:"https://minato-jf.jp/", note:"Free courses from the Japan Foundation." },
    { name:"Jisho", url:"https://jisho.org/", note:"Fast dictionary for words and kanji." },
    { name:"Tae Kim's guide", url:"https://guidetojapanese.org/learn/", note:"Clear free grammar explanations." },
    { name:"JLPT sample questions", url:"https://www.jlpt.jp/e/samples/forlearners.html", note:"Extra reading and listening practice in an official format." },
    { name:"Anki", url:"https://apps.ankiweb.net/", note:"Spaced repetition flashcards if he outgrows the decks here." }
  ]},
  { group:"Math and science", items:[
    { name:"Try IT (Japanese)", url:"https://www.try-it.jp/", note:"Free Japanese high school video lessons. Great for learning the Japanese terms used on the exam." },
    { name:"Khan Academy", url:"https://www.khanacademy.org/", note:"Free lessons and exercises in math, physics, chemistry and biology." },
    { name:"OpenStax science", url:"https://openstax.org/subjects/science", note:"Free full textbooks." },
    { name:"PhET simulations", url:"https://phet.colorado.edu/", note:"Interactive physics and chemistry simulations." }
  ]},
  { group:"Japan and the World", items:[
    { name:"Statistical Handbook of Japan", url:"https://www.stat.go.jp/english/data/handbook/index.html", note:"Population, economy and society in charts. The exam loves graphs." },
    { name:"Web Japan", url:"https://web-japan.org/", note:"Government overview of Japanese society, politics and culture." },
    { name:"Diplomatic Bluebook", url:"https://www.mofa.go.jp/policy/other/bluebook/index.html", note:"Japan's foreign policy, year by year." },
    { name:"Our World in Data", url:"https://ourworldindata.org/", note:"Clear charts on world population, energy and economics." }
  ]},
  { group:"Books worth buying", items:[
    { name:"Official EJU past question books (日本留学試験 試験問題)", url:"https://www.jasso.go.jp/en/ryugaku/eju/faq_eju/examinee.html", note:"Published by JASSO each year with listening audio. Sold in Japanese bookstores and online." },
    { name:"チャート式 基礎からの数学 (Chart-shiki)", url:"", note:"The classic Japanese math workbook series, recommended by past EJU takers." }
  ]}
];

EJU.plan = [
  { when:"Now to February", what:"Build foundations. Daily Japanese reading and vocabulary. Work through the math syllabus topics one by one." },
  { when:"February 15 to March 11, 2027", what:"Apply for the June exam through EJU Online if he is aiming for June." },
  { when:"March to May", what:"Start timed past papers every weekend. Keep a mistake notebook and redo every wrong answer." },
  { when:"June 20, 2027", what:"1st session exam." },
  { when:"July 12 to August 5, 2027", what:"Apply for the November exam to improve scores or as a second chance." },
  { when:"November 14, 2027", what:"2nd session exam." }
];
