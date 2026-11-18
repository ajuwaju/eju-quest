/* Story layer: an original crew, city and progression. Nothing here is taken from any existing show or game. */
window.EJU = window.EJU || {};

EJU.crew = {
  rook:  { name:"Rook", role:"Handler", color:"acid", hair:"crop", visor:false, scar:true,
           bio:"Runs the crew out of a noodle stall under the rail line. Has seen a hundred runners try the Gate. Wants you to be the one who walks through it." },
  sable: { name:"Sable Ito", role:"Net diver", color:"pink", hair:"bob", visor:true, scar:false,
           bio:"Hears language the way other people hear music. Says Japanese grammar is just code with feelings. Owns Kotoba Market." },
  gear:  { name:"Gear Vale", role:"Techie", color:"cyan", hair:"mohawk", visor:false, scar:false,
           bio:"Builds drones out of scrap and solves equations for fun. If it can be calculated, Gear has already calculated it twice." },
  nyx:   { name:"Nyx Adeyemi", role:"Street doc", color:"mint", hair:"long", visor:true, scar:false,
           bio:"Patches up runners in a clinic above Reactor Row. Knows exactly how bodies, atoms and voltage work, and will quiz you on all three." }
};

/* Districts map onto exam subjects. */
EJU.districts = [
  { id:"jp",   name:"Kotoba Market", jp:"言葉市場", crew:"sable", subject:"jp",
    blurb:"Neon stalls trading in words. Crack grammar, vocabulary and reading to take the market." },
  { id:"m1",   name:"Grid Row", jp:"格子通り", crew:"gear", subject:"m1",
    blurb:"Rows of server stacks humming with Math Course 1: quadratics, trig, counting and probability." },
  { id:"m2",   name:"Calculus Spire", jp:"微積塔", crew:"gear", subject:"m2",
    blurb:"The tallest tower in the sprawl. Course 2 lives up here: limits, derivatives, integrals, vectors." },
  { id:"phy",  name:"Reactor Row", jp:"炉心街", crew:"nyx", subject:"phy",
    blurb:"Steam, current and motion. Mechanics, waves, electricity and heat keep the lights on." },
  { id:"chem", name:"Synth Labs", jp:"合成研", crew:"nyx", subject:"chem",
    blurb:"Back-alley labs where moles, bonds and equilibrium decide what gets made tonight." },
  { id:"bio",  name:"Gene Docks", jp:"遺伝子埠頭", crew:"nyx", subject:"bio",
    blurb:"Shipping containers full of cells, DNA and ecosystems. Know the code of life." },
  { id:"jw",   name:"Old Archive", jp:"旧記録庫", crew:"rook", subject:"jw",
    blurb:"The last library in the city. Politics, economics, history and geography, guarded by Rook." }
];

/* Story chapters unlock by level. {exam} is replaced with the chosen exam date. */
EJU.chapters = [
  { lvl:1, from:"rook", title:"Jack in",
    text:"Kid. Every year the Gate opens for one day, {exam}, and the corps let a few outsiders through to the universities on the other side. The test at the Gate is called the EJU. Most runners walk up unprepared and bounce off. Not my runners. You run missions, you get sharp, you get through. Start in any district. The crew will meet you there." },
  { lvl:2, from:"sable", title:"Encrypted packet",
    text:"Pulled something off the wire with your name on it. It's encrypted with a key only you have. Check your inbox, runner. Somebody out there believes in you." , gift:true },
  { lvl:3, from:"gear", title:"Simulation online",
    text:"I wired up a full mock of the Gate test. Corp Exam mode is live. Twenty questions, a clock, no armor. It's going to hurt the first time. That's the point." },
  { lvl:5, from:"nyx", title:"Field medicine",
    text:"Five levels in and your vitals look good. Real talk though: sleep is part of training. The brain files what you learned while you're out. Run hard, then rest." },
  { lvl:8, from:"sable", title:"Fluent in the noise",
    text:"You read signals faster than half the runners I know. Keep doing the intercepts. The listening section at the Gate is where most of them crack." },
  { lvl:12, from:"gear", title:"Overclocked",
    text:"Your numbers are climbing. Do the official past papers on the JASSO site now, timed, like it's the real thing. I put the link in Intel." },
  { lvl:16, from:"rook", title:"Legend in the making",
    text:"People in the market are saying your callsign now. That doesn't happen by accident. It happens one mission at a time. Keep your uptime alive." },
  { lvl:20, from:"rook", title:"The Gate",
    text:"You're ready, kid. I've watched a hundred runners and I know what ready looks like. Walk up to that Gate like you own it. Then send me a postcard from the other side." }
];

