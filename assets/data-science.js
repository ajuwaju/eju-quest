/* Science track for Dhruv: EJU Mathematics Course 2, Physics and Chemistry only.
   Loads after every other data file and narrows the site to these three subjects,
   then adds lessons (each followed by a quiz), the checklist and the university guide.
   All lessons and check questions are original, written to the JASSO 2026 syllabus. */
(function () {
const KEEP = ["m2", "phy", "chem"];

/* Math Course 2 covers everything in Math I and A, so Course 1 questions become Course 2 practice. */
EJU.questions.forEach(q => { if (q.s === "m1") q.s = "m2"; });
EJU.questions = EJU.questions.filter(q => KEEP.includes(q.s));
EJU.subjects = [
  { id:"m2",   name:"Math Course 2", short:"Math", jp:"数学コース2", long:"Mathematics Course 2", icon:"chip" },
  { id:"phy",  name:"Physics",       short:"Physics", jp:"物理", long:"Science: Physics", icon:"bolt" },
  { id:"chem", name:"Chemistry",     short:"Chemistry", jp:"化学", long:"Science: Chemistry", icon:"shard" }
];
EJU.districts = [
  { id:"m2",   name:"Calculus Spire", jp:"微積塔", crew:"gear", subject:"m2",
    blurb:"The tallest tower in the sprawl. All of Math Course 2 lives up here: algebra, functions, trig, probability, vectors, complex numbers and calculus." },
  { id:"phy",  name:"Reactor Row", jp:"炉心街", crew:"nyx", subject:"phy",
    blurb:"Steam, current and motion. Mechanics, heat, waves, electricity, magnetism and atoms keep the lights on." },
  { id:"chem", name:"Synth Labs", jp:"合成研", crew:"nyx", subject:"chem",
    blurb:"Back-alley labs where moles, bonds, equilibrium and redox decide what gets made tonight." }
];
EJU.tracks = [{ id:"sci", name:"Science track", jp:"理系", subjects:KEEP, note:"Mathematics Course 2 and Science (Physics and Chemistry). No Japanese test needed for his programs." }];
EJU.listening = [];
EJU.badges = EJU.badges.filter(b => b.id !== "intercept");
EJU.badges.push({ id:"lessons", name:"Book smart", desc:"Pass the quiz for every lesson in one subject." });

/* Flashcards: formula decks for his three subjects. */
const sci = (EJU.decks.find(d => d.id === "science") || { cards: [] }).cards;
const math = EJU.decks.find(d => d.id === "mathf");
EJU.decks = [
  Object.assign(math, { name:"Math formulas", subject:"m2" }),
  { id:"phyf", name:"Physics formulas", jp:"物理の公式", subject:"phy", cards: sci.slice(0, 13).concat([
    ["Coulomb's law","F","F = kq₁q₂/r²"],
    ["Capacitor","Q and energy","Q = CV. Energy ½CV². C = εS/d"],
    ["Force on a current","wire in a field","F = IBL"],
    ["Force on a charge","moving in a field","F = qvB, giving a circle of radius r = mv/(qB)"],
    ["Faraday's law","induced EMF","V = −N ΔΦ/Δt. Moving rod: V = vBL"],
    ["Snell's law","refraction","n₁ sin θ₁ = n₂ sin θ₂, n = c/v"],
    ["Lens equation","thin lens","1/a + 1/b = 1/f, magnification b/a"],
    ["Photon energy","E","E = hf = hc/λ"],
    ["Photoelectric effect","max kinetic energy","K = hf − W (W is the work function)"],
    ["Half-life","N","N = N₀ (1/2)^(t/T)"],
    ["First law of thermodynamics","ΔU","ΔU = Q + W (W = work done on the gas)"],
    ["Closed pipe","resonance","L = (2n − 1)λ/4, odd harmonics only"]
  ]) },
  { id:"chemf", name:"Chemistry essentials", jp:"化学の基本", subject:"chem", cards: sci.slice(13, 19).concat([
    ["Avogadro constant","N_A","6.02 × 10²³ /mol"],
    ["Gas constant","R","8.31 × 10³ Pa·L/(K·mol)"],
    ["Faraday constant","F","9.65 × 10⁴ C per mol of electrons"],
    ["Water ionic product","25 °C","[H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (mol/L)²"],
    ["Enthalpy change","sign","ΔH < 0 exothermic, ΔH > 0 endothermic"],
    ["Hess's law","ΔH","ΔH depends only on start and end states"],
    ["Freezing point depression","Δt","Δt = K_f × m, counting every dissolved particle"],
    ["Osmotic pressure","Π","Π = cRT"],
    ["Solubility product","AgCl","Ksp = [Ag⁺][Cl⁻]. Precipitate forms when the product exceeds Ksp"],
    ["Oxidation","definition","Loses electrons, oxidation number goes up"],
    ["Formyl group","–CHO","Aldehydes: silver mirror test and Fehling's test"],
    ["Cis-trans isomers","when","Different groups on each carbon of a C=C bond"],
    ["Flame colours","Li Na K Ca Cu","Li red, Na yellow, K violet, Ca orange-red, Cu blue-green"],
    ["Transition elements","2026 syllabus","Groups 3 to 12"]
  ]) }
];

/* Exam facts narrowed to his two subjects. */
EJU.format = [
  { subj:"Mathematics Course 2", time:"80 min", score:"0 to 200", lang:"English or Japanese",
    parts:"Math I, II, III, A, B and C. Four big questions, each made of fill-in boxes: every letter on the answer sheet is one digit or sign." },
  { subj:"Science: Physics and Chemistry", time:"80 min for both", score:"0 to 100 each, 200 total", lang:"English or Japanese",
    parts:"He picks two of physics, chemistry and biology on the day. Physics and Chemistry are about 19 to 20 multiple choice questions each. Split the 80 minutes evenly." }
];
EJU.facts = [
  "Held twice a year, in June and November, in Japan and 14 other countries and regions.",
  "He registers for Mathematics (Course 2) and Science only. He doesn't need the Japanese test or Japan and the World for his programs.",
  "Both subjects can be taken in English. Choose the language when applying; it can't be changed later.",
  "Fee in Japan for 2027: ¥25,000 for two subjects.",
  "Scores are scaled so different sessions compare fairly. There's no pass mark: Aizu and Kyushu compare him with that year's average.",
  "Scores are valid for two years. Results appear on EJU Online; no paper report is mailed."
];
EJU.plan = [
  { when:"Now to February 2027", what:"Work through every lesson here, one subject at a time, and pass each quiz. Start TOEFL or IELTS prep." },
  { when:"February 15 to March 11, 2027", what:"Apply for the June EJU on EJU Online: Mathematics Course 2 and Science, in English." },
  { when:"March to May 2027", what:"Timed JASSO past papers every weekend: 80 minutes math, 80 minutes physics plus chemistry. Redo every miss." },
  { when:"June 20, 2027", what:"EJU 1st session." },
  { when:"July 12 to August 5, 2027", what:"Apply for the November EJU if he wants a higher score." },
  { when:"November 14, 2027", what:"EJU 2nd session." },
  { when:"December 2027", what:"Kyushu IUP application window (for October 2028 entry, based on the 2027 timetable)." },
  { when:"February to March 2028", what:"Aizu ICT Global application window (for October 2028 entry, based on the 2027 timetable)." }
];
EJU.averages.rows = EJU.averages.rows.filter(r => /Math Course 2|Physics|Chemistry/.test(r[0]));
EJU.syllabus = EJU.syllabus.filter(x => ["Math Course 2", "Physics", "Chemistry"].includes(x.subj));
EJU.syllabus[0].items = EJU.syllabus[0].items.map(i => i === "Everything in Course 1" ? "Everything in Math I and A: numbers and expressions, quadratics, trig ratios, data, counting and probability, integers, plane figures" : i);
EJU.strategy = [
  { h:"Know the bar", p:"Aizu and Kyushu both ask for scores above that session's average. In June 2026 that meant about 109 / 200 in Math Course 2, 54 / 100 in Physics and 52 / 100 in Chemistry. Aim well clear of it, not just over." },
  { h:"Math is fill-in-the-blank", p:"Every answer box is a single digit or sign, so the number of boxes tells you the shape of the answer. If you get 3 digits for a 2-box answer, recheck." },
  { h:"Split the science time", p:"80 minutes covers both science subjects. Give physics and chemistry 40 minutes each, and skip and come back rather than sinking 6 minutes into one question." },
  { h:"Past papers are the best practice", p:"Do JASSO's free math and science papers under real time limits. Mark them, then redo every wrong answer a week later." },
  { h:"Use both sessions", p:"Scores stay valid for two years. Take June as a real attempt and November to improve. Universities usually want all subjects from one session." },
  { h:"Scholarship bonus", p:"High scorers can be reserved for the Honors Scholarship (48,000 yen a month) through the EJU application. Tick the box when applying." }
];
/* Resources without Japanese-language study material. */
const DROP = /NHK News Web Easy|Minato|Tae Kim|Jisho|Takoboto|Bunpro|WaniKani|聴解|JLPT|Writing scoring|Statistical Handbook|Web Japan|Our World in Data/;
EJU.resources.forEach(g => { g.items = g.items.filter(i => !DROP.test(i.name)); });
EJU.resources = EJU.resources.filter(g => g.items.length);
EJU.resources.forEach(g => g.items.forEach(i => {
  if (i.name.startsWith("EJU 模試と解説")) i.note = "Six full mock tests per book with detailed answers. Get the Math Course 2 and Science editions.";
  if (i.name === "Official question booklets (with audio)") { i.name = "Official question booklets"; i.note = "JASSO's printed past papers, published by Bonjinsha. Recent years are only in print."; }
  if (i.name === "Try IT (Japanese)") i.note = "Free Japanese high school video lessons for math, physics and chemistry. Useful if he takes the exam in Japanese.";
  if (i.name === "Crash Course") i.note = "Fast video courses on chemistry and physics.";
}));
EJU.resources.forEach(g => {
  if (g.group === "Free study sites") g.items.push(
    { name:"HyperPhysics", url:"http://hyperphysics.phy-astr.gsu.edu/hbase/index.html", note:"A map of every physics topic with short, clear explanations and formulas." },
    { name:"Chemistry LibreTexts", url:"https://chem.libretexts.org/", note:"Free university-level chemistry textbooks, searchable by topic." });
  if (g.group === "Apps") g.items.push(
    { name:"Desmos graphing calculator", url:"https://www.desmos.com/calculator", note:"Graph any function to check a sketch or a max and min." },
    { name:"GeoGebra", url:"https://www.geogebra.org/", note:"Geometry, vectors, 3D and calculus you can drag around." });
});
EJU.pastPapers.forEach(p => { if (p.has === "All subjects") p.has = "Math, Science"; });

/* Allanah's lines for the new parts of the site. */
Object.assign(EJU.allanah, {
  lessonStart: [
    ["calm", "Read the whole lesson first. Then I quiz you, and I'm not going easy."],
    ["smile", "Lesson time. Notes out, phone away."],
    ["shout", "No skipping to the questions! Read it properly."],
    ["calm", "Do the worked example with a pen. That's where the marks are."]
  ],
  lessonPass: [
    ["smile", "Lesson cleared. I ticked it off on your checklist."],
    ["shout", "PASSED! Next lesson, let's go!"],
    ["smile", "See what happens when you actually read it?"],
    ["smile", "Aizu is getting closer. Proud of you."]
  ],
  lessonFail: [
    ["shout", "Under 70%? Read the lesson again, then retry. Don't you want to stay in Japan??"],
    ["calm", "Not yet. Reread the part you missed and go again."],
    ["shock", "Did you even read the lesson? Be honest."]
  ],
  checkTick: [
    ["smile", "Ticked! One step closer."],
    ["smile", "Look at you being organised."],
    ["shout", "Another one done! Keep going!"],
    ["smile", "That's the stuff that gets you into Kyushu."]
  ],
  checkAll: [["shout", "EVERYTHING in this section is done?! Okay, I'm crying."]],
  uniAdd: [
    ["smile", "Added. Check it takes Math Course 2 plus physics or chemistry."],
    ["calm", "Good find. Write the deadline on the checklist too."]
  ]
});
EJU.allanah.cardBad = EJU.allanah.cardBad.map(l => l[1].includes("Learn the word") ? ["shout", "Don't you want to stay in Japan? Learn the formula!"] : l);
["writeLate", "writeEmpty", "writeShort", "writeLong", "writeGood"].forEach(k => delete EJU.allanah[k]);
EJU.allanah.right = EJU.allanah.right.map(l => l);

/* Story: Sable now runs past-paper drills instead of Japanese. */
EJU.crew.sable.bio = "Reads exam papers like code: patterns, traps and shortcuts. Runs the timed past-paper drills and knows exactly where the clock goes.";
const ch8 = EJU.chapters.find(c => c.lvl === 8);
if (ch8) { ch8.title = "Clock work"; ch8.text = "You know the material. Now learn the clock. Eighty minutes for math, eighty for physics and chemistry together. Do a JASSO past paper this weekend with a timer and nothing else on the desk."; }

/* ================= Lessons =================
   Each lesson: read it, then a quiz built from its own check questions plus every bank question on its topics.
   Pass mark 70%. */
const L = (o) => o;
EJU.lessons = [
/* ---------- Math Course 2 ---------- */
L({ id:"m2-alg", s:"m2", n:"Numbers, expressions and equations", topics:["Expressions","Real numbers","Absolute value","Numbers and expressions","Quadratic equations","Inequalities","Various expressions","Integers","Sets and propositions"],
  goal:"Handle the algebra every other math question is built on: expanding, factoring, surds, quadratic equations, inequalities, integers and logic.",
  sections:[
    { h:"Expanding and factoring", list:["(a + b)² = a² + 2ab + b² and (a − b)² = a² − 2ab + b²","(a + b)(a − b) = a² − b²","a³ + b³ = (a + b)(a² − ab + b²) and a³ − b³ = (a − b)(a² + ab + b²)","Binomial theorem: the term with aⁿ⁻ʳbʳ in (a + b)ⁿ has coefficient nCr"] },
    { h:"Surds and absolute value", list:["Rationalise 1/(√a − √b) by multiplying top and bottom by √a + √b","√(x²) = |x|, not x. It is never negative","|x| = x when x ≥ 0 and −x when x < 0. Split into cases at the point where the inside is zero"] },
    { h:"Quadratic equations", list:["x = (−b ± √(b² − 4ac)) / 2a","Discriminant D = b² − 4ac: D > 0 two real roots, D = 0 one (double) root, D < 0 no real roots","Roots α and β: α + β = −b/a and αβ = c/a. Then α² + β² = (α + β)² − 2αβ"] },
    { h:"Inequalities", list:["Multiplying or dividing by a negative number flips the sign","For ax² + bx + c > 0 with a > 0, the answer is outside the roots; for < 0 it's between them","Sketch the parabola. It's faster than memorising rules"] },
    { h:"Polynomials and integers", list:["Remainder theorem: P(x) ÷ (x − a) leaves remainder P(a). If P(a) = 0, (x − a) is a factor","a × b = gcd(a, b) × lcm(a, b)","Euclid: gcd(a, b) = gcd(b, a mod b)"] },
    { h:"Sets and conditions", list:["If p ⇒ q is true, p is sufficient for q and q is necessary for p","A statement and its contrapositive (not q ⇒ not p) are always both true or both false","De Morgan: not (A and B) = (not A) or (not B)"] }
  ],
  example:{ q:"The roots α, β of x² − 5x + k = 0 satisfy α² + β² = 13. Find k.",
    steps:["Vieta: α + β = 5 and αβ = k.","α² + β² = (α + β)² − 2αβ = 25 − 2k.","25 − 2k = 13, so k = 6.","Check: D = 25 − 24 = 1 > 0, so the roots are real."] },
  traps:["Writing √(x²) = x when x could be negative.","Forgetting to flip the inequality after dividing by a negative.","'Real roots' means D ≥ 0, 'two different real roots' means D > 0."],
  tip:"Each EJU math answer box is one digit or a minus sign. If your answer doesn't fit the boxes, something went wrong. Go back.",
  checks:[
    { q:"α and β are the roots of x² − 6x + 4 = 0. What is α² + β²?", c:["28","36","32","20"], a:0, e:"α + β = 6, αβ = 4, so α² + β² = 36 − 8 = 28.", st:["Vieta: α + β = 6, αβ = 4.","α² + β² = (α + β)² − 2αβ.","36 − 8 = 28."] },
    { q:"Simplify 1 / (√5 − √3).", c:["(√5 + √3) / 2","√5 + √3","(√5 − √3) / 2","√2 / 2"], a:0, e:"Multiply by (√5 + √3)/(√5 + √3): the bottom becomes 5 − 3 = 2.", st:["Multiply top and bottom by the conjugate √5 + √3.","Bottom: (√5)² − (√3)² = 2.","Answer: (√5 + √3)/2."] },
    { q:"For real x, the condition x² = 4 is what for x = 2?", c:["Necessary but not sufficient","Sufficient but not necessary","Necessary and sufficient","Neither necessary nor sufficient"], a:0, e:"x = 2 ⇒ x² = 4 is true, but x² = 4 doesn't force x = 2 (x could be −2).", st:["Check x = 2 ⇒ x² = 4: true, so x² = 4 is necessary.","Check x² = 4 ⇒ x = 2: false (x = −2).","So it's necessary but not sufficient."] }
  ] }),
L({ id:"m2-quad", s:"m2", n:"Quadratic functions", topics:["Quadratic functions"],
  goal:"Find vertices, maximums and minimums on a range, and read a parabola from its equation.",
  sections:[
    { h:"Vertex form", list:["Complete the square: y = ax² + bx + c becomes y = a(x − p)² + q","The vertex is (p, q) and the axis is x = p","a > 0 opens up (minimum at the vertex), a < 0 opens down (maximum)"] },
    { h:"Max and min on an interval", list:["Draw the interval on your sketch","If the vertex is inside, it gives the min (a > 0) or max (a < 0)","The other extreme is at whichever end is farther from the axis","With a letter in the interval, split into cases: vertex left of, inside, or right of the interval"] },
    { h:"Moving graphs", list:["Shift right by h: replace x with x − h","Shift up by k: add k","Reflect in the x-axis: y → −y. In the y-axis: x → −x"] },
    { h:"Meeting the x-axis", list:["The graph meets the x-axis where y = 0, so use the discriminant","D > 0 crosses twice, D = 0 touches, D < 0 misses","Both roots greater than 1? Check D ≥ 0, axis > 1 and f(1) > 0"] }
  ],
  example:{ q:"Find the max and min of y = x² − 4x + 1 for 0 ≤ x ≤ 3.",
    steps:["Complete the square: y = (x − 2)² − 3, vertex (2, −3).","x = 2 is inside the interval, so the minimum is −3.","Ends: x = 0 gives 1, x = 3 gives −2.","Maximum is 1 at x = 0, minimum −3 at x = 2."] },
  traps:["Forgetting the coefficient a when completing the square: 2x² − 8x = 2(x² − 4x) = 2(x − 2)² − 8.","Assuming the max is at the right end without checking distance from the axis."],
  tip:"Sketch every parabola, even roughly. It takes 5 seconds and catches most sign mistakes.",
  checks:[
    { q:"What is the vertex of y = 2x² − 8x + 3?", c:["(2, −5)","(−2, −5)","(2, 3)","(4, 3)"], a:0, e:"y = 2(x − 2)² − 8 + 3 = 2(x − 2)² − 5.", st:["Factor 2 from the x terms: 2(x² − 4x) + 3.","Complete the square: 2(x − 2)² − 8 + 3.","Vertex (2, −5)."] },
    { q:"For y = −x² + 2x + 3 on 0 ≤ x ≤ 3, what is the minimum value?", c:["0","3","4","−1"], a:0, e:"Vertex (1, 4) is the maximum. The far end x = 3 gives −9 + 6 + 3 = 0.", st:["y = −(x − 1)² + 4: opens down, max 4 at x = 1.","Minimum is at the end farther from x = 1, which is x = 3.","y(3) = 0."] },
    { q:"y = x² + 2x + k touches the x-axis at exactly one point. What is k?", c:["1","−1","2","4"], a:0, e:"Touching means D = 0: 4 − 4k = 0.", st:["One point of contact means D = 0.","D = 2² − 4k = 4 − 4k.","k = 1."] }
  ] }),
L({ id:"m2-trig", s:"m2", n:"Trigonometry", topics:["Trigonometric ratios","Law of cosines","Trigonometric functions"],
  goal:"Solve triangles with the sine and cosine rules, and work with trig functions, identities and graphs.",
  sections:[
    { h:"Ratios and the unit circle", list:["Point on the unit circle at angle θ: (cos θ, sin θ)","Exact values: sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2","cos is negative in the 2nd and 3rd quadrants, sin in the 3rd and 4th"] },
    { h:"Identities", list:["sin²θ + cos²θ = 1","tan θ = sin θ / cos θ and 1 + tan²θ = 1/cos²θ","Addition: sin(α + β) = sin α cos β + cos α sin β; cos(α + β) = cos α cos β − sin α sin β","Double angle: sin 2θ = 2 sin θ cos θ; cos 2θ = 1 − 2sin²θ = 2cos²θ − 1","Combining: a sin θ + b cos θ = √(a² + b²) sin(θ + α)"] },
    { h:"Solving triangles", list:["Sine rule: a / sin A = b / sin B = c / sin C = 2R (R is the circumradius)","Cosine rule: a² = b² + c² − 2bc cos A","Area = ½ bc sin A"] },
    { h:"Radians and graphs", list:["π radians = 180°","y = sin θ and y = cos θ have period 2π, y = tan θ has period π","y = A sin(kθ) has amplitude |A| and period 2π/k"] }
  ],
  example:{ q:"In triangle ABC, b = 3, c = 5 and A = 120°. Find a.",
    steps:["Cosine rule: a² = 3² + 5² − 2·3·5·cos 120°.","cos 120° = −1/2, so a² = 9 + 25 + 15 = 49.","a = 7."] },
  traps:["cos of an obtuse angle is negative. It changes the sign in the cosine rule.","sin θ = 1/2 has two answers between 0° and 180°: 30° and 150°."],
  tip:"Memorise the 30°, 45°, 60° triangles. Most EJU trig answers are built from √2 and √3.",
  checks:[
    { q:"In triangle ABC, a = 7, b = 5 and c = 8. What is angle A?", c:["60°","45°","120°","30°"], a:0, e:"cos A = (25 + 64 − 49) / (2·5·8) = 40/80 = 1/2.", st:["Rearrange the cosine rule: cos A = (b² + c² − a²) / 2bc.","(25 + 64 − 49) / 80 = 1/2.","A = 60°."] },
    { q:"sin θ = 3/5 and 90° < θ < 180°. What is cos θ?", c:["−4/5","4/5","−3/4","3/4"], a:0, e:"cos²θ = 1 − 9/25 = 16/25, and cos is negative in the 2nd quadrant.", st:["cos²θ = 1 − sin²θ = 16/25.","cos θ = ±4/5.","2nd quadrant, so cos θ = −4/5."] },
    { q:"What is the maximum value of sin θ + √3 cos θ?", c:["2","1 + √3","√3","4"], a:0, e:"sin θ + √3 cos θ = 2 sin(θ + 60°), and sin is at most 1.", st:["√(1² + (√3)²) = 2.","So the expression is 2 sin(θ + 60°).","Maximum 2."] }
  ] }),
L({ id:"m2-prob", s:"m2", n:"Counting, probability and data", topics:["Counting","Probability","Expected value","Probability distributions","Data"],
  goal:"Count arrangements, find probabilities, and use expected value, variance and the binomial distribution (new in the 2026 syllabus).",
  sections:[
    { h:"Counting", list:["Order matters: nPr = n! / (n − r)!. Order doesn't: nCr = n! / (r!(n − r)!)","Round table: (n − 1)! arrangements","Must sit together: glue them into one block, then arrange inside the block","Can't sit together: total minus together"] },
    { h:"Probability", list:["P = favourable outcomes ÷ all equally likely outcomes","At least one: 1 − P(none)","Independent events: multiply","Conditional: P(B | A) = P(A and B) / P(A)","Exactly r successes in n tries: nCr pʳ (1 − p)ⁿ⁻ʳ"] },
    { h:"Random variables", list:["Expected value E(X) = Σ x·P(X = x)","Variance V(X) = E(X²) − {E(X)}², standard deviation σ = √V","E(aX + b) = aE(X) + b and V(aX + b) = a²V(X)","Binomial B(n, p): E = np, V = np(1 − p)"] },
    { h:"Data", list:["Median: middle value after sorting. Quartiles split the data into four","Variance = mean of the squares − square of the mean","Correlation coefficient r is between −1 and 1. Near 0 means no straight-line relation"] }
  ],
  example:{ q:"Three fair coins are tossed. X is the number of heads. Find E(X) and V(X).",
    steps:["X follows B(3, 1/2).","E(X) = np = 3 × 1/2 = 3/2.","V(X) = np(1 − p) = 3 × 1/2 × 1/2 = 3/4."] },
  traps:["Treating identical objects as different (or the other way round).","Using 'or' as add when the events can happen together. Subtract the overlap."],
  tip:"For any 'at least' question, try the complement first. It's almost always shorter.",
  checks:[
    { q:"How many ways are there to choose 3 people from 7?", c:["35","210","21","343"], a:0, e:"7C3 = 7·6·5 / 3·2·1 = 35.", st:["Order doesn't matter, so use combinations.","7C3 = 210 / 6.","35."] },
    { q:"A die is rolled 3 times. What is the probability of at least one 6?", c:["91/216","1/2","125/216","1/6"], a:0, e:"1 − (5/6)³ = 1 − 125/216.", st:["P(no 6 in three rolls) = (5/6)³ = 125/216.","At least one = 1 − 125/216.","91/216."] },
    { q:"X follows a binomial distribution with n = 10 and p = 0.2. What is V(X)?", c:["1.6","2","0.16","8"], a:0, e:"V = np(1 − p) = 10 × 0.2 × 0.8.", st:["Binomial variance is np(1 − p).","10 × 0.2 × 0.8 = 1.6."] }
  ] }),
L({ id:"m2-explog", s:"m2", n:"Exponents and logarithms", topics:["Logarithms","Exponential functions","Exponents and logarithms"],
  goal:"Use the laws of exponents and logs, solve exponential equations and inequalities, and count digits with log₁₀.",
  sections:[
    { h:"Exponent laws", list:["aᵐ·aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁻ⁿ = 1/aⁿ, a^(1/n) = ⁿ√a","Make the bases match: 4ˣ = 2²ˣ, 8 = 2³"] },
    { h:"Logarithm laws", list:["logₐ M = x means aˣ = M (M > 0)","log(MN) = log M + log N, log(M/N) = log M − log N, log Mᵏ = k log M","Change of base: logₐ b = log b / log a"] },
    { h:"Graphs and inequalities", list:["Base a > 1: increasing, so the inequality keeps its direction","Base 0 < a < 1: decreasing, so the inequality flips","Always check the argument of a log is positive"] },
    { h:"Common logs", list:["log₁₀ 2 ≈ 0.3010 and log₁₀ 3 ≈ 0.4771 are given in the question when needed","N has ⌊log₁₀ N⌋ + 1 digits","A number like 0.000xyz: the first nonzero digit is at decimal place −⌊log₁₀ N⌋"] }
  ],
  example:{ q:"How many digits does 2⁵⁰ have? (log₁₀ 2 = 0.3010)",
    steps:["log₁₀ 2⁵⁰ = 50 × 0.3010 = 15.05.","So 10¹⁵ < 2⁵⁰ < 10¹⁶.","2⁵⁰ has 16 digits."] },
  traps:["Forgetting to flip the inequality when the base is less than 1.","Keeping a solution that makes a log's argument zero or negative."],
  tip:"Turn everything into the same base before you do anything else.",
  checks:[
    { q:"log₂ 24 − log₂ 3 = ?", c:["3","8","log₂ 21","21"], a:0, e:"log₂(24/3) = log₂ 8 = 3.", st:["Subtracting logs divides: log₂(24/3).","log₂ 8 = 3."] },
    { q:"Solve 4ˣ = 8.", c:["x = 3/2","x = 2","x = 2/3","x = 1/2"], a:0, e:"2²ˣ = 2³, so 2x = 3.", st:["Write both sides with base 2: 2²ˣ = 2³.","2x = 3.","x = 3/2."] },
    { q:"Using log₁₀ 3 = 0.4771, how many digits does 3²⁰ have?", c:["10","9","11","20"], a:0, e:"20 × 0.4771 = 9.542, so 3²⁰ is between 10⁹ and 10¹⁰.", st:["log₁₀ 3²⁰ = 9.542.","10⁹ < 3²⁰ < 10¹⁰.","10 digits."] },
    { q:"Solve (1/2)ˣ > 1/8.", c:["x < 3","x > 3","x < −3","x > −3"], a:0, e:"(1/2)ˣ > (1/2)³ and the base is less than 1, so x < 3.", st:["Write 1/8 as (1/2)³.","Base 1/2 < 1: the function decreases, so flip.","x < 3."] }
  ] }),
L({ id:"m2-seq", s:"m2", n:"Sequences", topics:["Sequences"],
  goal:"Find terms and sums of arithmetic and geometric sequences, use Σ formulas and solve recurrences.",
  sections:[
    { h:"Arithmetic and geometric", list:["Arithmetic: aₙ = a₁ + (n − 1)d, Sₙ = n(a₁ + aₙ)/2","Geometric: aₙ = a₁rⁿ⁻¹, Sₙ = a₁(rⁿ − 1)/(r − 1) for r ≠ 1"] },
    { h:"Σ formulas", list:["Σk = n(n + 1)/2","Σk² = n(n + 1)(2n + 1)/6","Σk³ = {n(n + 1)/2}²","Fractions like 1/(k(k + 1)) = 1/k − 1/(k + 1) telescope"] },
    { h:"Recurrences", list:["aₙ₊₁ = aₙ + f(n): add up the differences","aₙ₊₁ = paₙ + q: find c with c = pc + q, then aₙ − c is geometric with ratio p","aₙ = Sₙ − Sₙ₋₁ only for n ≥ 2. Check a₁ separately"] },
    { h:"Induction", list:["Prove it for n = 1","Assume it for n = k, then show it for n = k + 1"] }
  ],
  example:{ q:"a₁ = 1 and aₙ₊₁ = 2aₙ + 1. Find aₙ.",
    steps:["Fixed point: c = 2c + 1 gives c = −1.","So aₙ₊₁ + 1 = 2(aₙ + 1): geometric, ratio 2, first term 2.","aₙ + 1 = 2ⁿ, so aₙ = 2ⁿ − 1."] },
  traps:["Using n instead of n − 1 in the general term.","Forgetting Sₙ − Sₙ₋₁ fails for n = 1."],
  tip:"Write out the first three terms of any sequence. It confirms your formula in seconds.",
  checks:[
    { q:"An arithmetic sequence has a₁ = 3 and d = 4. What is a₁₀?", c:["39","43","40","35"], a:0, e:"3 + 9 × 4 = 39.", st:["aₙ = a₁ + (n − 1)d.","3 + 9 × 4 = 39."] },
    { q:"1 + 2 + 4 + … + 2⁹ = ?", c:["1023","1024","511","2047"], a:0, e:"Geometric, 10 terms, ratio 2: (2¹⁰ − 1)/(2 − 1).", st:["Count the terms: 2⁰ to 2⁹ is 10 terms.","S = (2¹⁰ − 1)/1 = 1023."] },
    { q:"Σ k² for k = 1 to 10 = ?", c:["385","55","3025","330"], a:0, e:"10·11·21/6 = 385.", st:["Σk² = n(n + 1)(2n + 1)/6.","10 × 11 × 21 / 6 = 385."] }
  ] }),
L({ id:"m2-vec", s:"m2", n:"Vectors and coordinate geometry", topics:["Vectors","Figures and equations","Equations and curves","Properties of figures","Figures and measurement"],
  goal:"Work with vectors, lines, circles and conic sections, plus the plane-geometry facts the exam leans on.",
  sections:[
    { h:"Vectors", list:["Dot product a·b = x₁x₂ + y₁y₂ = |a||b| cos θ","Perpendicular ⇔ a·b = 0. Parallel ⇔ a = kb","Point dividing AB in ratio m : n: (n·OA + m·OB)/(m + n)","Area of triangle OAB = ½√(|a|²|b|² − (a·b)²)"] },
    { h:"Lines and circles", list:["Perpendicular lines: slopes multiply to −1","Distance from (x₀, y₀) to ax + by + c = 0 is |ax₀ + by₀ + c| / √(a² + b²)","Circle: (x − a)² + (y − b)² = r². A line is tangent when its distance from the centre equals r"] },
    { h:"Curves", list:["Parabola y² = 4px: focus (p, 0), directrix x = −p","Ellipse x²/a² + y²/b² = 1, parametric x = a cos t, y = b sin t","Hyperbola x²/a² − y²/b² = 1, asymptotes y = ±(b/a)x","Polar: x = r cos θ, y = r sin θ"] },
    { h:"Plane figures", list:["Centroid divides each median 2 : 1","Angle bisector divides the opposite side in the ratio of the other two sides","Inscribed angles on the same arc are equal. Angle in a semicircle is 90°","Power of a point: PA·PB = PC·PD"] }
  ],
  example:{ q:"Find the angle between a = (1, 2) and b = (3, 1).",
    steps:["a·b = 3 + 2 = 5.","|a| = √5 and |b| = √10.","cos θ = 5/√50 = 1/√2.","θ = 45°."] },
  traps:["Mixing up the ratio direction in the section formula.","Forgetting to complete the square to find a circle's centre."],
  tip:"Draw the figure with rough coordinates. Vector questions are much easier to see than to read.",
  checks:[
    { q:"a = (2, −1) and b = (1, k) are perpendicular. What is k?", c:["2","−2","1/2","−1/2"], a:0, e:"a·b = 2 − k = 0.", st:["Perpendicular means the dot product is 0.","2·1 + (−1)·k = 2 − k = 0.","k = 2."] },
    { q:"What is the distance from (1, 2) to the line 3x + 4y − 1 = 0?", c:["2","10","2/5","√5"], a:0, e:"|3 + 8 − 1| / √(9 + 16) = 10/5.", st:["Use |ax₀ + by₀ + c| / √(a² + b²).","|3·1 + 4·2 − 1| = 10, √25 = 5.","2."] },
    { q:"What are the centre and radius of x² + y² − 4x + 6y − 3 = 0?", c:["(2, −3), 4","(−2, 3), 4","(2, −3), 16","(2, 3), 4"], a:0, e:"(x − 2)² + (y + 3)² = 3 + 4 + 9 = 16.", st:["Complete the square in x and y.","(x − 2)² − 4 + (y + 3)² − 9 − 3 = 0.","(x − 2)² + (y + 3)² = 16: centre (2, −3), radius 4."] }
  ] }),
L({ id:"m2-cx", s:"m2", n:"Complex numbers and the complex plane", topics:["Complex plane"],
  goal:"Plot complex numbers, use polar form and De Moivre's theorem, and read complex equations as geometry.",
  sections:[
    { h:"Basics", list:["i² = −1. z = a + bi has conjugate z̄ = a − bi","|z| = √(a² + b²) and z·z̄ = |z|²","Divide by multiplying top and bottom by the conjugate of the bottom"] },
    { h:"Polar form", list:["z = r(cos θ + i sin θ), r = |z|, θ = arg z","Multiply: multiply the r's, add the angles. Divide: divide r's, subtract angles","De Moivre: (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ"] },
    { h:"Geometry", list:["Multiplying by i rotates a point 90° anticlockwise about 0","|z − a| = r is a circle centred at a","|z − a| = |z − b| is the perpendicular bisector of a and b","The n solutions of zⁿ = 1 are evenly spaced on the unit circle"] }
  ],
  example:{ q:"Find (1 + i)⁸.",
    steps:["1 + i = √2(cos 45° + i sin 45°).","(1 + i)⁸ = (√2)⁸(cos 360° + i sin 360°).","= 16 × 1 = 16."] },
  traps:["Taking arg z from tan alone. Check which quadrant z is in.","Forgetting r when raising to a power."],
  tip:"Any power above 3 is a polar-form question. Convert first.",
  checks:[
    { q:"|3 − 4i| = ?", c:["5","7","1","25"], a:0, e:"√(9 + 16) = 5.", st:["|a + bi| = √(a² + b²).","√(9 + 16) = 5."] },
    { q:"What is the argument of z = 1 + √3 i?", c:["60°","30°","45°","120°"], a:0, e:"|z| = 2 and z = 2(1/2 + (√3/2)i), so θ = 60°.", st:["|z| = √(1 + 3) = 2.","cos θ = 1/2, sin θ = √3/2.","θ = 60° (π/3)."] },
    { q:"(cos 20° + i sin 20°)⁹ = ?", c:["−1","1","i","−i"], a:0, e:"De Moivre: cos 180° + i sin 180° = −1.", st:["Multiply the angle by 9: 180°.","cos 180° + i sin 180° = −1."] },
    { q:"Multiplying a complex number by i does what to its point?", c:["Rotates it 90° anticlockwise about 0","Reflects it in the real axis","Doubles its distance from 0","Rotates it 180°"], a:0, e:"i = cos 90° + i sin 90°, so it adds 90° to the argument and keeps the size.", st:["|i| = 1, arg i = 90°.","Multiplying adds 90° to the argument.","So it's a 90° anticlockwise rotation."] }
  ] }),
L({ id:"m2-diff", s:"m2", n:"Limits and differentiation", topics:["Limits","Differential calculus"],
  goal:"Evaluate limits, differentiate any function on the syllabus, and use derivatives for tangents and turning points.",
  sections:[
    { h:"Limits", list:["lim (x→0) sin x / x = 1","lim (n→∞) (1 + 1/n)ⁿ = e","∞/∞: divide top and bottom by the highest power","√ − √: multiply by the conjugate"] },
    { h:"Derivatives", list:["(xⁿ)' = nxⁿ⁻¹, (sin x)' = cos x, (cos x)' = −sin x","(eˣ)' = eˣ, (log x)' = 1/x","Product: (fg)' = f'g + fg'. Quotient: (f/g)' = (f'g − fg')/g²","Chain: {f(g(x))}' = f'(g(x))·g'(x)"] },
    { h:"Using derivatives", list:["Tangent at x = a: y − f(a) = f'(a)(x − a)","f'(x) = 0 and a sign change gives a local max or min","f''(x) > 0 means concave up. Points of inflection are where f'' changes sign"] }
  ],
  example:{ q:"Find the local max and min of f(x) = x³ − 3x.",
    steps:["f'(x) = 3x² − 3 = 3(x − 1)(x + 1).","f' = 0 at x = −1 and x = 1.","Sign of f': + , − , + so x = −1 is a max and x = 1 a min.","f(−1) = 2 (local max), f(1) = −2 (local min)."] },
  traps:["f'(a) = 0 doesn't always mean a max or min. Check the sign changes.","Forgetting the inner derivative in the chain rule."],
  tip:"Make a sign table for f' every time. It doubles as your graph sketch.",
  checks:[
    { q:"Differentiate x² sin x.", c:["2x sin x + x² cos x","2x cos x","2x sin x − x² cos x","x² cos x"], a:0, e:"Product rule: (x²)' sin x + x² (sin x)'.", st:["Product rule: f'g + fg'.","2x · sin x + x² · cos x."] },
    { q:"What is the slope of y = e^(2x) at x = 0?", c:["2","1","e²","2e"], a:0, e:"y' = 2e^(2x), and at 0 that's 2.", st:["Chain rule: y' = 2e^(2x).","At x = 0: 2e⁰ = 2."] },
    { q:"lim (x→0) sin 3x / x = ?", c:["3","1","1/3","0"], a:0, e:"sin 3x / x = 3 · sin 3x / 3x → 3·1.", st:["Rewrite as 3 · (sin 3x)/(3x).","(sin 3x)/(3x) → 1.","Limit = 3."] }
  ] }),
L({ id:"m2-int", s:"m2", n:"Integration", topics:["Integral calculus"],
  goal:"Integrate with standard results, substitution and by parts, and find areas and volumes.",
  sections:[
    { h:"Standard integrals", list:["∫xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1)","∫1/x dx = log|x| + C, ∫eˣ dx = eˣ + C","∫sin x dx = −cos x + C, ∫cos x dx = sin x + C"] },
    { h:"Techniques", list:["Substitution: let u = inner function, change dx and the limits","By parts: ∫f g' dx = fg − ∫f' g dx. Choose f to be the part that gets simpler","∫ from α to β of (x − α)(x − β) dx = −(β − α)³/6"] },
    { h:"Area and volume", list:["Area between curves = ∫(upper − lower) dx","Below the x-axis, area = −∫f(x) dx","Volume around the x-axis: V = π∫y² dx"] }
  ],
  example:{ q:"Find the area between y = x² and y = x.",
    steps:["They meet where x² = x: x = 0 and x = 1.","On 0 < x < 1, x is above x².","Area = ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6."] },
  traps:["Using upper − lower the wrong way round and getting a negative area.","Forgetting to change the limits after substitution."],
  tip:"For a parabola and a line, the 1/6 formula gives the area in one line.",
  checks:[
    { q:"∫₀² (3x² + 1) dx = ?", c:["10","8","12","14"], a:0, e:"[x³ + x] from 0 to 2 = 8 + 2.", st:["Antiderivative: x³ + x.","At 2: 8 + 2 = 10. At 0: 0.","10."] },
    { q:"∫ x eˣ dx = ?", c:["(x − 1)eˣ + C","x eˣ + C","(x + 1)eˣ + C","½x² eˣ + C"], a:0, e:"By parts with f = x, g' = eˣ: x eˣ − ∫eˣ dx.", st:["Take f = x, g' = eˣ, so f' = 1, g = eˣ.","x eˣ − ∫ eˣ dx = x eˣ − eˣ.","(x − 1)eˣ + C."] },
    { q:"What is the area enclosed by y = x² − 2x and the x-axis?", c:["4/3","−4/3","2/3","8/3"], a:0, e:"The curve is below the axis on 0 < x < 2: −∫₀² (x² − 2x) dx = 4/3.", st:["Roots at x = 0 and x = 2, curve below the axis between them.","∫₀² (x² − 2x) dx = 8/3 − 4 = −4/3.","Area = 4/3."] }
  ] }),

/* ---------- Physics ---------- */
L({ id:"phy-motion", s:"phy", n:"Motion and projectiles", topics:["Kinematics","Projectile motion"],
  goal:"Describe motion with constant acceleration in one and two dimensions, and read v-t graphs.",
  sections:[
    { h:"The three equations", list:["v = v₀ + at","x = v₀t + ½at²","v² − v₀² = 2ax","Pick the one that leaves out the quantity you don't know and don't need"] },
    { h:"Graphs", list:["On a v-t graph, slope = acceleration and area = displacement","On an x-t graph, slope = velocity"] },
    { h:"Free fall and projectiles", list:["Near the Earth a = g = 9.8 m/s² downward (choose your positive direction and stick to it)","Projectile: horizontal velocity v₀cos θ stays constant; vertical motion is free fall starting at v₀ sin θ","Time to the top: v₀ sin θ / g. Range on flat ground: v₀² sin 2θ / g, greatest at 45°","Relative velocity: B seen from A moves at v_B − v_A"] }
  ],
  example:{ q:"A ball is thrown straight up at 19.6 m/s. How long until it stops rising, and how high does it go?",
    steps:["At the top v = 0: 0 = 19.6 − 9.8t, so t = 2.0 s.","v² − v₀² = 2ax: 0 − 19.6² = 2(−9.8)h.","h = 19.6 m."] },
  traps:["Mixing signs: if up is positive, g is −9.8.","Using the total speed instead of a component in projectile questions."],
  tip:"Write down v₀, v, a, t and x before solving. The missing one tells you the equation.",
  checks:[
    { q:"A car speeds up from 10 m/s to 30 m/s in 5 s. What is its acceleration?", c:["4 m/s²","6 m/s²","2 m/s²","20 m/s²"], a:0, e:"a = Δv/t = 20/5.", st:["Δv = 30 − 10 = 20 m/s.","a = 20 / 5 = 4 m/s²."] },
    { q:"A ball is dropped from rest. How far does it fall in the first 3.0 s? (g = 9.8 m/s²)", c:["44.1 m","29.4 m","88.2 m","14.7 m"], a:0, e:"x = ½gt² = ½ × 9.8 × 9.", st:["v₀ = 0, so x = ½gt².","½ × 9.8 × 3² = 44.1 m."] },
    { q:"Projectiles are launched at the same speed on flat ground with no air resistance. Which angle gives the longest range?", c:["45°","30°","60°","90°"], a:0, e:"Range = v₀² sin 2θ / g, largest when sin 2θ = 1.", st:["Range ∝ sin 2θ.","sin 2θ is largest at 2θ = 90°.","θ = 45°."] }
  ] }),
L({ id:"phy-force", s:"phy", n:"Forces and Newton's laws", topics:["Newton's laws","Forces","Springs"],
  goal:"Draw free-body diagrams and apply ma = F, including friction, slopes, springs and connected objects.",
  sections:[
    { h:"Newton's laws", list:["1st: no net force, no change in velocity","2nd: ma = F (net force)","3rd: forces come in equal and opposite pairs acting on different objects"] },
    { h:"The usual forces", list:["Weight mg, normal force N, tension T","Friction: static up to μN, kinetic μ'N, always opposing sliding","On a slope at θ: mg sin θ down the slope, mg cos θ into it"] },
    { h:"Springs", list:["Hooke's law F = kx","Springs in series: 1/k = 1/k₁ + 1/k₂. In parallel: k = k₁ + k₂"] },
    { h:"Balance and torque", list:["In equilibrium the forces add to zero and the moments (force × distance) add to zero about any point","Connected objects: treat them as one body to get a, then look at one body to get the tension"] }
  ],
  example:{ q:"Blocks of 2 kg and 3 kg touch on a smooth floor. A 10 N push acts on the 3 kg block. Find a and the force between the blocks.",
    steps:["Whole system: 10 = (2 + 3)a, so a = 2.0 m/s².","The 2 kg block is pushed only by the 3 kg block: F = 2 × 2.0.","Contact force = 4.0 N."] },
  traps:["Putting ma in the diagram as an extra force.","Using N = mg on a slope (it's mg cos θ)."],
  tip:"One free-body diagram per object, every time. Most physics mistakes start with a missing force.",
  checks:[
    { q:"A 5.0 kg box slides down a smooth 30° slope. What is its acceleration? (g = 9.8 m/s²)", c:["4.9 m/s²","9.8 m/s²","8.5 m/s²","2.5 m/s²"], a:0, e:"a = g sin 30° = 9.8 × 0.5. Mass cancels.", st:["Force along the slope: mg sin 30°.","a = g sin 30° = 4.9 m/s²."] },
    { q:"A spring with k = 50 N/m is stretched by 0.04 m. What force does it exert?", c:["2.0 N","1250 N","0.8 N","20 N"], a:0, e:"F = kx = 50 × 0.04.", st:["Hooke's law F = kx.","50 × 0.04 = 2.0 N."] },
    { q:"A 10 kg box slides on a level floor with μ' = 0.20. What is the friction force? (g = 9.8 m/s²)", c:["19.6 N","98 N","2.0 N","49 N"], a:0, e:"F = μ'N = 0.20 × 10 × 9.8.", st:["Level floor: N = mg = 98 N.","F = μ'N = 0.20 × 98 = 19.6 N."] }
  ] }),
L({ id:"phy-energy", s:"phy", n:"Energy and momentum", topics:["Energy","Momentum"],
  goal:"Use work, energy conservation, power, impulse and momentum conservation in collisions.",
  sections:[
    { h:"Work and energy", list:["Work W = Fs cos θ","Kinetic energy ½mv², gravitational PE mgh, spring PE ½kx²","Work-energy theorem: change in KE = total work done","With no friction, mechanical energy (KE + PE) is conserved","Power P = W/t = Fv"] },
    { h:"Momentum", list:["p = mv (a vector)","Impulse = FΔt = Δp","With no external force, total momentum is conserved in every collision"] },
    { h:"Collisions", list:["Coefficient of restitution e = −(v₁' − v₂')/(v₁ − v₂)","e = 1: elastic, KE conserved. e = 0: they stick together","0 < e < 1: some KE turns into heat and sound"] }
  ],
  example:{ q:"A 2.0 kg cart at 3.0 m/s hits a 1.0 kg cart at rest and they stick. Find the final speed and the KE lost.",
    steps:["Momentum: 2.0 × 3.0 = 3.0v, so v = 2.0 m/s.","KE before: ½ × 2 × 9 = 9.0 J. After: ½ × 3 × 4 = 6.0 J.","Lost: 3.0 J."] },
  traps:["Using energy conservation in an inelastic collision.","Forgetting momentum signs when objects move opposite ways."],
  tip:"Collision: always momentum first. Then e or energy if the question gives it.",
  checks:[
    { q:"A 2.0 kg ball falls 5.0 m from rest. What is its speed at the bottom? (g = 9.8 m/s², no air)", c:["9.9 m/s","98 m/s","7.0 m/s","49 m/s"], a:0, e:"mgh = ½mv², v = √(2gh) = √98.", st:["Energy: mgh = ½mv², so v = √(2gh).","√(2 × 9.8 × 5) = √98 ≈ 9.9 m/s."] },
    { q:"A 20 N force pushes a box 3.0 m at 60° to the direction of motion. How much work does it do?", c:["30 J","60 J","52 J","15 J"], a:0, e:"W = Fs cos 60° = 20 × 3 × 0.5.", st:["W = Fs cos θ.","20 × 3.0 × 0.5 = 30 J."] },
    { q:"A ball hits a fixed wall at 10 m/s and bounces straight back at 6 m/s. What is e?", c:["0.6","0.4","1.6","0.8"], a:0, e:"e = rebound speed / approach speed for a fixed wall.", st:["Wall doesn't move.","e = 6/10 = 0.6."] }
  ] }),
L({ id:"phy-circ", s:"phy", n:"Circular motion, oscillation and gravity", topics:["Circular motion","Oscillation"],
  goal:"Handle uniform circular motion, simple harmonic motion, pendulums and orbits.",
  sections:[
    { h:"Circular motion", list:["ω = 2π/T, v = rω","Centripetal acceleration a = v²/r = rω², pointing to the centre","The net inward force equals mv²/r. It's not a new force: it's tension, gravity, friction or the normal force"] },
    { h:"Simple harmonic motion", list:["x = A sin ωt, a = −ω²x","Spring: T = 2π√(m/k). Pendulum (small swings): T = 2π√(L/g)","Max speed Aω at the centre, max acceleration Aω² at the ends"] },
    { h:"Gravity", list:["F = GMm/r²","Circular orbit: GMm/r² = mv²/r, so v = √(GM/r)","Kepler's third law: T² ∝ r³"] }
  ],
  example:{ q:"A 0.50 kg mass on a spring with k = 200 N/m oscillates. Find the period.",
    steps:["T = 2π√(m/k) = 2π√(0.50/200).","√0.0025 = 0.050.","T = 0.10π ≈ 0.31 s."] },
  traps:["Adding 'centripetal force' to a diagram as a separate force.","Thinking a pendulum's period depends on its mass."],
  tip:"For circles: list the real forces, find their component toward the centre, set it equal to mv²/r.",
  checks:[
    { q:"An object moves in a circle of radius 2.0 m at 4.0 m/s. What is its centripetal acceleration?", c:["8.0 m/s²","2.0 m/s²","32 m/s²","16 m/s²"], a:0, e:"a = v²/r = 16/2.", st:["a = v²/r.","4.0² / 2.0 = 8.0 m/s²."] },
    { q:"A pendulum's length is made 4 times longer. Its period becomes:", c:["2 times longer","4 times longer","Half as long","Unchanged"], a:0, e:"T ∝ √L, and √4 = 2.", st:["T = 2π√(L/g).","L × 4 gives T × √4 = T × 2."] },
    { q:"A satellite's orbit radius doubles. The gravitational force on it becomes:", c:["1/4 as large","1/2 as large","2 times larger","Unchanged"], a:0, e:"F ∝ 1/r², so doubling r divides F by 4.", st:["F = GMm/r².","r × 2 gives F ÷ 4."] }
  ] }),
L({ id:"phy-heat", s:"phy", n:"Heat and thermodynamics", topics:["Thermodynamics","Heat"],
  goal:"Use heat capacity, the gas laws and the first law of thermodynamics for every type of process.",
  sections:[
    { h:"Heat", list:["Q = mcΔT (c is specific heat). Heat capacity C = mc","Changing state: Q = mL with no temperature change","Mixing: heat lost by the hot object = heat gained by the cold one"] },
    { h:"Gas laws", list:["PV = nRT with T in kelvin (K = °C + 273)","Constant T: PV constant. Constant P: V ∝ T. Constant V: P ∝ T"] },
    { h:"First law", list:["ΔU = Q + W, where Q is heat added and W is work done on the gas","Gas doing work W' on the surroundings: ΔU = Q − W'","Monatomic ideal gas: U = (3/2)nRT"] },
    { h:"Processes", list:["Constant volume: W = 0, so Q = ΔU","Constant pressure: work by gas = PΔV","Constant temperature: ΔU = 0, so heat in = work out","Adiabatic: Q = 0. Expansion cools the gas","Heat engine efficiency e = work out / heat in"] }
  ],
  example:{ q:"2.0 mol of a monatomic ideal gas is heated at constant volume by 100 K. How much heat is needed? (R = 8.3 J/(mol·K))",
    steps:["Constant volume: W = 0, so Q = ΔU.","ΔU = (3/2)nRΔT = 1.5 × 2.0 × 8.3 × 100.","Q ≈ 2.5 × 10³ J."] },
  traps:["Using °C in PV = nRT.","Mixing up the sign of W: done on the gas or by the gas."],
  tip:"Write which of Q, W and ΔU is zero first. That's half of every thermodynamics question.",
  checks:[
    { q:"How much heat warms 200 g of water from 20 °C to 70 °C? (c = 4.2 J/(g·K))", c:["4.2 × 10⁴ J","8.4 × 10³ J","4.2 × 10³ J","2.1 × 10⁴ J"], a:0, e:"Q = 200 × 4.2 × 50.", st:["ΔT = 50 K.","Q = mcΔT = 200 × 4.2 × 50 = 42 000 J."] },
    { q:"An ideal gas at constant pressure has its absolute temperature doubled. Its volume:", c:["Doubles","Halves","Stays the same","Quadruples"], a:0, e:"At constant P, V ∝ T.", st:["PV = nRT with P and n fixed.","V ∝ T, so V doubles."] },
    { q:"A gas absorbs 500 J of heat and does 200 J of work on its surroundings. What is ΔU?", c:["+300 J","+700 J","−300 J","−700 J"], a:0, e:"ΔU = Q − (work by gas) = 500 − 200.", st:["Heat in: +500 J.","Work done by the gas takes 200 J out.","ΔU = +300 J."] },
    { q:"An ideal gas expands adiabatically. Its temperature:", c:["Falls","Rises","Stays the same","Depends on the gas"], a:0, e:"Q = 0 and the gas does work, so ΔU < 0 and T falls.", st:["Adiabatic: Q = 0.","Expansion: the gas does work, so ΔU = −W' < 0.","U ∝ T, so T falls."] }
  ] }),
L({ id:"phy-waves", s:"phy", n:"Waves, sound and light", topics:["Waves","Sound","Light"],
  goal:"Use the wave equation, standing waves, the Doppler effect, refraction, lenses and interference.",
  sections:[
    { h:"Wave basics", list:["v = fλ and T = 1/f","Transverse waves vibrate across the direction of travel; longitudinal (sound) along it","Standing waves: nodes are λ/2 apart"] },
    { h:"Strings and pipes", list:["String fixed at both ends and open pipe: L = nλ/2","Pipe closed at one end: L = (2n − 1)λ/4, odd harmonics only","Beats: f_beat = |f₁ − f₂|"] },
    { h:"Doppler effect", list:["f' = f (V − v_o)/(V − v_s), with velocities positive in the direction from source to observer","Moving toward each other raises the pitch, moving apart lowers it"] },
    { h:"Light", list:["n = c/v. Snell: n₁ sin θ₁ = n₂ sin θ₂","Total internal reflection when sin θ > 1/n going from glass to air","Lens: 1/a + 1/b = 1/f, magnification b/a","Double slit: bright fringes Δx = Lλ/d apart"] }
  ],
  example:{ q:"A pipe closed at one end is 0.85 m long. Sound travels at 340 m/s. Find the fundamental frequency.",
    steps:["Fundamental: L = λ/4, so λ = 3.4 m.","f = v/λ = 340/3.4.","f = 100 Hz."] },
  traps:["Using the open-pipe formula for a closed pipe.","Frequency doesn't change when a wave enters a new medium. Speed and wavelength do."],
  tip:"Draw the standing wave in the pipe or string. Counting quarter-wavelengths beats memorising.",
  checks:[
    { q:"A wave has frequency 50 Hz and wavelength 2.0 m. What is its speed?", c:["100 m/s","25 m/s","52 m/s","0.04 m/s"], a:0, e:"v = fλ = 50 × 2.0.", st:["v = fλ.","50 × 2.0 = 100 m/s."] },
    { q:"Tuning forks of 440 Hz and 444 Hz sound together. How many beats per second?", c:["4","2","442","884"], a:0, e:"f_beat = |444 − 440|.", st:["Beat frequency = difference.","444 − 440 = 4 per second."] },
    { q:"Light enters glass with n = 1.5. What is its speed in the glass? (c = 3.0 × 10⁸ m/s)", c:["2.0 × 10⁸ m/s","4.5 × 10⁸ m/s","3.0 × 10⁸ m/s","1.5 × 10⁸ m/s"], a:0, e:"v = c/n = 3.0 × 10⁸ / 1.5.", st:["n = c/v, so v = c/n.","3.0 × 10⁸ / 1.5 = 2.0 × 10⁸ m/s."] },
    { q:"A string fixed at both ends is 0.60 m long. What is the wavelength of its fundamental?", c:["1.2 m","0.60 m","0.30 m","2.4 m"], a:0, e:"Fundamental: L = λ/2.", st:["Fixed ends are nodes; the fundamental is half a wavelength.","λ = 2L = 1.2 m."] }
  ] }),
L({ id:"phy-elec", s:"phy", n:"Electric fields and circuits", topics:["Electricity"],
  goal:"Work with charges, fields, potential, capacitors and DC circuits.",
  sections:[
    { h:"Fields and potential", list:["Coulomb: F = kq₁q₂/r²","Field E = F/q. Uniform field between plates: V = Ed","Moving a charge q through potential difference V changes its energy by qV"] },
    { h:"Capacitors", list:["Q = CV, C = εS/d","Energy stored ½CV² = Q²/2C","Parallel: C = C₁ + C₂. Series: 1/C = 1/C₁ + 1/C₂ (opposite of resistors)"] },
    { h:"Circuits", list:["V = IR, R = ρL/S","Series: R = R₁ + R₂. Parallel: 1/R = 1/R₁ + 1/R₂","Power P = VI = I²R = V²/R","Real battery: E = V + Ir (r is internal resistance)","Kirchhoff: currents into a junction = currents out; voltages around a loop add to zero"] }
  ],
  example:{ q:"6 Ω and 3 Ω resistors are in parallel across 12 V. Find the total current and power.",
    steps:["1/R = 1/6 + 1/3 = 1/2, so R = 2 Ω.","I = V/R = 12/2 = 6 A.","P = VI = 72 W."] },
  traps:["Using the resistor rules for capacitors.","Forgetting a battery's internal resistance when the question gives it."],
  tip:"Redraw messy circuits until series and parallel parts are obvious.",
  checks:[
    { q:"Three 6 Ω resistors are connected in parallel. What is the total resistance?", c:["2 Ω","18 Ω","3 Ω","1/2 Ω"], a:0, e:"1/R = 3 × 1/6 = 1/2.", st:["1/R = 1/6 + 1/6 + 1/6 = 1/2.","R = 2 Ω."] },
    { q:"A 2.0 μF capacitor is charged to 10 V. How much energy does it store?", c:["1.0 × 10⁻⁴ J","2.0 × 10⁻⁵ J","1.0 × 10⁻³ J","2.0 × 10⁻⁴ J"], a:0, e:"½CV² = ½ × 2.0 × 10⁻⁶ × 100.", st:["Energy = ½CV².","½ × 2.0 × 10⁻⁶ × 10² = 1.0 × 10⁻⁴ J."] },
    { q:"A 9.0 V battery with 1.0 Ω internal resistance is connected to a 2.0 Ω resistor. What current flows?", c:["3.0 A","4.5 A","9.0 A","2.0 A"], a:0, e:"I = E/(R + r) = 9/3.", st:["Total resistance = 2.0 + 1.0 = 3.0 Ω.","I = 9.0 / 3.0 = 3.0 A."] }
  ] }),
L({ id:"phy-mag", s:"phy", n:"Magnetism and induction", topics:["Magnetism"],
  goal:"Find magnetic fields and forces, and use Faraday's and Lenz's laws, transformers and AC.",
  sections:[
    { h:"Magnetic fields", list:["Long straight wire: B = μ₀I/(2πr), circles around the wire (right-hand rule)","Solenoid: B = μ₀nI inside, n = turns per metre"] },
    { h:"Magnetic forces", list:["Current in a field: F = IBL (Fleming's left-hand rule)","Moving charge: F = qvB. It moves in a circle of radius r = mv/(qB)","Two parallel currents in the same direction attract"] },
    { h:"Induction", list:["Flux Φ = BS","Faraday: V = −N ΔΦ/Δt","Lenz: the induced current opposes the change that caused it","Rod moving through a field: V = vBL"] },
    { h:"AC and transformers", list:["V₁/V₂ = N₁/N₂ and (ideal) V₁I₁ = V₂I₂","RMS value = peak / √2"] }
  ],
  example:{ q:"A 0.50 m rod moves at 4.0 m/s at right angles to a 0.20 T field. Find the induced EMF.",
    steps:["V = vBL.","4.0 × 0.20 × 0.50.","V = 0.40 V."] },
  traps:["Using the right-hand rule where the left-hand (force) rule belongs.","Forgetting the minus sign's meaning: it's Lenz's law, the direction opposes the change."],
  tip:"For every induction question, ask 'is the flux increasing or decreasing?' before anything else.",
  checks:[
    { q:"A 0.50 m wire carries 4.0 A at right angles to a 0.30 T field. What force acts on it?", c:["0.60 N","2.4 N","6.0 N","0.15 N"], a:0, e:"F = IBL = 4.0 × 0.30 × 0.50.", st:["F = IBL.","4.0 × 0.30 × 0.50 = 0.60 N."] },
    { q:"A transformer has 100 turns on the primary and 500 on the secondary. The input is 20 V AC. What is the output?", c:["100 V","4 V","20 V","500 V"], a:0, e:"V₂ = V₁ × N₂/N₁ = 20 × 5.", st:["V₁/V₂ = N₁/N₂.","V₂ = 20 × 500/100 = 100 V."] },
    { q:"A proton enters a uniform magnetic field moving at right angles to it. What path does it follow?", c:["A circle","A straight line","A parabola","A spiral outward"], a:0, e:"The force qvB is always perpendicular to the velocity, so it acts as a centripetal force.", st:["F = qvB, perpendicular to v.","A force always perpendicular to v changes direction, not speed.","Uniform circular motion."] },
    { q:"The north pole of a magnet is pushed into a coil. The end of the coil facing the magnet becomes:", c:["A north pole","A south pole","No pole","It alternates"], a:0, e:"Lenz's law: the coil opposes the approach, so it repels the north pole with a north pole.", st:["Flux into the coil increases.","The induced current opposes the change.","It repels the magnet: north facing north."] }
  ] }),
L({ id:"phy-atom", s:"phy", n:"Atoms, light and nuclei", topics:["Atomic physics","Atoms"],
  goal:"Use photons, the photoelectric effect, energy levels, radioactive decay and half-life.",
  sections:[
    { h:"Photons", list:["E = hf = hc/λ","Photoelectric effect: K_max = hf − W","Brighter light means more electrons, not faster ones. Only frequency changes K_max","de Broglie wavelength λ = h/(mv)"] },
    { h:"Energy levels", list:["An electron dropping from level E₂ to E₁ emits a photon hf = E₂ − E₁","Each element has its own line spectrum"] },
    { h:"Nuclei", list:["Mass number A = protons + neutrons, atomic number Z = protons","α decay: A − 4, Z − 2. β⁻ decay: A same, Z + 1. γ: no change","Half-life T: N = N₀(1/2)^(t/T)","Mass defect: E = Δmc²"] }
  ],
  example:{ q:"A sample has a half-life of 8 days. What fraction remains after 24 days?",
    steps:["24 / 8 = 3 half-lives.","(1/2)³ = 1/8.","1/8 remains."] },
  traps:["Thinking brighter light gives faster photoelectrons.","Changing the mass number in β decay."],
  tip:"For decay chains, write A and Z for each step in a small table.",
  checks:[
    { q:"²³⁸U (Z = 92) emits an alpha particle. What are the new mass number and atomic number?", c:["234 and 90","238 and 91","234 and 92","236 and 90"], a:0, e:"α decay removes 2 protons and 2 neutrons.", st:["α = ⁴He: A − 4, Z − 2.","238 − 4 = 234, 92 − 2 = 90."] },
    { q:"A substance has a half-life of 5 days. What fraction is left after 15 days?", c:["1/8","1/3","1/6","1/4"], a:0, e:"15/5 = 3 half-lives, so (1/2)³.", st:["15 / 5 = 3 half-lives.","(1/2)³ = 1/8."] },
    { q:"In the photoelectric effect, making the light brighter at the same frequency increases:", c:["The number of electrons emitted","The maximum kinetic energy of the electrons","The work function","The threshold frequency"], a:0, e:"Intensity means more photons, so more electrons. Each photon still has energy hf.", st:["Brighter = more photons per second.","Each photon's energy hf is unchanged, so K_max is unchanged.","More photons means more electrons."] }
  ] }),

/* ---------- Chemistry ---------- */
L({ id:"chem-atom", s:"chem", n:"Atoms and the periodic table", topics:["Atomic structure","Periodic table"],
  goal:"Count particles in atoms and ions, use electron shells, and predict trends across the periodic table.",
  sections:[
    { h:"Inside the atom", list:["Atomic number Z = protons. Mass number A = protons + neutrons","Isotopes: same Z, different numbers of neutrons","Shells: K holds 2, L holds 8, M holds 18. Valence electrons decide chemical properties"] },
    { h:"Trends", list:["Atomic radius: smaller across a period, larger down a group","First ionization energy: larger across a period (noble gases highest), smaller down a group","Electronegativity: fluorine is the highest","Ions with the same electron arrangement: more protons, smaller ion (O²⁻ > F⁻ > Na⁺ > Mg²⁺)"] },
    { h:"Groups (2026 syllabus)", list:["Group 1 alkali metals, group 17 halogens, group 18 noble gases","All of group 2, including Be and Mg, are now alkaline earth metals","Groups 3 to 12 are transition elements (group 12 now counts)"] }
  ],
  example:{ q:"How many protons, neutrons and electrons does ³⁵Cl⁻ have?",
    steps:["Cl has Z = 17, so 17 protons.","Neutrons = 35 − 17 = 18.","A 1− charge adds an electron: 18 electrons."] },
  traps:["Changing protons when forming an ion (only electrons change).","Using the old rule that Be and Mg aren't alkaline earth metals."],
  tip:"Learn the first 20 elements in order. Half of the chemistry paper assumes you know them.",
  checks:[
    { q:"How many protons, neutrons and electrons does ²⁷Al³⁺ have?", c:["13, 14, 10","13, 14, 13","14, 13, 10","13, 27, 16"], a:0, e:"Al has Z = 13; 27 − 13 = 14 neutrons; 3+ means 3 electrons lost.", st:["Protons = Z = 13.","Neutrons = 27 − 13 = 14.","Electrons = 13 − 3 = 10."] },
    { q:"Which atom has the largest first ionization energy?", c:["He","Ne","Na","K"], a:0, e:"Ionization energy is highest for noble gases and higher higher up a group. He is the highest of all.", st:["Noble gases have the highest values in each period.","Going up a group, the electron is held more tightly.","He is the largest."] },
    { q:"Under the 2026 EJU syllabus, which group counts as transition elements?", c:["Group 12","Group 2","Group 13","Group 17"], a:0, e:"Transition elements are now groups 3 to 12, so zinc's group 12 is included.", st:["2026 change: transition elements are groups 3 to 12.","Group 12 is inside that range."] }
  ] }),
L({ id:"chem-bond", s:"chem", n:"Bonding and states of matter", topics:["Bonding","Intermolecular forces","States of matter"],
  goal:"Identify bond types and molecular shapes, explain boiling points, and count atoms in crystal unit cells.",
  sections:[
    { h:"Bonds", list:["Ionic: metal and non-metal (NaCl)","Covalent: non-metals share electron pairs","Metallic: free electrons, so metals conduct and bend","Coordinate bond: both electrons come from one atom (NH₄⁺, H₃O⁺)"] },
    { h:"Shapes and polarity", list:["CH₄ tetrahedral, NH₃ trigonal pyramidal, H₂O bent, CO₂ linear","A molecule with polar bonds can still be non-polar if they cancel (CO₂, CH₄)"] },
    { h:"Forces between molecules", list:["Van der Waals forces grow with molecular size","Hydrogen bonds form with H on F, O or N. They explain why H₂O, HF and NH₃ boil unusually high"] },
    { h:"Crystals and states", list:["Body-centred cubic: 2 atoms per unit cell. Face-centred cubic: 4","Covalent network solids (diamond, SiO₂) have very high melting points","A liquid boils when its vapour pressure equals the outside pressure","Gas → solid directly is deposition (凝華, a new term in 2026). Solid → gas is sublimation"] }
  ],
  example:{ q:"How many atoms are in a face-centred cubic unit cell?",
    steps:["8 corners, each shared by 8 cells: 8 × 1/8 = 1.","6 faces, each shared by 2 cells: 6 × 1/2 = 3.","Total: 4 atoms."] },
  traps:["Calling CO₂ polar because C=O is polar.","Thinking hydrogen bonds are bonds inside the molecule."],
  tip:"Boiling point questions: check hydrogen bonding first, then molecular size.",
  checks:[
    { q:"Why does H₂O boil at a much higher temperature than H₂S?", c:["Hydrogen bonds between H₂O molecules","H₂O is heavier","H₂S has ionic bonds","H₂O has more electrons"], a:0, e:"O is very electronegative, so H₂O molecules hydrogen-bond to each other. S is not.", st:["H₂S is heavier, so size alone would predict the opposite.","H on O forms hydrogen bonds; H on S doesn't.","Extra attraction raises the boiling point."] },
    { q:"What shape is an NH₃ molecule?", c:["Trigonal pyramidal","Trigonal planar","Tetrahedral","Bent"], a:0, e:"Three bonding pairs and one lone pair on N push the H atoms into a pyramid.", st:["N has 3 bonds and 1 lone pair.","Four electron groups point to a tetrahedron's corners.","Only three are atoms, so the shape is a pyramid."] },
    { q:"How many atoms are in a body-centred cubic unit cell?", c:["2","4","1","8"], a:0, e:"8 corners × 1/8 + 1 centre atom.", st:["Corners: 8 × 1/8 = 1.","Centre: 1.","Total 2."] },
    { q:"What is the direct change from gas to solid called?", c:["Deposition","Sublimation","Condensation","Fusion"], a:0, e:"Gas → solid is deposition (凝華). Solid → gas is sublimation.", st:["Gas to liquid is condensation; liquid to solid is freezing.","Skipping the liquid from gas to solid is deposition."] }
  ] }),
L({ id:"chem-mole", s:"chem", n:"Moles and reactions", topics:["Moles","Reactions"],
  goal:"Convert between mass, particles, gas volume and moles, and use balanced equations and concentrations.",
  sections:[
    { h:"The mole", list:["n = mass / molar mass","n = particles / (6.02 × 10²³)","n = gas volume / 22.4 L at 0 °C and 1.013 × 10⁵ Pa"] },
    { h:"Equations", list:["Balance atoms on both sides","Coefficients give the mole ratio","Limiting reagent: the one that runs out first decides how much product forms"] },
    { h:"Concentration", list:["Molarity (mol/L) = moles of solute / litres of solution","Mass percent = solute mass / solution mass × 100","Molality (mol/kg) = moles of solute / kg of solvent"] }
  ],
  example:{ q:"4.0 g of H₂ burns completely: 2H₂ + O₂ → 2H₂O. What mass of water forms? (H = 1.0, O = 16)",
    steps:["n(H₂) = 4.0 / 2.0 = 2.0 mol.","Ratio H₂ : H₂O = 2 : 2, so 2.0 mol of water.","Mass = 2.0 × 18 = 36 g."] },
  traps:["Using the mass ratio instead of the mole ratio.","Using 22.4 L at room temperature."],
  tip:"Every calculation goes through moles. Convert to moles first, out of moles last.",
  checks:[
    { q:"How many moles are in 11 g of CO₂? (C = 12, O = 16)", c:["0.25 mol","0.50 mol","4.0 mol","0.11 mol"], a:0, e:"Molar mass 44 g/mol: 11/44.", st:["M(CO₂) = 12 + 32 = 44 g/mol.","11 / 44 = 0.25 mol."] },
    { q:"What volume does 0.50 mol of gas take up at 0 °C and 1.013 × 10⁵ Pa?", c:["11.2 L","22.4 L","44.8 L","5.6 L"], a:0, e:"0.50 × 22.4 L.", st:["1 mol takes 22.4 L under these conditions.","0.50 × 22.4 = 11.2 L."] },
    { q:"3 mol H₂ and 1 mol O₂ react (2H₂ + O₂ → 2H₂O). How much water forms?", c:["2 mol","3 mol","1 mol","4 mol"], a:0, e:"1 mol O₂ needs only 2 mol H₂, so O₂ runs out first and gives 2 mol water.", st:["O₂ : H₂ = 1 : 2, so 1 mol O₂ uses 2 mol H₂.","O₂ is limiting.","1 mol O₂ → 2 mol H₂O."] },
    { q:"5.85 g of NaCl is dissolved to make 500 mL of solution. What is its molarity? (Na = 23, Cl = 35.5)", c:["0.20 mol/L","0.10 mol/L","0.050 mol/L","2.0 mol/L"], a:0, e:"5.85 / 58.5 = 0.10 mol in 0.50 L.", st:["M(NaCl) = 58.5, so n = 0.10 mol.","Volume = 0.500 L.","0.10 / 0.50 = 0.20 mol/L."] }
  ] }),
L({ id:"chem-gas", s:"chem", n:"Gases and solutions", topics:["Gases","Solutions"],
  goal:"Use the ideal gas law and partial pressures, then the colligative properties of solutions and colloids.",
  sections:[
    { h:"Gases", list:["PV = nRT, R = 8.31 × 10³ Pa·L/(K·mol)","Dalton: partial pressure = mole fraction × total pressure","Molar mass from density: M = dRT/P","Real gases deviate most at high pressure and low temperature"] },
    { h:"Solubility", list:["Solubility curves show grams per 100 g of water","Henry's law: a gas's solubility is proportional to its partial pressure"] },
    { h:"Colligative properties", list:["Boiling point rises Δt = K_b·m, freezing point falls Δt = K_f·m","Count particles: NaCl gives 2, CaCl₂ gives 3, glucose 1","Osmotic pressure Π = cRT"] },
    { h:"Colloids", list:["Tyndall effect: a light beam shows up through a colloid","Brownian motion, electrophoresis and salting out"] }
  ],
  example:{ q:"What is the freezing point depression of 0.10 mol/kg NaCl(aq)? (K_f = 1.85 K·kg/mol)",
    steps:["NaCl → Na⁺ + Cl⁻: 0.20 mol/kg of particles.","Δt = 1.85 × 0.20.","Δt = 0.37 K."] },
  traps:["Forgetting to multiply by the number of ions.","Using °C in PV = nRT."],
  tip:"Check the units of R in the question. The EJU usually gives Pa·L.",
  checks:[
    { q:"1.0 mol of ideal gas is in 24.9 L at 300 K. What is its pressure? (R = 8.31 × 10³ Pa·L/(K·mol))", c:["1.0 × 10⁵ Pa","2.0 × 10⁵ Pa","1.0 × 10⁴ Pa","3.0 × 10⁵ Pa"], a:0, e:"P = nRT/V = 8.31 × 10³ × 300 / 24.9.", st:["P = nRT/V.","8.31 × 10³ × 300 = 2.49 × 10⁶.","÷ 24.9 = 1.0 × 10⁵ Pa."] },
    { q:"1 mol N₂ and 3 mol H₂ are mixed at a total pressure of 4.0 × 10⁵ Pa. What is the partial pressure of N₂?", c:["1.0 × 10⁵ Pa","3.0 × 10⁵ Pa","4.0 × 10⁵ Pa","2.0 × 10⁵ Pa"], a:0, e:"Mole fraction of N₂ = 1/4.", st:["Total moles = 4.","x(N₂) = 1/4.","1/4 × 4.0 × 10⁵ = 1.0 × 10⁵ Pa."] },
    { q:"All at 0.1 mol/kg, which solution has the lowest freezing point?", c:["CaCl₂","NaCl","Glucose","Urea"], a:0, e:"CaCl₂ gives 3 particles, the most.", st:["Freezing point drop depends on particle count.","CaCl₂ → Ca²⁺ + 2Cl⁻: 3 particles.","Biggest drop, lowest freezing point."] },
    { q:"What is the name for a light beam becoming visible as it passes through a colloid?", c:["Tyndall effect","Brownian motion","Electrophoresis","Osmosis"], a:0, e:"Colloid particles scatter light, so the path shows up.", st:["Colloid particles are big enough to scatter light.","That visible beam is the Tyndall effect."] }
  ] }),
L({ id:"chem-energy", s:"chem", n:"Enthalpy and reaction rates", topics:["Thermochemistry","Reaction rates"],
  goal:"Use enthalpy changes (the 2026 syllabus replaced thermochemical equations with ΔH), Hess's law, bond energies and rate laws.",
  sections:[
    { h:"Enthalpy", list:["ΔH < 0 exothermic, ΔH > 0 endothermic","Written as: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)  ΔH = −891 kJ","ΔH scales with the moles that react"] },
    { h:"Finding ΔH", list:["Hess's law: add and subtract equations like algebra, and their ΔH too","ΔH = Σ ΔfH(products) − Σ ΔfH(reactants)","From bond energies: ΔH = bonds broken − bonds formed"] },
    { h:"Rates", list:["Rate law v = k[A]ᵃ[B]ᵇ, with orders from experiment","Higher concentration, temperature or surface area: faster","A catalyst lowers the activation energy. It doesn't change ΔH or the equilibrium"] }
  ],
  example:{ q:"H₂ + Cl₂ → 2HCl. Bond energies: H–H 436, Cl–Cl 243, H–Cl 432 kJ/mol. Find ΔH.",
    steps:["Bonds broken: 436 + 243 = 679 kJ.","Bonds formed: 2 × 432 = 864 kJ.","ΔH = 679 − 864 = −185 kJ."] },
  traps:["Flipping the sign: bond energies give ΔH = broken − formed.","Thinking a catalyst changes how much heat is released."],
  tip:"In Hess's law questions, line up the target equation first, then pick the given equations to match it.",
  checks:[
    { q:"What does ΔH < 0 mean for a reaction?", c:["It releases heat (exothermic)","It absorbs heat (endothermic)","It can't happen","It is very fast"], a:0, e:"Negative ΔH: the products have less enthalpy, so heat is given out.", st:["ΔH = H(products) − H(reactants).","Negative means energy left the system as heat."] },
    { q:"C + O₂ → CO₂ ΔH = −394 kJ, and CO + ½O₂ → CO₂ ΔH = −283 kJ. Find ΔH for C + ½O₂ → CO.", c:["−111 kJ","−677 kJ","+111 kJ","−283 kJ"], a:0, e:"Subtract the second equation from the first.", st:["Target: C + ½O₂ → CO.","Equation 1 minus equation 2 gives it.","−394 − (−283) = −111 kJ."] },
    { q:"What does a catalyst do?", c:["Lowers the activation energy","Changes ΔH","Shifts the equilibrium to the products","Raises the activation energy"], a:0, e:"It opens a lower-energy path. ΔH and the equilibrium stay the same.", st:["Catalysts provide a different reaction path.","That path has lower activation energy.","Start and end states don't change, so ΔH doesn't either."] },
    { q:"Rate = k[A]²[B]. If [A] doubles and [B] stays the same, the rate:", c:["Quadruples","Doubles","Triples","Stays the same"], a:0, e:"Second order in A: 2² = 4.", st:["Rate ∝ [A]².","(2)² = 4."] }
  ] }),
L({ id:"chem-eq", s:"chem", n:"Chemical equilibrium", topics:["Equilibrium"],
  goal:"Write equilibrium constants, predict shifts with Le Chatelier's principle, and use Ka and the solubility product (new in 2026).",
  sections:[
    { h:"Equilibrium", list:["At equilibrium the forward and reverse rates are equal","For aA + bB ⇌ cC + dD: K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ","K changes only with temperature"] },
    { h:"Le Chatelier", list:["Add a substance: the system uses some up","Raise pressure: shift to the side with fewer gas moles","Raise temperature: shift in the endothermic direction","Catalyst: no shift, just faster to equilibrium"] },
    { h:"Ionic equilibria", list:["Weak acid: Ka = [H⁺][A⁻]/[HA], and [H⁺] ≈ √(cKa)","Buffers (weak acid + its salt) resist pH change","Solubility product: Ksp = [Ag⁺][Cl⁻] for AgCl. A precipitate forms when the ion product exceeds Ksp"] }
  ],
  example:{ q:"N₂ + 3H₂ ⇌ 2NH₃, ΔH < 0. Which conditions favour more NH₃?",
    steps:["4 gas moles on the left, 2 on the right: high pressure shifts right.","Forward is exothermic, so low temperature shifts right.","High pressure and low temperature favour NH₃ (industry uses a catalyst to keep it fast)."] },
  traps:["Thinking a catalyst moves the equilibrium.","Putting solids or water into K."],
  tip:"Write which side has fewer gas moles and which direction is exothermic before reading the options.",
  checks:[
    { q:"2SO₂ + O₂ ⇌ 2SO₃ has ΔH < 0. If the temperature is raised, the equilibrium shifts:", c:["Left, toward SO₂ and O₂","Right, toward SO₃","Not at all","Left then right"], a:0, e:"Heating favours the endothermic direction, the reverse reaction.", st:["Forward is exothermic.","Higher temperature favours the endothermic (reverse) direction.","Shift left."] },
    { q:"A catalyst is added to a mixture at equilibrium. What happens?", c:["Nothing shifts; equilibrium is just reached faster","It shifts right","It shifts left","K increases"], a:0, e:"A catalyst speeds up both directions equally.", st:["Catalysts lower the barrier for forward and reverse.","Both rates rise together.","No shift."] },
    { q:"Ksp of AgCl is 1.8 × 10⁻¹⁰. What is its solubility in pure water, roughly?", c:["1.3 × 10⁻⁵ mol/L","1.8 × 10⁻¹⁰ mol/L","9.0 × 10⁻¹¹ mol/L","1.3 × 10⁻¹⁰ mol/L"], a:0, e:"[Ag⁺] = [Cl⁻] = s, so s² = Ksp.", st:["AgCl ⇌ Ag⁺ + Cl⁻, each at concentration s.","s² = 1.8 × 10⁻¹⁰.","s ≈ 1.3 × 10⁻⁵ mol/L."] },
    { q:"For H₂ + I₂ ⇌ 2HI (all gases), what does raising the total pressure do?", c:["No shift","Shifts right","Shifts left","Changes K"], a:0, e:"Both sides have 2 moles of gas.", st:["Left: 1 + 1 = 2 mol gas. Right: 2 mol.","Equal, so pressure doesn't favour either side."] }
  ] }),
L({ id:"chem-acid", s:"chem", n:"Acids, bases and neutralization", topics:["Acids and bases","Neutralization"],
  goal:"Calculate pH, do titration calculations and predict whether a salt solution is acidic or basic.",
  sections:[
    { h:"Definitions", list:["Arrhenius: acids give H⁺, bases give OH⁻","Brønsted: acids donate H⁺, bases accept it","Strong acids: HCl, HNO₃, H₂SO₄. Strong bases: NaOH, KOH, Ca(OH)₂, Ba(OH)₂"] },
    { h:"pH", list:["pH = −log₁₀[H⁺]","[H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C, so pH + pOH = 14","Ten times more dilute: a strong acid's pH goes up by 1 (never above 7)"] },
    { h:"Neutralization", list:["Moles of H⁺ = moles of OH⁻: a × c × V (acid) = b × c' × V' (base), where a and b are the valences","Phenolphthalein for weak acid + strong base, methyl orange for strong acid + weak base","Salts: CH₃COONa is basic, NH₄Cl is acidic, NaCl is neutral"] }
  ],
  example:{ q:"10 mL of 0.10 mol/L H₂SO₄ is neutralized by 0.10 mol/L NaOH. What volume of NaOH is needed?",
    steps:["H₂SO₄ is diprotic: 2 × 0.10 × 10 = 2.0.","NaOH: 1 × 0.10 × V.","V = 20 mL."] },
  traps:["Forgetting H₂SO₄ gives 2 H⁺.","Diluting an acid to above pH 7."],
  tip:"Write the valence next to every acid and base before the titration calculation.",
  checks:[
    { q:"What is the pH of 0.001 mol/L HCl?", c:["3","1","11","0.001"], a:0, e:"[H⁺] = 10⁻³, so pH = 3.", st:["HCl is strong: [H⁺] = 1 × 10⁻³.","pH = −log 10⁻³ = 3."] },
    { q:"What is the pH of 0.01 mol/L NaOH at 25 °C?", c:["12","2","10","13"], a:0, e:"[OH⁻] = 10⁻², pOH = 2, pH = 14 − 2.", st:["[OH⁻] = 1 × 10⁻².","pOH = 2.","pH = 14 − 2 = 12."] },
    { q:"An aqueous solution of CH₃COONa is:", c:["Basic","Acidic","Neutral","Can't tell"], a:0, e:"It's the salt of a weak acid and a strong base. CH₃COO⁻ takes H⁺ from water, leaving OH⁻.", st:["Weak acid (acetic) + strong base (NaOH).","CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻.","Extra OH⁻: basic."] },
    { q:"Which indicator suits titrating acetic acid with NaOH?", c:["Phenolphthalein","Methyl orange","Either works equally","Neither"], a:0, e:"The end point is basic (about pH 8 to 10), which matches phenolphthalein.", st:["Weak acid + strong base: the salt solution at the end point is basic.","Phenolphthalein changes colour in that basic range."] }
  ] }),
L({ id:"chem-redox", s:"chem", n:"Redox, batteries and electrolysis", topics:["Redox","Electrochemistry"],
  goal:"Assign oxidation numbers, use the ionization tendency series, and calculate with cells and electrolysis.",
  sections:[
    { h:"Oxidation and reduction", list:["Oxidation: lose electrons, oxidation number goes up. Reduction: the reverse","Rules: elements 0, H usually +1, O usually −2 (−1 in H₂O₂), the total equals the charge","Oxidizing agents (KMnO₄, Cr₂O₇²⁻, H₂O₂, Cl₂) get reduced themselves"] },
    { h:"Ionization tendency", list:["K Ca Na Mg Al Zn Fe Ni Sn Pb (H₂) Cu Hg Ag Pt Au","A metal pushes out the ions of any metal to its right: Zn in Cu²⁺ gives copper metal","Metals left of H₂ react with dilute acids to give H₂"] },
    { h:"Batteries", list:["The negative electrode is where oxidation happens","Daniell cell: zinc negative, copper positive","Lead storage battery and fuel cells (H₂ + O₂ → H₂O) appear often"] },
    { h:"Electrolysis", list:["Cathode (connected to −): reduction. Anode (+): oxidation","Charge Q = It. Faraday constant F = 9.65 × 10⁴ C per mol of electrons","Moles of product = moles of electrons ÷ electrons per particle"] }
  ],
  example:{ q:"9650 C passes through CuSO₄(aq). What mass of copper forms? (Cu = 63.5)",
    steps:["Electrons: 9650 / 96 500 = 0.100 mol.","Cu²⁺ + 2e⁻ → Cu, so 0.0500 mol Cu.","0.0500 × 63.5 ≈ 3.2 g."] },
  traps:["Mixing up anode and cathode between batteries and electrolysis.","Forgetting that Cu²⁺ needs 2 electrons per atom."],
  tip:"Write the half-equation with electrons for every electrolysis question. The ratio does the rest.",
  checks:[
    { q:"What is the oxidation number of Mn in KMnO₄?", c:["+7","+4","+2","+6"], a:0, e:"K is +1, four O are −8, total 0: Mn = +7.", st:["K = +1, O = −2 each.","+1 + Mn + 4(−2) = 0.","Mn = +7."] },
    { q:"A zinc plate is placed in CuSO₄ solution. What happens?", c:["Copper forms on the zinc","Zinc forms on the copper","Nothing happens","Hydrogen gas forms"], a:0, e:"Zn is more reactive than Cu, so it gives electrons to Cu²⁺.", st:["Zn is left of Cu in the ionization series.","Zn → Zn²⁺ + 2e⁻ and Cu²⁺ + 2e⁻ → Cu.","Copper deposits on the zinc."] },
    { q:"In a Daniell cell, which electrode is negative?", c:["Zinc","Copper","Both","Neither"], a:0, e:"Zinc is oxidized and sends electrons out.", st:["Zn is more reactive and gets oxidized.","Electrons leave from zinc.","Zinc is the negative electrode."] },
    { q:"How much charge deposits 1 mol of silver (Ag⁺ + e⁻ → Ag)?", c:["9.65 × 10⁴ C","1.93 × 10⁵ C","4.83 × 10⁴ C","96.5 C"], a:0, e:"1 mol Ag needs 1 mol electrons = 1 Faraday.", st:["One electron per Ag⁺.","1 mol electrons = 9.65 × 10⁴ C."] }
  ] }),
L({ id:"chem-inorg", s:"chem", n:"Inorganic chemistry and metals", topics:["Metals"],
  goal:"Know the key reactions, flame colours, industrial processes and transition metal ions.",
  sections:[
    { h:"Non-metals", list:["Halogen oxidizing power: F₂ > Cl₂ > Br₂ > I₂","Ammonia: Haber-Bosch (N₂ + 3H₂). Nitric acid: Ostwald process. Sulfuric acid: contact process","O₂ in the lab: H₂O₂ with MnO₂ as a catalyst"] },
    { h:"Typical metals", list:["Alkali metals react with water to give H₂ and a strong base","Flame colours: Li red, Na yellow, K violet, Ca orange-red, Sr crimson, Ba yellow-green, Cu blue-green","Amphoteric metals (Al, Zn, Sn, Pb) dissolve in both acids and strong bases"] },
    { h:"Transition metals (groups 3 to 12)", list:["Coloured ions: Cu²⁺ blue, Fe²⁺ pale green, Fe³⁺ yellow-brown","Excess ammonia with Cu²⁺ gives deep blue [Cu(NH₃)₄]²⁺","Iron: blast furnace reduction with CO. Aluminium: molten salt electrolysis of alumina. Copper: electrolytic refining"] }
  ],
  example:{ q:"A solution gives a blue precipitate with a little NH₃, which dissolves in excess NH₃ to give a deep blue solution. Which ion is it?",
    steps:["A little NH₃ makes OH⁻, which precipitates Cu(OH)₂ (blue).","Excess NH₃ forms the complex [Cu(NH₃)₄]²⁺ (deep blue).","The ion is Cu²⁺."] },
  traps:["Mixing up Na (yellow) and Ba (yellow-green) flames.","Forgetting that Al can't be made by reducing its oxide with carbon."],
  tip:"Make your own flashcards of colours and tests. These are free marks once memorised.",
  checks:[
    { q:"What colour is a sodium flame?", c:["Yellow","Violet","Crimson","Blue-green"], a:0, e:"Na gives a strong yellow flame.", st:["Li red, Na yellow, K violet, Cu blue-green.","Sodium: yellow."] },
    { q:"Which metal dissolves in both hydrochloric acid and sodium hydroxide solution?", c:["Al","Fe","Cu","Mg"], a:0, e:"Al is amphoteric.", st:["Amphoteric metals: Al, Zn, Sn, Pb.","Of the options, only Al."] },
    { q:"Which ion gives a deep blue solution with excess ammonia?", c:["Cu²⁺","Fe³⁺","Zn²⁺","Ag⁺"], a:0, e:"It forms [Cu(NH₃)₄]²⁺.", st:["Zn²⁺ and Ag⁺ form colourless ammine complexes.","Cu²⁺ forms the deep blue [Cu(NH₃)₄]²⁺."] },
    { q:"Ammonia is made industrially by:", c:["The Haber-Bosch process","The Ostwald process","The contact process","Electrolysis of brine"], a:0, e:"N₂ + 3H₂ ⇌ 2NH₃ over an iron catalyst.", st:["Haber-Bosch: ammonia.","Ostwald: nitric acid. Contact: sulfuric acid."] },
    { q:"Which halogen is the strongest oxidizing agent?", c:["F₂","Cl₂","Br₂","I₂"], a:0, e:"Oxidizing power falls down the group.", st:["F₂ > Cl₂ > Br₂ > I₂."] },
    { q:"How is aluminium produced industrially?", c:["Molten salt electrolysis of alumina","Reducing alumina with carbon in a blast furnace","Electrolysis of aqueous AlCl₃","Heating bauxite in air"], a:0, e:"Al is too reactive to reduce with carbon, and in water H₂ forms instead.", st:["Al is high in the ionization series.","Carbon can't reduce it, and aqueous electrolysis gives H₂.","So alumina is electrolysed as a molten salt."] }
  ] }),
L({ id:"chem-org", s:"chem", n:"Organic chemistry and polymers", topics:["Organic chemistry"],
  goal:"Name families of organic compounds, find isomers, recognise functional groups and their tests, and know the main polymers.",
  sections:[
    { h:"Hydrocarbons", list:["Alkanes CₙH₂ₙ₊₂ (substitution), alkenes CₙH₂ₙ (addition), alkynes CₙH₂ₙ₋₂","Benzene undergoes substitution, not addition"] },
    { h:"Isomers", list:["Structural isomers: same formula, different connections (C₄H₁₀ has 2, C₅H₁₂ has 3)","Cis-trans isomers (a 2026 term): different groups on each C of a C=C bond","Optical isomers: a carbon with four different groups"] },
    { h:"Functional groups", list:["–OH alcohol. Ethanol → acetaldehyde → acetic acid by oxidation","–CHO formyl group (aldehyde): silver mirror and Fehling's tests","–COOH carboxylic acid. Acid + alcohol → ester + water","Phenol gives a purple colour with FeCl₃"] },
    { h:"Polymers", list:["Addition polymers: polyethylene, PVC, polystyrene","Condensation polymers: nylon 6,6 and PET lose water as they form","Natural: starch and cellulose (glucose), proteins (amino acids joined by peptide bonds)"] }
  ],
  example:{ q:"How many structural isomers does C₄H₁₀ have?",
    steps:["Straight chain: butane.","One branch: 2-methylpropane.","2 isomers."] },
  traps:["Counting the same chain drawn differently as a new isomer.","Calling a ketone an aldehyde: only –CHO gives the silver mirror."],
  tip:"Draw every isomer with the longest chain written straight. Duplicates jump out.",
  checks:[
    { q:"How many structural isomers does C₅H₁₂ have?", c:["3","2","4","5"], a:0, e:"Pentane, 2-methylbutane and 2,2-dimethylpropane.", st:["Five in a row: pentane.","Four in a row with one branch: 2-methylbutane.","Three in a row with two branches: 2,2-dimethylpropane."] },
    { q:"Which compound gives a silver mirror with ammoniacal silver nitrate?", c:["Acetaldehyde","Acetone","Ethanol","Acetic acid"], a:0, e:"It has a formyl group (–CHO), which reduces Ag⁺.", st:["The silver mirror test detects –CHO.","Acetaldehyde CH₃CHO has it; acetone (a ketone) doesn't."] },
    { q:"2-butene (CH₃CH=CHCH₃) shows which kind of isomerism?", c:["Cis-trans","Optical","None","Chain only"], a:0, e:"Each carbon of the C=C carries an H and a CH₃.", st:["Look at the C=C: each carbon has two different groups.","That allows cis and trans forms."] },
    { q:"Nylon 6,6 is formed by:", c:["Condensation polymerization","Addition polymerization","Fermentation","Cracking"], a:0, e:"A diamine and a dicarboxylic acid join and give off water.", st:["Monomers: hexamethylenediamine and adipic acid.","Each link releases a water molecule.","That's condensation."] },
    { q:"Ethanol is gently oxidized. What forms first?", c:["Acetaldehyde","Acetic acid","Ethylene","Diethyl ether"], a:0, e:"Primary alcohol → aldehyde → carboxylic acid.", st:["Ethanol is a primary alcohol.","First oxidation gives the aldehyde, CH₃CHO.","Further oxidation would give acetic acid."] }
  ] })
];
/* Give check questions ids and subjects, and add them to the bank so they appear in the Glitch log and Corp exam too. */
EJU.lessons.forEach(l => l.checks.forEach((q, i) => {
  q.id = l.id + "-c" + (i + 1); q.s = l.s; q.t = l.topics[0];
  EJU.questions.push(q);
}));
EJU.lessonPool = (l) => {
  const own = l.checks.map(c => c.id);
  return EJU.questions.filter(q => q.s === l.s && (own.includes(q.id) || (l.topics.includes(q.t) && !q.id.includes("-c"))));
};

/* ================= Checklist ================= */
EJU.checklist = [
  { id:"exam", h:"EJU exam (June 2027)", items:[
    ["exam-online", "Make an EJU Online account on the JASSO site"],
    ["exam-subjects", "Decide the language: English or Japanese for both subjects (it can't be changed after applying)"],
    ["exam-apply", "Apply for the June 2027 EJU between 15 February and 11 March 2027, 5 pm Japan time: Mathematics Course 2 + Science"],
    ["exam-pay", "Pay the ¥25,000 fee for two subjects"],
    ["exam-scholar", "Tick the Honors Scholarship reservation box when applying"],
    ["exam-voucher", "Get the exam voucher (around 21 May 2027) and check the venue"],
    ["exam-kit", "Pack for 20 June 2027: voucher, ID, HB pencils, eraser, analogue watch"],
    ["exam-sci", "On the day, choose Physics and Chemistry on the science sheet"],
    ["exam-results", "Check results on EJU Online (late July 2027) and save a screenshot"],
    ["exam-nov", "Optional: apply for the November 2027 EJU (12 July to 5 August 2027) to improve"]
  ]},
  { id:"eng", h:"English test", items:[
    ["eng-pick", "Choose TOEFL iBT or IELTS Academic (not the home editions for Aizu)"],
    ["eng-book", "Book a test date at least 3 months before the first application"],
    ["eng-score", "Reach IELTS 6.0 or TOEFL iBT 80: that clears Aizu (IELTS 5.5) and most programs on the Universities tab"]
  ]},
  { id:"aizu", h:"University of Aizu: ICT Global", items:[
    ["aizu-guide", "Download the newest ICT Global application guide (published each summer)"],
    ["aizu-score", "EJU Math Course 2 and one science both above that year's average"],
    ["aizu-docs", "Collect high school transcript, diploma and English test report"],
    ["aizu-rec", "Ask a teacher for the recommendation letter (Form 2)"],
    ["aizu-pdf", "Email the PDFs in the window (15 February to 5 March in the 2027 round)"],
    ["aizu-post", "Post the originals so they arrive by the deadline (19 March in the 2027 round)"],
    ["aizu-result", "Check the result (mid May) and finish enrollment by mid June"]
  ]},
  { id:"kyushu", h:"Kyushu University: IUP Electrical Engineering and Computer Science", items:[
    ["ky-guide", "Download the newest Application Instructions (published each July)"],
    ["ky-score", "EJU Math Course 2 and Physics both above average"],
    ["ky-docs", "Prepare transcripts, recommendation letters and essay early (September to November)"],
    ["ky-online", "Apply online in early December and pay the fee"],
    ["ky-post", "Mail documents by registered post to arrive by mid December"],
    ["ky-first", "Check the first screening result (mid February)"],
    ["ky-interview", "Prepare for the interview (late February to early March)"],
    ["ky-result", "Admission decision (late March) and enrollment by the deadline"]
  ]},
  { id:"practice", h:"Practice", items:[
    ["pr-paper1", "One full JASSO Math Course 2 past paper, timed at 80 minutes"],
    ["pr-paper2", "One full JASSO Science past paper (Physics + Chemistry), timed at 80 minutes"],
    ["pr-paper3", "Three more past papers in each subject"],
    ["pr-boss", "Score 70% or more on the Corp exam"],
    ["pr-glitch", "Empty the Glitch log"],
    ["pr-mock", "One ASK mock test in each subject"]
  ]}
];

/* ================= Universities =================
   English-taught undergraduate programs that take EJU Mathematics Course 2 plus physics and/or chemistry,
   with no Japanese test. Facts from each university's 2027 application guide (checked November 2026). */
EJU.universities = [
  { id:"aizu", target:true, name:"University of Aizu", jp:"会津大学", type:"Public (Fukushima Prefecture)",
    program:"ICT Global All-English Program, Computer Science and Engineering",
    city:"Aizuwakamatsu, Fukushima", campus:"One compact campus. Every class, lab and dorm is in the same place, a short walk from Aizuwakamatsu town.",
    eju:"Mathematics Course 2 and at least one of physics, chemistry or biology. Both must be at or above that year's average score.",
    english:"TOEFL iBT 72+ (band 4+ on the 2026 scale), TOEIC L&R 785+, EIKEN Pre-1 or IELTS 5.5+. Home editions aren't accepted.",
    select:"Documents only. They may email questions or hold an online interview.",
    apply:"2027 round: PDFs by email 15 February to 5 March 2027, originals by 19 March. Result 14 May.", start:"October",
    fees:"Tuition ¥520,800 a year. Payment on admission ¥655,680 in total (admission fee ¥564,000 plus insurance and other costs).",
    living:"About ¥60,000 to ¥100,000 a month. Aizuwakamatsu is much cheaper than a big city.",
    why:["Japan's first university entirely for computer science and engineering, and the first all-English CSE degree in Japan.","Most classes have about 20 students, and about one in ten students per teacher, with many international professors.","Every international student gets a Japanese 'buddy' student, plus Japanese language and culture classes.","Strong in embedded systems, networks, graphics, AI and robotics, with internships and startup courses."],
    fit:"His requirement is the lightest here: one science above average is enough, so a strong Math Course 2 plus Physics more than covers it. Taking the EJU in June 2027 lines him up for the round that opens in early 2028 (October 2028 start).",
    url:"https://u-aizu.ac.jp/en/materials/", guide:"https://u-aizu.ac.jp/files/page/admissions/2027ICTG.general.e.pdf" },
  { id:"kyushu", target:true, name:"Kyushu University", jp:"九州大学", type:"National",
    program:"International Undergraduate Program (IUPE): Electrical Engineering and Computer Science",
    city:"Fukuoka", campus:"Engineering is all on Ito Campus, one of the largest single campuses in Japan, west of central Fukuoka by bus or train.",
    eju:"Mathematics Course 2 and Physics, both above the average score. Scores from June 2025 or later were accepted for 2027 entry; a November session score counts if he sends the exam voucher copy.",
    english:"Proof of English is part of the application. Check the current Application Instructions for the minimum.",
    select:"Document screening, then an interview for those who pass.",
    apply:"2027 round: online 7 to 11 December 2026, documents by 17 December. First result 15 February, interview late February to early March, decision 23 March.", start:"October",
    fees:"Admission fee ¥282,000. Tuition ¥535,800 a year (2026 figures).",
    why:["A top-tier research university (one of Japan's former imperial universities) and the first of them to start an English undergraduate program, in 2010.","EECS covers circuits, communication, computer systems, data structures, control and energy, with classes in English apart from Japanese.","About 80 to 85% of graduates go on to master's degrees at Kyushu, Tokyo, Kyoto, Oxford, UCL, TU Munich and others.","Competitive: 248 applied for the engineering IUPs in 2025 and 24 were admitted."],
    fit:"His EJU must clear the average in both Math Course 2 and Physics, so physics matters most here. With a June 2027 score he'd apply in December 2027 for October 2028.",
    url:"https://www.eng.kyushu-u.ac.jp/en/undergraduate/undergraduate-international-programs", guide:"https://www.kyushu-u.ac.jp/f/66827/ENG_2027_Application%20Instruction.pdf",
    note:"Kyushu's IUP Applied Chemistry asks for Math Course 2 and Chemistry instead (120 and 60 minimum for 2027)." },
  { id:"tohoku", name:"Tohoku University", jp:"東北大学", type:"National",
    program:"Gateway College, STEM track (fall entry, all in English)",
    city:"Sendai, Miyagi", campus:"Sendai. The main campuses (Kawauchi and Aobayama, where engineering is) are close together on the same subway line.",
    eju:"Mathematics Course 2 plus two of physics, chemistry and biology (physics and chemistry fit him), taken in English. Math plus science must total 300 or more. Only one test type can be submitted.",
    english:"IELTS 6.0+, TOEFL iBT 80+, Duolingo 110+, Cambridge 169+ or EIKEN 2,400+.",
    select:"Documents, then an online written exam and interview, all in English.",
    apply:"2027 round: 15 December 2026 to 14 January 2027. Interview 21 to 22 February, result 24 March.", start:"October",
    fees:"Admission fee ¥282,000. Tuition for students on a student visa ¥900,000 a year. Full or half tuition scholarships go to about the top third of admitted students.",
    living:"About ¥133,000 a month (university estimate).",
    why:["Ranked first in Japan by Times Higher Education 2020 to 2025, and Japan's first University for International Research Excellence.","He picks a major in year 3, with Electrical, Information and Physics Engineering among the options.","Broad first two years, so he can try computer science and engineering before committing."],
    fit:"It wants exactly his subjects. The 300 total is demanding: about 150 math plus 150 science out of 400. Treat it as a reach school for the next round.",
    url:"https://admissions.tohoku.ac.jp/en/admissions/undergraduate/gateway_college", guide:"https://admissions.tohoku.ac.jp/en/adcms/wp-content/uploads/2026/07/GWC_Fall_20260722.pdf" },
  { id:"nagoya", name:"Nagoya University", jp:"名古屋大学", type:"National",
    program:"Global 30 Automotive Engineering: Electrical, Electronic and Information Engineering course",
    city:"Nagoya, Aichi", campus:"Higashiyama Campus, the main campus in eastern Nagoya, with its own subway station.",
    eju:"Not required, but strongly recommended. Math Course 2 with physics and chemistry are the subjects that match the program.",
    english:"TOEFL iBT 80, IELTS 6.0 or Duolingo 110 (2026 to 2027 guidance).",
    select:"Documents, then an interview.",
    apply:"2027 rounds: 2 to 19 November 2026 and 5 to 21 January 2027.", start:"October",
    fees:"Admission fee ¥282,000. Tuition ¥535,800 a year. A G30 scholarship covers full tuition for 4 years plus ¥500,000 for some students.",
    why:["The only English-taught automotive engineering degree in Japan, taught with engineers from Japan's leading car makers in the heart of the Aichi car industry.","The Electrical, Electronic and Information Engineering course is the electrical and computing side of it: circuits, electronics, information engineering and car technology.","Two application rounds give him a second chance in January."],
    fit:"Closest match to Kyushu's EECS. Because EJU is optional, a strong EJU is an advantage on top of his transcript.",
    url:"https://admissions.g30.nagoya-u.ac.jp/undergraduate/automotive_eeie", guide:"https://admissions.g30.nagoya-u.ac.jp/upload/2027_admission_requirements_en.pdf" },
  { id:"hokkaido", name:"Hokkaido University", jp:"北海道大学", type:"National",
    program:"Integrated Science Program (ISP), physics-oriented selection",
    city:"Sapporo, Hokkaido", campus:"Sapporo Campus: one huge green campus in the middle of the city, a walk from Sapporo Station.",
    eju:"Math Course 2 and science scores are submitted if he has taken them. The interview tests physics, chemistry and math.",
    english:"TOEFL iBT 79+, IELTS 6.0+ or Duolingo 110+.",
    select:"Documents, then an online interview focused on his chosen science.",
    apply:"2027 round: online registration 12 to 20 November 2026, recommendation letter by 4 December. Interview 16 February to 2 March, result 23 March.", start:"October",
    fees:"Check the current guide. National universities usually charge ¥282,000 admission and ¥535,800 a year.",
    why:["A big national research university with a famous campus.","Students choose physics, chemistry or biology after six months.","Good if he leans toward physics more than computing."],
    fit:"Not an engineering degree, so it's a backup if he wants physics. His EJU subjects match the interview topics.",
    url:"https://www.oia.hokudai.ac.jp/isp/prospective-students/how-to-apply", guide:"https://www.oia.hokudai.ac.jp/isp/wp-content/uploads/2026/05/R9-ISP-Basic-Admission-Policy-for-Oct.-2027.pdf" },
  { id:"sciencetokyo", name:"Institute of Science Tokyo (formerly Tokyo Tech)", jp:"東京科学大学", type:"National",
    program:"Global Scientists and Engineers Program (GSEP), Transdisciplinary Science and Engineering",
    city:"Tokyo", campus:"Ookayama Campus in Meguro, Tokyo.",
    eju:"Mathematics Course 2, Physics and Chemistry scores are considered at the second screening.",
    english:"See the application guide.",
    select:"Documents, then a second screening (online in 2026).",
    apply:"2027 round: 12 to 21 August 2026. The selection process changes from the 2028 intake.", start:"April",
    fees:"See the current guide. 8 places come with a full MEXT scholarship and 10 are privately funded.",
    why:["One of Japan's top science and engineering universities.","A transdisciplinary engineering degree taught fully in English, with project-based courses."],
    fit:"Very small intake and an August deadline, so plan a year ahead. The EJU subjects match his exactly.",
    url:"https://admissions.isct.ac.jp/en/013/undergraduate/programs/gsep", guide:"https://www.tse.ens.titech.ac.jp/~gsep/wp-content/uploads/2026/07/gsep2027-applicationguide.pdf" }
];
})();
