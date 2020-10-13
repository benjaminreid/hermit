const fs = require("fs-extra");
const { buildHTML, buildCSS, outputDirectory } = require("./shared");

async function run() {
  await fs.emptyDir(outputDirectory);
  await buildCSS();
  await buildHTML();
}

run();
