const fs = require("fs");
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = require("path").join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(js|html|svg|webmanifest)$/.test(e.name)) files.push(p);
  }
}
walk(".");
const hits = new Map();
const re = /[^\n]{0,60}(?:Kendu|KENDU|kendu)[^\n]{0,80}/g;
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  let m;
  const r = new RegExp(re.source, "g");
  while ((m = r.exec(t))) {
    let s = m[0].replace(/\s+/g, " ").trim();
    if (s.length > 180) s = s.slice(0, 180);
    hits.set(s, (hits.get(s) || 0) + 1);
  }
}
const lines = [...hits.entries()].sort((a, b) => b[1] - a[1]);
fs.writeFileSync("_hits.txt", lines.map(([s, c]) => c + " | " + s).join("\n"));
console.log("unique", lines.length);
