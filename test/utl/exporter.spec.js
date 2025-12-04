const { describe, it } = require("node:test");
const { equal } = require("node:assert/strict");
const exporter = require("../../src/utl/exporter");

const MSC =
  'msc{a[label="💩"],b[label="序"],c [label="💩"]; a => b[label="things"], c => b;}';

describe("utl/exporter", function () {
  describe("#toLocationString", function () {
    it("without extra parameters", function () {
      const lLocation = {
        protocol: "http",
        host: "localhost",
        pathname: "mscgen_js/index.html",
      };
      equal(
        exporter.toLocationString(lLocation, MSC, "mscgen"),
        "mscgen_js/index.html?lang=mscgen&msc=msc%7Ba%5Blabel%3D%22%F0%9F%92%A9%22%5D%2Cb%5Blabel%3D%22%E5%BA%8F%22%5D%2Cc%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%20a%20%3D%3E%20b%5Blabel%3D%22things%22%5D%2C%20c%20%3D%3E%20b%3B%7D",
      );
    });
    it("with a source that is too big (> 4k)", function () {
      const lLocation = {
        protocol: "http",
        host: "localhost",
        pathname: "mscgen_js/index.html",
      };
      const lL100WString =
        "# 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890";
      let lBig = lL100WString;
      for (let lIndex = 0; lIndex < 40; lIndex++) {
        lBig += lL100WString;
      }
      equal(
        exporter.toLocationString(lLocation, lBig, "mscgen"),
        "mscgen_js/index.html?lang=mscgen&msc=%23%20source%20too%20long%20for%20an%20URL",
      );
    });
  });
});

/* we can't really make these two long strings shorter without compromising readability */
