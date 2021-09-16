const bs = require("browser-sync").create();
const fs = require("fs-extra");
const {
  buildHTML,
  buildCSS,
  copyStaticAssets,
  inputDirectory,
  outputDirectory,
} = require("./shared");

async function run() {
  await fs.emptyDir(outputDirectory);

  await copyStaticAssets();
  await buildHTML();
  await buildCSS();

  bs.watch(`${inputDirectory}/index.html`, async (event) => {
    if (event === "change") {
      await buildHTML();
    }
  });

  bs.watch(`${outputDirectory}/index.html`).on("change", async () => {
    await buildCSS();
    bs.reload();
  });

  bs.watch(`${inputDirectory}/css/styles.css`).on("change", async () => {
    await buildCSS();
    bs.reload("styles.css");
  });

  bs.init({
    server: outputDirectory,
    open: false,
  });
}

run();
