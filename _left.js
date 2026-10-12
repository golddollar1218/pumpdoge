const fs = require("fs");
const path = require("path");
function walk(d, acc=[]) {
  for (const e of fs.readdirSync(d, {withFileTypes:true})) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === "downloads" || e.name === "fonts" || e.name === "memes") continue;
      walk(p, acc);
    } else if (/\.(js|html|webmanifest)$/.test(e.name) && !e.name.startsWith("_")) acc.push(p);
  }
  return acc;
}
const re = /[^\n]{0,30}(?:Kendu|KENDU|kendu)[^\n]{0,40}/g;
const hits = new Map();
for (const f of walk(".")) {
  const t = fs.readFileSync(f, "utf8");
  let m; const r = new RegExp(re.source, "g");
  while ((m = r.exec(t))) {
    const s = m[0].replace(/\s+/g, " ").trim();
    hits.set(s, (hits.get(s)||0)+1);
  }
}
const lines = [...hits.keys()];
fs.writeFileSync("_left.txt", lines.join("\n"));
console.log("left", lines.length);
