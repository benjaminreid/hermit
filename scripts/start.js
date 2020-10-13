const bs = require("browser-sync").create();
const fs = require("fs-extra");
const { buildHTML, buildCSS, outputDirectory } = require("./shared");

async function run() {
  await fs.emptyDir(outputDirectory);

  await buildHTML();
  await buildCSS();

  bs.watch("src/index.html", async (event) => {
    if (event === "change") {
      await buildHTML();
    }
  });

  bs.watch(`${outputDirectory}/index.html`).on("change", bs.reload);

  bs.init({
    server: outputDirectory,
    open: false,
  });
}

run();
