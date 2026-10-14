import fs from "fs";
import path from "path";

const distDir = path.resolve(import.meta.dirname, "../dist");
const htmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(htmlPath)) {
  console.error("dist/index.html not found. Run build first.");
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");
const assetsDir = path.join(distDir, "assets");
const files = fs.readdirSync(assetsDir);

const cssFile = files.find((f) => f.endsWith(".css"));
const jsFile = files.find((f) => f.endsWith(".js"));

if (!jsFile) {
  console.error("Could not find js file in dist/assets");
  process.exit(1);
}

let css = "";
if (cssFile) {
  css = fs.readFileSync(path.join(assetsDir, cssFile), "utf8");
} else {
  const match = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (match) {
    css = match[1];
  }
}

const js = fs.readFileSync(path.join(assetsDir, jsFile), "utf8");

const standalone = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bujji: Agentic CAD Anatomy // Futuristic Autonomous Vehicle</title>
    <meta name="description" content="100% Vector SVG CAD Anatomy of Bujji from Kalki 2898 AD. Interactive cutaway divider and live telemetry." />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <link rel="alternate icon" href="favicon.ico" />
    <style>
      ${css}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      ${js}
    </script>
  </body>
</html>`;

const outPath1 = path.resolve(import.meta.dirname, "../bujji-opened-up.html");
const outPath2 = path.resolve(import.meta.dirname, "../index.html");
const outPath3 = path.resolve(import.meta.dirname, "../dist/index.html");

fs.writeFileSync(outPath1, standalone);
fs.writeFileSync(outPath2, standalone);
fs.writeFileSync(outPath3, standalone);

console.log("Successfully generated standalone files:");
console.log("  ->", outPath1, `(${standalone.length} bytes)`);
console.log("  ->", outPath2, `(${standalone.length} bytes)`);
console.log("  ->", outPath3, `(${standalone.length} bytes)`);
