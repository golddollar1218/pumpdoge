const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() && entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "downloads" || entry.name === "fonts" || entry.name === "videos" || entry.name === "memes") continue;
      walk(full, acc);
    } else if (/\.(js|html|webmanifest)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

const FAQ = `text:"What is pumpdoge?",answer:\`pumpdoge is a Solana meme coin with one green pixel doge and the ticker PUMPDOGE. The doge is mid-run, the sky is dark green, and the chart beside it points up.
<br /><br />
The name is pumpdoge. Say it once and the picture is already there: a shiba stitched in green, a moon, and candles climbing. That is the whole brand, and it is meant to be posted.
<br /><br />
There is no second mascot and no other ticker. Holders share the same doge, the same letters, and the same joke. Every repost keeps PUMPDOGE moving.
<br /><br />
pumpdoge stays simple on purpose. Logo, banner, name, ticker. If you can see the doge, you already know the coin.
\`},{id:2,text:"Is pumpdoge just another dog token?",answer:\`
			pumpdoge is a doge meme, on purpose. The logo is a green pixel shiba caught mid-leap. The banner puts that same doge over a moon, a crowd in shades, and a chart that only goes up.
<br /><br />
The name is pumpdoge. The ticker is PUMPDOGE. It is not borrowing some other animal, and it is not hiding the joke. The doge runs, and the letters spell the run.
<br /><br />
People know it by the green stitch and the smile. Post the logo, post the banner, or crop a new meme from them. Same doge, same ticker, every time.
\`},{id:3,text:"How can I help?",answer:\`
		Start with the name and the ticker. Say pumpdoge. Write PUMPDOGE. Use the green doge from the logo and the banner so the meme stays recognizable.
<br /><br />
Make new images in that same pixel green. Keep the doge running, keep the letters chunky, and keep the joke obvious. A moon, a chart, a crowd of shades — that is the set.
<br /><br />
Share those memes where people already look for Solana coins. Comment, repost, and pass the doge along. The picture does the talking.
<br /><br />
Offline, wear it or sketch it. The only rule is to keep the doge green and the ticker clear. You are posting a meme, so keep it friendly.
<br /><br />
If you want pumpdoge to travel, post it like it already has. Who sees the doge next?
			\`}`;

const phrases = [
  [
    `text:"What is Kendu?",answer:\`Kendu is a permissionless brand, memecoin ecosystem, and social movement powered entirely by its community. There is no formal team, no roadmap, and no corporate structure hiding behind the scenes. Every holder is the team. Every action moves Kendu forward.
<br /><br />
Kendu’s strength comes from a simple idea: when you remove limits on who can build, anyone can create something valuable. That freedom has created a symbiotic relationship between holders and builders. Holders grow the culture, and builders expand it into the real world with products, events, and businesses. Both feed each other. Both win together.
<br /><br />
Kendu’s ecosystem grows through real people, not paid campaigns. There are no fake metrics or bots here. Every tweet, meme, design, and sale comes from a person who genuinely cares. That’s why Kendu scales infinitely. It grows through activation, not orders.
<br /><br />
Kendu is a living experiment in what happens when a brand belongs to everyone. Many roadmaps, many leaders, and a collective will to build something bigger than ourselves.
\`},{id:2,text:"Is Kendu just another dog/animal token?",answer:\`
			No. Kendu, despite its logo, was not built around an animal narrative, TikTok pet, or a passing meme trend. It stands on its own as an original brand and culture created by its community.
<br /><br />
People often try to put projects into categories they already understand, but Kendu doesn’t fit into any of them. It isn’t a copy, it isn’t a flavour of the month, and it doesn’t rely on a single mascot or theme to survive. It’s a living, evolving ecosystem shaped by whoever chooses to build within it.
<br /><br />
Inside the community, Kendu becomes whatever you make it. For some, it’s a creative outlet, for others, a business, a lifestyle, a mindset, or simply a shared mission to build something meaningful together. Kendu is a blank canvas, and what it represents is up to you.
\`},{id:3,text:"How can I help?",answer:\`
		Start by understanding that you are Kendu. Every post, every conversation, every action matters. The project grows through individual autonomous activation, not orders from above or paid marketing.
<br /><br />
There’s no fixed way to contribute. Some people create art, videos, and memes. Others onboard holders, build businesses, design products, host Spaces, or simply spread the culture. What you do isn’t as important as doing it consistently and with intent.
<br /><br />
If you’re new, the easiest way to begin is by engaging. Comment with real thoughts. Share content. Join conversations. Make your own posts. Invite friends and your personal network to build and grow with you. Every bit of authentic activity adds to Kendu’s momentum and creates ripple effects that go further than you think.
<br /><br />
Offline, it’s the same. Wear it, talk about it, build around it. Start a side project or join one that already exists. The only rule is to move with respect, positivity, and conviction. You represent a movement that grows through creativity, not conflict.
<br /><br />
If you want Kendu to succeed, act like it already has. Who are you going to onboard today?
			\``,
    FAQ,
  ],
  ["We don't gamble, we work.", "The green doge that pumps."],
  ["is your canvas, now paint!", "is the doge that pumps!"],
  [
    "A grassroots crypto brand where anyone can build ideas with instant access to 10,000+ creators, builders, and doers shaping the future together.",
    "A green pixel doge on Solana. The name is pumpdoge and the ticker is PUMPDOGE. One running shiba, a moon, and a chart that points up.",
  ],
  [
    "A grassroots crypto brand where anyone can build ideas with instant access to 10,000+\n\t\t\tcreators, builders, and doers shaping the future together.",
    "A green pixel doge on Solana. The name is pumpdoge and the ticker is PUMPDOGE. One running shiba, a moon, and a chart that points up.",
  ],
  ["KENDU EMPOWERS BUILDERS", "PUMPDOGE RUNS THE MEME"],
  ["What will you du with Kendu?", "What will you do with pumpdoge?"],
  ["We'll support you while you build your dreams.", "Post the doge. The ticker is PUMPDOGE."],
  [
    "The Kendu community grows through real action — online, offline, and everything in between.",
    "The pumpdoge community grows by sharing the green doge, online and wherever memes travel.",
  ],
  [
    "These moments show how holders bring the movement to life in their own way.",
    "These frames show the running doge, the moon, and the ticker PUMPDOGE.",
  ],
  ["CertiK Skynet Score", "Pack energy"],
  ["Certik Audit", "Solana meme"],
  ["free CertiK audit.", "ticker PUMPDOGE."],
  [
    "Kendu is the second memecoin in history to organically reach the 50,000 votes needed for a",
    "pumpdoge is a Solana meme coin. The name is pumpdoge and the ticker is",
  ],
  ["Code Security", "Pixel craft"],
  ["Governance", "The pack"],
  ["Operational", "The run"],
  ["Fundamental", "The ticker"],
  ["© 2025 Kendu.", "© 2026 pumpdoge."],
  [
    "Kendu is a permissionless brand, you can build anything and we'll support you!",
    "pumpdoge is a Solana meme. The name is pumpdoge and the ticker is PUMPDOGE.",
  ],
  ["Leverage your passions", "Share the green doge"],
  ["Leverage Passions", "pumpdoge meme"],
  ["<p class=\"leading-tight\">Steve <br/> Oxen</p>", "<p class=\"leading-tight\">pump <br/> doge</p>"],
  ["<p class=\"leading-tight\">Modern Samurai</p>", "<p class=\"leading-tight\">green runner</p>"],
  ["Kendu Air Kick", "pumpdoge Moon Run"],
  ["Kendu Dojo Night", "pumpdoge Night Run"],
  ["Standing Kendu", "Standing pumpdoge"],
  ["Kendu Lantern String", "pumpdoge Star Trail"],
  ["You Kendu It - Diecut", "You pumpdoge It"],
  ["Kendu_Hoodie_Stencil", "pumpdoge Hoodie"],
  ["Kendu Mask Logo", "pumpdoge logo"],
  ["Kendu Logo", "pumpdoge logo"],
  ["Simple on-ramp. Wallet or CEX – KENDU in minutes.", "Simple on-ramp. Wallet or CEX – PUMPDOGE in minutes."],
  ["See what the pack is shipping: merch, art, events and more.", "See the green doge memes: logo, banner, moon, and the ticker PUMPDOGE."],
  ["Download official Kendu brand assets and resources.", "Download pumpdoge logo, banner, and meme art."],
  ["Permissionless use – read the policy before you build.", "Use the pumpdoge name and the PUMPDOGE ticker. Read the policy first."],
  ["join us AND Find your purpose", "join the run AND post the doge"],
  ["Your future business", "Your next meme"],
  ["Indie studio by ex-Bioware & AAA devs. Play bold, play Kendu.", "Pixel runs and green doges. Play bold, play pumpdoge."],
  ["Indie studio by ex-Bioware &amp; AAA devs. Play bold, play Kendu.", "Pixel runs and green doges. Play bold, play pumpdoge."],
  ["Fuel up raids with Kendu Energy drinks. Power meets flavor.", "Green cans for the run. Power meets pumpdoge."],
  ["Extreme sports in Kendu, empowering every rider, racer, shredder, and athlete to unleash their full potential.", "The doge stays mid-leap. Riders, racers, and shredders ride with pumpdoge."],
  ["Clubs, music, and sport—Kolkata's nights light up with Kendu.", "Clubs, music, and night runs, lit in pumpdoge green."],
  ["Murals, festivals, art—Kendu hits the streets with StaySeaArt", "Murals and festivals. pumpdoge hits the wall in green."],
  ["Brazilian beans, roasted in the UK. Kendu Coffee, day or night.", "A green cup for late charts. pumpdoge coffee, day or night."],
  ["Jewelry that shines with Kendu flair. Brilliance redefined.", "Green metal with doge flair. Brilliance, ticker PUMPDOGE."],
  ["Community-driven merch. Wear your Kendu with pride.", "Community merch. Wear the doge and the name pumpdoge."],
  ["Download free 3D Kendu masks. Print, post, and play.", "Download the doge. Print it, post it, and play."],
  ["Handmade Kendu patches to stitch your story on.", "Handmade doge patches. Stitch pumpdoge on."],
  ["Brewed in the EU, crafted with spirit. Kendu Beer.", "Brewed for the timeline. pumpdoge beer."],
  ["Plushies with a tale to tell. Hug the Kendu story.", "Plush doges with a tale. Hug pumpdoge."],
  ["Seasonings, rubs, and bold blends. Spice it up with Kendu.", "Bold green blends. Spice it with pumpdoge."],
  ["Keychains, glasses, and more. Print your Kendu fun.", "Keychains and glasses. Print the pumpdoge doge."],
  ["Kendu vending machines from Nashville, Tennessee.", "pumpdoge machines stocked with green doge merch."],
  ["Organic body care, powered by Kendu.", "Green body care, powered by pumpdoge."],
  ["Italian leather sneakers. Limited Kendu drops.", "Green runners. Limited pumpdoge drops."],
  ["icons/kendu-logo.svg", "/logo-7.png"],
  ["/icons/kendu-logo.svg", "/logo-7.png"],
];

function neutralizeUrls(src) {
  let s = src.replaceAll("https://kendu.io", "").replaceAll("http://kendu.io", "");
  s = s.replace(/https?:\/\/[^\s"'`<>\\]+/g, (url) => {
    if (
      /kendu|0xaa95f26e30001251fb905d264aa7b00ee9df6c18|2nnrviYJRLcf2bXAxpKTRXzccoDbwaP4vzuGUG75Jo45|0xef73611f98da6e57e0776317957af61b59e09ed7/i.test(
        url
      )
    ) {
      return "#";
    }
    return url;
  });
  return s;
}

function brandWords(src) {
  return src
    .replace(/KenduInu/g, "pumpdoge")
    .replace(/kenduinu/g, "pumpdoge")
    .replace(/kendu-inu/gi, "pumpdoge")
    .replace(/Kendu_Army/g, "pumpdoge")
    .replace(/kenduecosystem/g, "pumpdoge")
    .replace(/(?<![A-Za-z0-9_-])KENDU(?![A-Za-z0-9_-])/g, "PUMPDOGE")
    .replace(/(?<![A-Za-z0-9_-])Kendu(?![A-Za-z0-9_-])/g, "pumpdoge")
    .replace(/(?<![A-Za-z0-9_-])kendu(?![A-Za-z0-9_-])/g, "pumpdoge");
}

const addresses = [
  "0xaa95f26e30001251fb905d264Aa7b00eE9dF6C18",
  "0xaa95f26e30001251fb905d264aa7b00ee9df6c18",
  "2nnrviYJRLcf2bXAxpKTRXzccoDbwaP4vzuGUG75Jo45",
  "0xef73611F98DA6E57e0776317957af61B59E09Ed7",
  "0xef73611f98da6e57e0776317957af61b59e09ed7",
];

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  let src = fs.readFileSync(file, "utf8");
  const before = src;
  src = neutralizeUrls(src);
  for (const [from, to] of phrases) {
    if (src.includes(from)) src = src.split(from).join(to);
  }
  src = brandWords(src);
  for (const addr of addresses) src = src.split(addr).join("TBA");
  if (src !== before) {
    fs.writeFileSync(file, src);
    changed++;
  }
}
console.log("updated files", changed, "of", files.length);
