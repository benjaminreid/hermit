const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    ...(isProduction
      ? [
          require("cssnano")({
            preset: "default",
          }),
        ]
      : []),
  ],
};
