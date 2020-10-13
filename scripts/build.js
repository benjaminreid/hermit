const postcss = require("postcss");
const tailwind = require("tailwindcss");
const fs = require("fs-extra");

const inputCSSFileName = "styles.css";
const inputCSSFile = `src/css/${inputCSSFileName}`;
const outputDirectory = "dist";
const outputCSSFile = `dist/css/${inputCSSFileName}`;

async function run() {
  await fs.emptyDir(outputDirectory);

  const css = await fs.readFile(inputCSSFile);

  const result = await postcss([tailwind]).process(css, {
    from: inputCSSFile,
    to: outputCSSFile,
  });

  await fs.outputFile(outputCSSFile, result.css);

  if (result.map) {
    await fs.outputFile(`${outputCSSFile}.map`, result.map);
  }

  const index = await fs.readFile("src/index.html");
  await fs.outputFile("dist/index.html", index);
}

run();
