const fs = require("fs");
function around(file, needle, n = 500) {
  const t = fs.readFileSync(file, "utf8");
  let i = 0, c = 0;
  while ((i = t.indexOf(needle, i)) !== -1 && c < 3) {
    console.log("\n## " + file + " @" + i);
    console.log(t.slice(Math.max(0, i - 200), i + n));
    i += needle.length;
    c++;
  }
}
around("_app/immutable/nodes/0.BqNX-KkP.js", "0xaa95", 800);
around("_app/immutable/chunks/BOpwcjIE.js", "Steve", 250);
around("_app/immutable/nodes/3.CnZ7O6GG.js", "What is Kendu?", 2200);
