const { describe, it } = require("node:test");
const { equal } = require("node:assert/strict");
const errorRendering = require("../../src/embedding/error-rendering");

describe("embedding/error-rendering", function () {
  describe("#renderError", function () {
    it("should render error and source without underline when error location not provided", function () {
      equal(
        errorRendering.renderError(
          "Just a source\nwith two lines",
          undefined,
          "just a message",
        ),
        "<pre><div style='color: #d00'># ERROR just a message</div>  1 Just a source\n  2 with two lines\n</pre>",
      );
    });

    it("should render error and source with underline when error location provided", function () {
      const lErrorLocation = {
        start: {
          line: 2,
          column: 6,
        },
      };
      equal(
        errorRendering.renderError(
          "Just a source\nwith two lines",
          lErrorLocation,
          "just a message",
        ),
        "<pre><div style='color: #d00'># ERROR on line 2, column 6 - just a message</div>  1 Just a source\n<mark>  2 with <span style='text-decoration:underline'>t</span>wo lines\n</mark></pre>",
      );
    });
  });

  describe("#deHTMLize() - ", function () {
    it("replaces < with &lt;", function () {
      equal(errorRendering.deHTMLize("<"), "&lt;");
    });
    it("replaces all < with &lt;", function () {
      equal(
        errorRendering.deHTMLize("<bla>hello</bla>"),
        "&lt;bla>hello&lt;/bla>",
      );
    });
    it("leaves strings without < alone", function () {
      equal(
        errorRendering.deHTMLize(
          "In Dutch, Huey, Louis and Dewy translate => Kwik, Kwek en Kwak",
        ),
        "In Dutch, Huey, Louis and Dewy translate => Kwik, Kwek en Kwak",
      );
    });
  });

  describe("#formatNumber() - ", function () {
    it("puts two spaces in front of a single digit on max width 3", function () {
      equal(errorRendering.formatNumber(7, 3), "  7");
    });
    it("puts no spaces in front of a single digit on max width 1", function () {
      equal(errorRendering.formatNumber(7, 1), "7");
    });
    it("puts no spaces in front of a single digit on max width 0", function () {
      equal(errorRendering.formatNumber(7, 0), "7");
    });
    it("puts no spaces in front of a single digit on max width < 0", function () {
      equal(errorRendering.formatNumber(7, -8), "7");
    });
    it("puts no spaces in front of a three digit number on max width 3", function () {
      equal(errorRendering.formatNumber(481, 3), "481");
    });
  });
});