EJU.levelTitles = [
  [1,"Street kid"],[3,"Runner"],[5,"Merc"],[8,"Net diver"],[12,"Edge runner"],[16,"Ghost"],[20,"Gatebreaker"]
];

/* Shop: cyberware changes play, skins change the HUD colour. Prices in creds. */
EJU.cyberware = [
  { id:"cache",  name:"Neural cache", price:150, consumable:true, max:2,
    desc:"Saves your uptime if you miss a day. Holds up to two." },
  { id:"optic",  name:"Scanner optic", price:400,
    desc:"Once per mission, scan a question to strike out two wrong answers." },
  { id:"armor",  name:"Subdermal plating", price:700,
    desc:"Missions start with 4 integrity instead of 3." },
  { id:"reflex", name:"Reflex booster", price:900,
    desc:"Corp Exam clock runs 25% longer." },
  { id:"siphon", name:"Cred siphon", price:1200,
    desc:"Earn 25% more creds from every source." }
];

EJU.skins = [
  { id:"acid",   name:"Acid",    price:0,   desc:"Default. Yellow on night." },
  { id:"ice",    name:"Ice",     price:250, desc:"Cold cyan HUD." },
  { id:"ronin",  name:"Ronin",   price:400, desc:"Red signal, steel ground." },
  { id:"jade",   name:"Jade",    price:400, desc:"Green phosphor." },
  { id:"chrome", name:"Chrome",  price:800, desc:"White hot. For people who have made it." }
];

/* Achievements, shown as data chips. */
EJU.badges = [
  { id:"first",   name:"First run",        desc:"Finish your first mission." },
  { id:"clean",   name:"Clean run",        desc:"Finish a mission without losing integrity." },
  { id:"combo5",  name:"Chain five",       desc:"Answer 5 in a row correctly." },
  { id:"combo10", name:"Chain ten",        desc:"Answer 10 in a row correctly." },
  { id:"up3",     name:"Uptime 3",         desc:"Hit your daily goal 3 days running." },
  { id:"up7",     name:"Uptime 7",         desc:"A full week of daily goals." },
  { id:"up30",    name:"Uptime 30",        desc:"Thirty days. Legendary discipline." },
  { id:"lvl5",    name:"Level 5",          desc:"Reach level 5." },
  { id:"lvl10",   name:"Level 10",         desc:"Reach level 10." },
  { id:"lvl20",   name:"Level 20",         desc:"Reach level 20." },
  { id:"shards100", name:"Shard hoarder",  desc:"Review 100 flashcards." },
  { id:"shards500", name:"Shard archivist", desc:"Review 500 flashcards." },
  { id:"intercept", name:"Signal clear",   desc:"Get every listening intercept right at least once." },
  { id:"boss",    name:"Corp breaker",     desc:"Score 70% or more on a Corp Exam." },
  { id:"district", name:"District boss",   desc:"Take 100% control of any district." },
  { id:"allcity", name:"Own the city",     desc:"Reach 60% control in every district on your track." },
  { id:"night",   name:"Night shift",      desc:"Finish a mission after 11 pm." },
  { id:"dawn",    name:"Dawn patrol",      desc:"Finish a mission before 7 am." },
  { id:"shopper", name:"Chromed up",       desc:"Install your first cyberware." },
  { id:"gift",    name:"Decrypted",        desc:"Open the encrypted packet." }
];
