const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const keys = [
  "We don't gamble",
  "is your canvas",
  "Steve",
  "KENDU EMPOWERS",
  "What will you",
  "Kendu Games",
  "CertiK",
  "How to buy",
  "Join the pack",
  "What is Kendu",
  "0xaa95",
  "Track Kendu",
  "canvas.mp4",
  "hero_video",
  "videothumbnail",
];
for (const k of keys) {
  const i = html.indexOf(k);
  console.log("\n======== " + k + " @ " + i + " ========");
  if (i < 0) continue;
  console.log(html.slice(Math.max(0, i - 180), i + 420).replace(/\s+/g, " "));
}
