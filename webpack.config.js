const path = require("path");

/** @type {import('webpack').Configuration} */
const CONFIG = {
  mode: "production",
  entry: "./src/mscgen-inpage.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mscgen-inpage.js",
  },
};

module.exports = () => CONFIG;
