const fs = require("fs-extra");
const {
  buildHTML,
  buildCSS,
  copyStaticAssets,
  outputDirectory,
} = require("./shared");

async function run() {
  await fs.emptyDir(outputDirectory);
  await copyStaticAssets();
  await buildCSS();
  await buildHTML();
}

run();
