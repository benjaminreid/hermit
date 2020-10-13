const bs = require("browser-sync").create();
const fs = require("fs-extra");

bs.watch("src/index.html", async (event) => {
  if (event === "change") {
    const index = await fs.readFile("src/index.html");
    await fs.outputFile("dist/index.html", index);
  }
});

bs.watch("./dist/index.html").on("change", bs.reload);

bs.init({
  server: "dist",
  open: false,
});
