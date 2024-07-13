const chai = require("chai");
const tpl = require("../../src/utl/tpl");

const expect = chai.expect;
const CASES = [
  {
    title: "leaves strings without variables alone",
    input: {
      template: "template with no variables",
      args: {
        avariable: "replacement value",
      },
    },
    expected: "template with no variables",
  },
  {
    title: "replaces a variable",
    input: {
      template: "value of avariable: {avariable}",
      args: {
        avariable: "good value",
      },
    },
    expected: "value of avariable: good value",
  },
  {
    title: "replaces a variable when it occurs more than once",
    input: {
      template: "first time: {avariable}, second time: {avariable}",
      args: {
        avariable: "swell value",
      },
    },
    expected: "first time: swell value, second time: swell value",
  },
  {
    title: "does not barf on empty replacement value",
    input: {
      template: "expected between |{stuff-here}| to be empty",
      args: {
        "stuff-here": "",
      },
    },
    expected: "expected between || to be empty",
  },
  {
    title: "does not barf on unused arguments",
    input: {
      template: "unused stuff won't appear used {used}",
      args: {
        unused: "should not appear",
        used: "will appear",
      },
    },
    expected: "unused stuff won't appear used will appear",
  },
  {
    title: "does not barf on empty arguments",
    input: {
      template: "unused stuff won't appear used {used}",
      args: {},
    },
    expected: "unused stuff won't appear used {used}",
  },
  {
    title: "does not barf on unexisting arguments",
    input: {
      template: "unused stuff won't appear used {used}",
    },
    expected: "unused stuff won't appear used {used}",
  },
];

describe("utl/tpl", function () {
  describe("#applyTemplate", function () {
    CASES.forEach((pCase) => {
      it(pCase.title, function () {
        expect(
          tpl.applyTemplate(pCase.input.template, pCase.input.args),
        ).to.equal(pCase.expected);
      });
    });
  });
});
