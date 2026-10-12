const fs = require("fs");
const t = fs.readFileSync("_app/immutable/nodes/6.n5vRlyw6.js", "utf8");
const re = /<picture>[\s\S]{0,180}/g;
let m;
let n = 0;
while ((m = re.exec(t))) {
  console.log("\n#" + n);
  console.log(m[0]);
  n++;
}
