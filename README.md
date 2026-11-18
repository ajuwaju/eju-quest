# Neon Pass

A cyberpunk study game for the EJU (Examination for Japanese University Admission for International Students). Run missions in neon districts, keep your uptime alive, earn creds for cyberware, and get through the Gate.

## What's inside

- **Districts:** one per EJU subject (Japanese, Math Course 1 and 2, Physics, Chemistry, Biology, Japan and the World), with 160+ practice questions and explanations.
- **Shards:** spaced-repetition flashcards for academic Japanese, grammar, math formulas, science and Japan and the World terms.
- **Intercepts:** listening drills read aloud by the browser's Japanese voice.
- **Corp exam:** a timed 20-question mock from your track.
- **Intel:** 2027 exam dates, format, fees and curated free resources (from JASSO's official guidelines).
- **Game layer:** XP, levels, daily goal and uptime streak, daily gigs, creds, cyberware, HUD colours, achievements, an original crew with a story that unlocks as you level, and synthesised sound effects with a mute switch.

Progress is saved in the browser. Use Runner, Save file to back it up or move devices.

## Personalise it

Edit `assets/config.js` to change the encrypted message that unlocks at level 2.

## Run locally

Any static server works, for example `python3 -m http.server`, then open http://localhost:8000.

## Credits

- 3D models: [3dassets.dev](https://3dassets.dev), CC0 1.0. Downloaded at deploy time by `scripts/fetch-models.mjs`.
- [three.js](https://threejs.org) (MIT), vendored in `vendor/three`.
- Fonts from Google Fonts: Big Shoulders Display, Saira, JetBrains Mono, Zen Kaku Gothic New (SIL Open Font License).
- Characters, story, logo and sound effects are original to this project.
- Exam information: JASSO, Guidelines for 2027 EJU. Always confirm dates on the JASSO site.
