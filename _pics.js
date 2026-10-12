const fs = require("fs");
const files = [
  "index.html",
  "_app/immutable/nodes/3.CnZ7O6GG.js",
  "_app/immutable/nodes/5.Da7egEI7.js",
  "_app/immutable/nodes/6.n5vRlyw6.js",
  "_app/immutable/chunks/BOpwcjIE.js",
];
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  const re = /<picture>([\s\S]*?)<\/picture>/g;
  let m;
  let n = 0;
  console.log("\n" + f);
  while ((m = re.exec(t))) {
    const sources = (m[1].match(/<source/g) || []).length;
    console.log(n, "sources", sources);
    n++;
  }
}
