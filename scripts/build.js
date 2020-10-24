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
  const hashedFileName = await buildCSS();
  await buildHTML({ CSSFileName: hashedFileName });
}

run();
