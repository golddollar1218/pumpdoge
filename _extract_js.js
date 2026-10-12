const fs = require("fs");
const path = require("path");

const files = [
  "_app/immutable/nodes/0.BqNX-KkP.js",
  "_app/immutable/nodes/1.t0CJDkA5.js",
  "_app/immutable/nodes/2.CY2AyceR.js",
  "_app/immutable/nodes/3.CnZ7O6GG.js",
  "_app/immutable/nodes/4.DPbIXlF3.js",
  "_app/immutable/nodes/5.Da7egEI7.js",
  "_app/immutable/nodes/6.n5vRlyw6.js",
  "_app/immutable/nodes/7.DJD92yeF.js",
  "_app/immutable/chunks/44ueGnJM.js",
  "_app/immutable/chunks/BOpwcjIE.js",
  "_app/immutable/chunks/Bru4_v6k.js",
];

function extract(file) {
  const t = fs.readFileSync(file, "utf8");
  const strings = [];
  const re = /`([^`\\]|\\[\s\S])*`|"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/g;
  let m;
  while ((m = re.exec(t))) {
    let s = m[0].slice(1, -1);
    if (s.length < 12) continue;
    if (/^[a-z0-9_./:-]+$/i.test(s) && !/kendu/i.test(s)) continue;
    if (s.includes("function") || s.includes("=>") || s.includes("class=")) continue;
    if (s.length > 400 && !/kendu/i.test(s) && !/[A-Z][a-z]{3,}/.test(s)) continue;
    if (/[{};]|<\/?[a-z]/i.test(s) && s.length > 80 && !/kendu/i.test(s)) continue;
    strings.push(s.replace(/\\n/g, " ").replace(/\s+/g, " ").slice(0, 500));
  }
  return strings;
}

let out = "";
for (const f of files) {
  const strings = extract(f);
  const interesting = strings.filter(
    (s) =>
      /kendu|buy|build|community|token|brand|policy|wallet|telegram|solana|eth|base/i.test(s) ||
      /[A-Z][a-z]+ [a-z]+/.test(s)
  );
  out += "\n\n===== " + path.basename(f) + " (" + interesting.length + ") =====\n";
  const seen = new Set();
  for (const s of interesting) {
    if (seen.has(s)) continue;
    seen.add(s);
    out += s + "\n---\n";
  }
}
fs.writeFileSync("_js_strings.txt", out);
console.log("wrote", out.length);
