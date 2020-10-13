const bs = require("browser-sync").create();

bs.watch("./dist/index.html").on("change", bs.reload);

bs.init({
  server: "./dist",
});
