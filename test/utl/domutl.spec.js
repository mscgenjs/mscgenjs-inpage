const chai = require("chai");
const $ = require("../../src/utl/domutl");

const expect = chai.expect;

describe("utl/domutl (browser only)", function () {
  describe("ajax", function () {
    it("should complain when presented with an invalid url ", function () {
      $.ajax(
        "invalid url",
        () => {
          expect("run").to.equal("not run");
        },
        (pArgument) => {
          expect(pArgument instanceof Error).to.be.true();
        }
      );
    });
    it("should run the ok function when presented with a valid url ", function () {
      $.ajax(
        "./utl/t_domutl.js",
        (pEvent) => {
          expect(pEvent instanceof Event).to.be.true();
          expect(pEvent.target.response).to.contain(
            "expect(pEvent.target.response).to.contain"
          );
        },
        () => {
          expect("run").to.equal("not run");
        }
      );
    });
  });
});
