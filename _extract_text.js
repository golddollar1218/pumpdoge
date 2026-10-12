const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
let t = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
t = t.replace(/<[^>]+>/g, "\n");
t = t
  .replace(/&amp;/g, "&")
  .replace(/&nbsp;/g, " ")
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");
const lines = t
  .split(/\n+/)
  .map((s) => s.replace(/\s+/g, " ").trim())
  .filter((s) => s.length > 1);
const uniq = [];
const seen = new Set();
for (const l of lines) {
  if (seen.has(l)) continue;
  seen.add(l);
  uniq.push(l);
}
fs.writeFileSync("_visible.txt", uniq.join("\n---\n"));
console.log("lines", uniq.length);
