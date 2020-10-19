const postcss = require("postcss");
const fs = require("fs-extra");
const minify = require("html-minifier").minify;
const postCSSConfig = require("../postcss.config");

const inputDirectory = "src";
const outputDirectory = "dist";

async function buildHTML() {
  const file = "index.html";
  const index = await fs.readFile(`${inputDirectory}/${file}`);
  let html = index.toString();

  if (process.env.NODE_ENV === "production") {
    html = minify(html, {
      collapseWhitespace: true,
    });
  }

  await fs.outputFile(`${outputDirectory}/${file}`, html);
}

async function buildCSS() {
  const file = "styles.css";
  const inputCSSFilePath = `${inputDirectory}/css/${file}`;
  const outputCSSFilePath = `${outputDirectory}/css/${file}`;

  const CSSFile = await fs.readFile(inputCSSFilePath);

  const result = await postcss(postCSSConfig.plugins).process(CSSFile, {
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

  const filesAndFolders = await fs.readdir(inputDirectory, {
    withFileTypes: true,
  });
  const folders = filesAndFolders
    .filter(
      (fileOrFolder) =>
        fileOrFolder.isDirectory() && fileOrFolder.name !== "css"
    )
    .map((folder) => `${inputDirectory}/${folder.name}`);

  return Promise.all([
    ...[...assets, ...folders].map((file) =>
      fs.copy(file, file.replace(inputDirectory, outputDirectory))
    ),
  ]);
}

module.exports.inputDirectory = inputDirectory;
module.exports.outputDirectory = outputDirectory;
module.exports.buildHTML = buildHTML;
module.exports.buildCSS = buildCSS;
module.exports.copyStaticAssets = copyStaticAssets;
