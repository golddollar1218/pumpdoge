import os
import hashlib
from PIL import Image, ImageOps

ROOT = r"E:\pack\solana\pumpdoge"
ASSET = r"C:\Users\Alita\.cursor\projects\e-pack-solana-pumpdoge\assets"

portraits = [
    os.path.join(ASSET, "meme-run.jpg"),
    os.path.join(ASSET, "meme-wow.jpg"),
    os.path.join(ASSET, "meme-chart.jpg"),
    os.path.join(ASSET, "meme-crowd.jpg"),
]
squares = [
    os.path.join(ROOT, "logo-7.png"),
    os.path.join(ASSET, "meme-moon.jpg"),
    os.path.join(ASSET, "meme-hoodie.jpg"),
]
wides = [
    os.path.join(ROOT, "banner-7.png"),
    os.path.join(ASSET, "meme-run.jpg"),
    os.path.join(ASSET, "meme-chart.jpg"),
]

os.makedirs(os.path.join(ROOT, "memes"), exist_ok=True)
for src in portraits + squares + wides:
    if os.path.isfile(src) and not src.startswith(os.path.join(ROOT, "memes")):
        dest = os.path.join(ROOT, "memes", os.path.basename(src))
        if os.path.abspath(src) != os.path.abspath(dest):
            Image.open(src).save(dest, quality=90)

SKIP_PARTS = (
    "images/exchanges/",
    "images/chart/",
    "images/hero/",
    "images/build/",
    "images/gradient",
    "/icons/",
    "\\icons\\",
)

PHOTO_PREFIXES = (
    "album-art",
    "beer",
    "brilliance",
    "choose-guideline",
    "coffee",
    "creator",
    "energy",
    "entertainment",
    "games",
    "hero-bg",
    "IMG_",
    "merch",
    "organics",
    "photo_",
    "plushies",
    "printables",
    "sneakers",
    "spice",
    "street-team",
    "unleashed",
    "unstitched",
    "vendu",
    "your-idea",
)


def rel(path):
    return os.path.relpath(path, ROOT).replace("\\", "/")


def should_replace(path):
    r = rel(path)
    ext = os.path.splitext(path)[1].lower()
    if ext not in {".png", ".jpg", ".jpeg", ".webp"}:
        return False
    if any(part in r for part in ("images/exchanges/", "images/chart/", "images/hero/", "images/build/")):
        return False
    if "gradient" in r:
        return False
    if r.startswith("icons/"):
        return False
    if r.startswith("memes/"):
        return False
    if r.startswith("images/") or r.startswith("downloads/"):
        return True
    if r.startswith("_app/immutable/assets/"):
        base = os.path.basename(r)
        return base.startswith(PHOTO_PREFIXES)
    return False


def pick(path, w, h):
    digest = hashlib.md5(rel(path).encode()).hexdigest()
    n = int(digest[:6], 16)
    ratio = w / max(h, 1)
    name = os.path.basename(path).lower()
    if "logo" in name or "og-logo" in name or name.startswith("favicon") or "apple-touch" in name:
        pool = squares
    elif ratio >= 1.35:
        pool = wides
    elif ratio <= 0.85:
        pool = portraits
    else:
        pool = squares
    return pool[n % len(pool)]


def cover(src, w, h):
    im = Image.open(src).convert("RGB")
    return ImageOps.fit(im, (max(w, 1), max(h, 1)), Image.Resampling.LANCZOS)


def save_as(im, path):
    ext = os.path.splitext(path)[1].lower()
    if ext in {".jpg", ".jpeg"}:
        im.save(path, format="JPEG", quality=84)
    elif ext == ".webp":
        im.save(path, format="WEBP", quality=78, method=0)
    else:
        im.save(path, format="PNG")


count = 0
failed = []
for dirpath, _, files in os.walk(ROOT):
    if any(skip in dirpath for skip in ("\\memes", "\\.git", "\\fonts")):
        continue
    for name in files:
        path = os.path.join(dirpath, name)
        if not should_replace(path):
            continue
        try:
            with Image.open(path) as current:
                w, h = current.size
            out = cover(pick(path, w, h), w, h)
            save_as(out, path)
            count += 1
        except Exception as exc:
            failed.append(f"{rel(path)}: {exc}")

# favicons from the logo
logo = Image.open(os.path.join(ROOT, "logo-7.png")).convert("RGBA")
for size, filename in ((16, "favicon-16x16.png"), (32, "favicon-32x32.png"), (180, "apple-touch-icon.png")):
    icon = ImageOps.fit(logo, (size, size), Image.Resampling.LANCZOS)
    icon.save(os.path.join(ROOT, filename), format="PNG")

svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#07140c"/>
  <circle cx="32" cy="34" r="16" fill="#3dff7a"/>
  <circle cx="24" cy="22" r="6" fill="#3dff7a"/>
  <circle cx="40" cy="22" r="6" fill="#3dff7a"/>
  <circle cx="38" cy="32" r="2" fill="#07140c"/>
  <path d="M30 40c4 3 8 3 12 0" fill="none" stroke="#07140c" stroke-width="2" stroke-linecap="round"/>
</svg>
"""
with open(os.path.join(ROOT, "favicon.svg"), "w", encoding="utf-8") as handle:
    handle.write(svg)

wordmark_dark = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180">
  <rect width="640" height="180" fill="#07140c"/>
  <text x="320" y="112" text-anchor="middle" font-family="Arial Black, Impact, sans-serif" font-size="84" fill="#3dff7a">pumpdoge</text>
</svg>
"""
wordmark_light = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180">
  <rect width="640" height="180" fill="#f4f7f4"/>
  <text x="320" y="112" text-anchor="middle" font-family="Arial Black, Impact, sans-serif" font-size="84" fill="#0c3d22">pumpdoge</text>
</svg>
"""
svg_count = 0
downloads = os.path.join(ROOT, "downloads")
if os.path.isdir(downloads):
    for dirpath, _, files in os.walk(downloads):
        for name in files:
            if not name.lower().endswith(".svg"):
                continue
            target = os.path.join(dirpath, name)
            blob = wordmark_light if "white" in name.lower() else wordmark_dark
            with open(target, "w", encoding="utf-8") as handle:
                handle.write(blob)
            svg_count += 1

avif_removed = 0
for dirpath, _, files in os.walk(ROOT):
    for name in files:
        if not name.lower().endswith(".avif"):
            continue
        path = os.path.join(dirpath, name)
        r = rel(path)
        if r.startswith("images/") or r.startswith("_app/immutable/assets/") or r.startswith("downloads/"):
            os.remove(path)
            avif_removed += 1

print("images", count, "svgs", svg_count, "avif_removed", avif_removed, "failed", len(failed))
for line in failed[:30]:
    print("FAIL", line)
