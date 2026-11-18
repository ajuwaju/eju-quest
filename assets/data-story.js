/* Story layer: an original crew, city and progression. Nothing here is taken from any existing show or game. */
window.EJU = window.EJU || {};

EJU.crew = {
  dhruv: { name:"Dhruv", role:"Runner", lead:true, img:"dhruv", color:"acid",
           bio:"That's you. 22, a yellow jacket and a plan: get through the Gate in 2027 and study in Japan. Every mission you run here is a step toward it." },
  allanah: { name:"Allanah", role:"Net diver, your partner", lead:true, img:"allanah", color:"pink",
           bio:"Infiltrator, net diver and the one who built this whole city for you. She's on comms for every mission, and she already knows you'll make it." },
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
  { lvl:2, from:"allanah", title:"Encrypted packet",
    text:"I slipped something onto the wire for you. It's locked with a key only you have, so nobody else in this city can read it. Open it when you've got a quiet minute." , gift:true },
  { lvl:3, from:"gear", title:"Simulation online",
    text:"I wired up a full mock of the Gate test. Corp Exam mode is live. Twenty questions, a clock, no armor. It's going to hurt the first time. That's the point." },
  { lvl:4, from:"allanah", title:"On comms",
    text:"I've been watching your runs from the rooftop. You hesitate on the hard ones, then you get them anyway. That's the whole trick. I'm on comms every mission, so if you hear me cheering, that's why." },
  { lvl:5, from:"nyx", title:"Field medicine",
    text:"Five levels in and your vitals look good. Real talk though: sleep is part of training. The brain files what you learned while you're out. Run hard, then rest." },
  { lvl:8, from:"sable", title:"Fluent in the noise",
    text:"You read signals faster than half the runners I know. Keep doing the intercepts. The listening section at the Gate is where most of them crack." },
  { lvl:10, from:"allanah", title:"Double digits",
    text:"Level ten. Do you know how many people quit before this? Lots. You didn't. Take tonight off if you need it, then come back and show me level eleven." },
  { lvl:12, from:"gear", title:"Overclocked",
    text:"Your numbers are climbing. Do the official past papers on the JASSO site now, timed, like it's the real thing. I put the link in Intel." },
  { lvl:16, from:"rook", title:"Legend in the making",
    text:"People in the market are saying your callsign now. That doesn't happen by accident. It happens one mission at a time. Keep your uptime alive." },
  { lvl:18, from:"allanah", title:"Almost there",
    text:"I can see the Gate from up here, and you're closer to it than you think. Whatever happens on exam day, I'm proud of every single run you put in. Now go finish it." },
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

/* Allanah on comms. Mood picks the expression: calm, smile, shout (playfully mad) or shock. */
EJU.allanah = {
  start: [
    ["calm", "I'm watching the feed. Take your time."],
    ["calm", "Read it twice, answer once."],
    ["smile", "Okay, show me what you've got."],
    ["calm", "Eyes on the question. I've got your back."],
    ["smile", "Study date! Except I'm on comms and you're doing all the work."],
    ["calm", "Phone down. Brain on. Let's go."]
  ],
  right: [
    ["smile", "Clean. Knew you would."],
    ["smile", "That's my runner."],
    ["smile", "Easy for you, huh?"],
    ["smile", "Nice. Keep that rhythm."],
    ["smile", "Look at you go."],
    ["smile", "Okay smarty, I see you."],
    ["smile", "See? You DO know this."],
    ["smile", "Japan is getting closer every answer."],
    ["calm", "Correct. Don't let it go to your head."],
    ["smile", "Proud of you. Next."],
    ["smile", "Who's studying for the EJU? You are."],
    ["calm", "Right again. I'm almost impressed."]
  ],
  combo: [
    ["shout", "Combo! Don't stop now!"],
    ["shout", "You're on fire, keep going!"],
    ["shout", "Nobody can stop you like this!"],
    ["shout", "WHO IS THIS GENIUS?"],
    ["smile", "Streaking like this, the Gate doesn't stand a chance."],
    ["shout", "Okay you're scaring me now. Keep it up."]
  ],
  wrong: [
    ["shout", "Excuse me?? Read the explanation. Now."],
    ["shout", "Okay you need to study. Don't you want to stay in Japan??"],
    ["shock", "Babe. No."],
    ["shout", "We literally did this one. Read why."],
    ["shock", "Wrong! It's fine. It's fine. Read the note."],
    ["shout", "Do you want to live in Japan or not? Focus!"],
    ["calm", "Shake it off. That's how you learn it."],
    ["shock", "Hmm. Interesting choice. A wrong one, but interesting."],
    ["shout", "I'm not mad. I'm just... okay I'm a little mad. Read it."],
    ["calm", "Glitch. Happens to everyone. Next one's yours."],
    ["shout", "The EJU won't take 'I forgot' as an answer!"],
    ["shock", "Did you just guess? Be honest."]
  ],
  idk: [
    ["calm", "Honest. I like that. Read the steps, then you'll know it."],
    ["smile", "Good call asking instead of guessing. Open the explanation."],
    ["shout", "You don't know?? Okay, read it twice. This one comes back later."],
    ["calm", "Not knowing is fine. Not learning it is not. Read the steps."],
    ["shock", "Wait, we never covered this? Read it now, quick."]
  ],
  writeLate: [["shout", "Three minutes left! Finish your conclusion and check it."]],
  writeEmpty: [["shout", "You didn't write anything! Don't you want to stay in Japan?? Write!"], ["shock", "That's... not an essay. Try again."]],
  writeShort: [["shout", "Under 400 characters. Add another reason with an example."], ["calm", "Good start, but too short. Aim for 400 to 500."]],
  writeLong: [["shock", "Over 500! Cut the extra. Short and sharp wins."]],
  writeGood: [["smile", "400 to 500, structured, done. I'm so proud of you."], ["smile", "Look at you writing essays in Japanese. Unreal."], ["shout", "THAT'S a real EJU essay. Again tomorrow!"]],
  flatline: [
    ["shout", "Flatlined?! Get back in there right now."],
    ["shout", "Okay, that run was a mess. Again. I'll wait."],
    ["calm", "Rough one. Patch up and go again, I believe in you."]
  ],
  clean: [
    ["smile", "A clean run! Come here, I'm so proud of you."],
    ["shout", "PERFECT RUN. Screenshot it. Send it to me."],
    ["smile", "Flawless. Japan should be scared of you."]
  ],
  done: [
    ["smile", "Run done. One more?"],
    ["smile", "Good work. Now do another one, for me."],
    ["calm", "Not bad. Not bad at all. Again?"]
  ],
  cardGood: [
    ["smile", "Locked in."],
    ["smile", "You remembered! Good job, babe."],
    ["calm", "That one's yours now."],
    ["smile", "Your brain is so big today."]
  ],
  cardBad: [
    ["shout", "You forgot that one?? It comes back tomorrow, and so do I."],
    ["shock", "We've seen that card before..."],
    ["calm", "It's okay, that's what the deck is for."],
    ["shout", "Don't you want to stay in Japan? Learn the word!"]
  ],
  hubLazy: [
    ["shout", "Hello?? You haven't studied today. Don't you want to stay in Japan?"],
    ["shout", "Zero XP today. I'm watching you."],
    ["shout", "Okay you need to study. Like now. One mission, go."],
    ["shock", "You opened the app and didn't press Run? Who raised you?"],
    ["shout", "The exam doesn't care that you're tired. Ten minutes. Go."]
  ],
  hubStreakLost: [
    ["shout", "You broke your uptime?! After everything?? Start it again today."],
    ["shock", "Your streak is gone. I need a moment."],
    ["shout", "No study yesterday? Don't let it happen twice."]
  ],
  hubSome: [
    ["smile", "You started today. Finish your daily goal and I'll stop nagging."],
    ["calm", "Halfway is not all the way. Keep going."],
    ["smile", "Good start! Don't stop now."]
  ],
  hubDone: [
    ["smile", "Daily goal done. You're amazing, you know that?"],
    ["smile", "Goal hit. Okay, now you're allowed to play games."],
    ["smile", "Another day closer to Japan. Proud of you."]
  ],
  bossStart: [
    ["calm", "Corp exam. No help from me this time. Show them."],
    ["shout", "Treat it like the real thing. No phone!"]
  ],
  bossPass: [
    ["shout", "You breached the corp!! I'm screaming."],
    ["smile", "That's a pass. The real one will be too."]
  ],
  bossFail: [
    ["shout", "That's not a pass. Back to the districts, mister."],
    ["calm", "Not yet. Look at what you missed, then we go again."]
  ],
  levelUp: [
    ["shout", "LEVEL UP! Okay, I'm impressed."],
    ["smile", "Another level. Japan, here he comes."],
    ["smile", "Look at you leveling up. I told you."]
  ]
};
