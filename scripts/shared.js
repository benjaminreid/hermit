const postcss = require("postcss");
const tailwind = require("tailwindcss");
const fs = require("fs-extra");

const inputDirectory = "src";
const outputDirectory = "dist";

async function buildHTML() {
  const file = "index.html";
  const index = await fs.readFile(`${inputDirectory}/${file}`);
  await fs.outputFile(`${outputDirectory}/${file}`, index);
}

async function buildCSS() {
  const file = "styles.css";
  const inputCSSFilePath = `${inputDirectory}/css/${file}`;
  const outputCSSFilePath = `${outputDirectory}/css/${file}`;

  const CSSFile = await fs.readFile(inputCSSFilePath);

  const result = await postcss([tailwind]).process(CSSFile, {
    from: inputCSSFilePath,
    to: outputCSSFilePath,
  });

  await fs.outputFile(outputCSSFilePath, result.css);

  if (result.map) {
    await fs.outputFile(`${outputCSSFilePath}.map`, result.map);
  }
}

async function copyStaticAssets() {
  const assets = ["favicon.ico", "apple-touch-icon.png"].map(
    (file) => `${inputDirectory}/${file}`
  );

  return Promise.all([
    ...assets.map((file) =>
      fs.copy(file, file.replace(inputDirectory, outputDirectory))
    ),
  ]);
}

module.exports.inputDirectory = inputDirectory;
module.exports.outputDirectory = outputDirectory;
module.exports.buildHTML = buildHTML;
module.exports.buildCSS = buildCSS;
module.exports.copyStaticAssets = copyStaticAssets;
