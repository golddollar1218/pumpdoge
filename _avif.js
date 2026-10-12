const fs = require("fs");
const path = require("path");

const root = __dirname;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "downloads" || entry.name === "fonts" || entry.name === "videos" || entry.name === "memes") continue;
      walk(full, acc);
    } else if (/\.(js|html)$/.test(entry.name) && !entry.name.startsWith("_")) acc.push(full);
  }
  return acc;
}

const byStem = new Map();
function remember(file) {
  const base = path.basename(file);
  const match = base.match(/^(.*)\.([A-Za-z0-9_-]{6,})\.(webp|png|jpe?g)$/i);
  if (!match) return;
  const stem = match[1];
  if (!byStem.has(stem)) byStem.set(stem, base);
}

function walkImages(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkImages(full);
    else remember(full);
  }
}
walkImages(path.join(root, "_app", "immutable", "assets"));
walkImages(path.join(root, "images"));

function fallbackName(avifName) {
  const match = avifName.match(/^(.*)\.([A-Za-z0-9_-]{6,})\.avif$/i);
  if (!match) return null;
  return byStem.get(match[1]) || null;
}

function rewriteFile(src) {
  let s = src.replace(/avif:[\s\S]*?,(?=webp:|png:|jpeg:)/g, "");
  s = s.replace(/<source\b[^>]*type="image\/avif"[^>]*\/?>/g, "");
  s = s.replace(/<source\b[^>]*\.avif[^>]*\/?>/g, "");
  s = s.replace(/type="image\/avif"/g, 'type="image/webp"');
  s = s.replace(/([A-Za-z0-9_ .-]+)\.([A-Za-z0-9_-]{6,})\.avif/g, (full, stem) => {
    const repl = byStem.get(stem);
    return repl || full;
  });
  return s;
}

let changed = 0;
let left = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("avif")) continue;
  const after = rewriteFile(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
  const remain = (after.match(/\.avif/g) || []).length;
  if (remain) {
    left += remain;
    console.log("left", path.relative(root, file), remain);
  }
}
console.log("changed", changed, "avif left", left, "stems", byStem.size);
