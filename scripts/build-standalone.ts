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

if (!cssFile || !jsFile) {
  console.error("Could not find css or js file in dist/assets");
  process.exit(1);
}

const css = fs.readFileSync(path.join(assetsDir, cssFile), "utf8");
const js = fs.readFileSync(path.join(assetsDir, jsFile), "utf8");

const standalone = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bujji, opened up // Kalki 2898 AD — Pure Anatomy Showcase</title>
    <meta name="description" content="Pure Anatomy Skill Showcase: 3/4 isometric cutaway of Bujji's front drive with interactive unwrap divider and live throttle regulator." />
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

const outPath = path.resolve(import.meta.dirname, "../bujji-opened-up.html");
fs.writeFileSync(outPath, standalone);
console.log("Successfully generated standalone file:", outPath, `(${standalone.length} bytes)`);
