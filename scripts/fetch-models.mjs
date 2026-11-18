// Downloads the CC0 3D models used by the alley scene from 3dassets.dev into assets/models/.
// Runs in the GitHub Pages workflow. If a download fails, the site still works: the scene
// falls back to loading the model at runtime, then to the procedural city alone.
import { mkdir, writeFile, readFile } from "node:fs/promises";

const src = await readFile(new URL("../assets/scene.js", import.meta.url), "utf8");
const prefix = src.match(/const PREFIX = "([^"]+)"/)[1];
const slugs = [...new Set([...src.matchAll(/PREFIX \+ "([^"]+)"/g)].map(m => prefix + m[1]))];

await mkdir(new URL("../assets/models/", import.meta.url), { recursive: true });
const credits = [];
for (const slug of slugs) {
  try {
    const meta = await (await fetch(`https://3dassets.dev/api/v1/assets/${slug}`)).json();
    const d = meta.data;
    const lic = d.license || {};
    const id = String(lic.id || lic.spdx || lic.name || "").toUpperCase();
    if (id && !id.includes("CC0")) { console.warn(`skip ${slug}: licence ${id}`); continue; }
    const glb = await fetch(d.cdnUrl);
    if (!glb.ok) throw new Error(`HTTP ${glb.status}`);
    await writeFile(new URL(`../assets/models/${slug}.glb`, import.meta.url), Buffer.from(await glb.arrayBuffer()));
    credits.push(`- ${d.title} (${slug}), ${lic.attributionText || "CC0 1.0, 3dassets.dev"}`);
    console.log("ok", slug);
  } catch (e) {
    console.warn("failed", slug, e.message);
  }
}
await writeFile(new URL("../assets/models/CREDITS.md", import.meta.url), "# 3D models\n\nAll from https://3dassets.dev under CC0 1.0.\n\n" + credits.join("\n") + "\n");
