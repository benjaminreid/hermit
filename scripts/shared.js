const postcss = require("postcss");
const fs = require("fs-extra");
const minify = require("html-minifier").minify;
const sum = require("hash-sum");
const postCSSConfig = require("../postcss.config");

const inputDirectory = "src";
const outputDirectory = "dist";

async function buildHTML({ CSSFileName } = { CSSFileName: null }) {
  const file = "index.html";
  const index = await fs.readFile(`${inputDirectory}/${file}`);
  let html = index.toString();

  if (process.env.NODE_ENV === "production") {
    html = minify(html, {
      collapseWhitespace: true,
    });

    if (CSSFileName !== null) {
      html = html.replace("styles.css", CSSFileName);
    }
  }

  await fs.outputFile(`${outputDirectory}/${file}`, html);
}

async function buildCSS() {
  const inputFileName = "styles.css";
  let outputFileName = "styles.css";
  const inputCSSFilePath = `${inputDirectory}/css/${inputFileName}`;

  const CSSFile = await fs.readFile(inputCSSFilePath);

  if (process.env.NODE_ENV === "production") {
    const content = CSSFile.toString();
    outputFileName = `${sum(content + new Date())}.css`;
  }

  const outputCSSFilePath = `${outputDirectory}/css/${outputFileName}`;

  const result = await postcss(postCSSConfig.plugins).process(CSSFile, {
    from: inputCSSFilePath,
    to: outputCSSFilePath,
  });

  await fs.outputFile(outputCSSFilePath, result.css);

  if (result.map) {
    await fs.outputFile(`${outputCSSFilePath}.map`, result.map);
  }

  return outputFileName;
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
