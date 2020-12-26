const path = require("path");

module.exports = () => ({
  mode: "production",
  entry: "./src/mscgen-inpage.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mscgen-inpage.js",
  },
});
