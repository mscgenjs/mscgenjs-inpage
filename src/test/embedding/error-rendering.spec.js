/* eslint no-undefined: 0, max-len: 0 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["../../embedding/error-rendering", "../../../node_modules/chai/chai"], function(err, chai) {
    var expect = chai.expect;
    var assert = chai.assert;

    describe('embedding/error-rendering', function() {
        describe('#renderError', function() {
            it('should render error and source without underline when error location not provided', function() {
                expect(
                    err.renderError("Just a source\nwith two lines", undefined, "just a message")
                ).to.equal(
                    "<pre><div style='color: #d00'># ERROR just a message</div>  1 Just a source\n  2 with two lines\n</pre>"
                );
            });

            it('should render error and source with underline when error location provided', function() {
                var lErrorLocation = {
                    start: {
                        line: 2,
                        column: 6
                    }
                };
                expect(err.renderError("Just a source\nwith two lines", lErrorLocation, "just a message")).to.equal(
                    "<pre><div style='color: #d00'># ERROR on line 2, column 6 - just a message</div>  1 Just a source\n<mark>  2 with <span style='text-decoration:underline'>t</span>wo lines\n</mark></pre>"
                );
            });
        });

        describe('#deHTMLize() - ', function(){
            it("replaces < with &lt;", function(){
                expect(err.deHTMLize("<")).to.equal("&lt;");
            });
            it("replaces all < with &lt;", function() {
                expect(err.deHTMLize("<bla>hello</bla>")).to.equal("&lt;bla>hello&lt;/bla>");
            });
            it("leaves strings without < alone", function() {
                expect(
                    err.deHTMLize(
                        "In Dutch, Huey, Louis and Dewy translate => Kwik, Kwek en Kwak"
                    )
                ).to.equal(
                    "In Dutch, Huey, Louis and Dewy translate => Kwik, Kwek en Kwak"
                );
            });
        });

        describe('#formatNumber() - ', function() {
            it('puts two spaces in front of a single digit on max width 3', function() {
                assert.equal(err.formatNumber(7, 3), "  7");
            });
            it('puts no spaces in front of a single digit on max width 1', function() {
                assert.equal(err.formatNumber(7, 1), "7");
            });
            it('puts no spaces in front of a single digit on max width 0', function() {
                assert.equal(err.formatNumber(7, 0), "7");
            });
            it('puts no spaces in front of a single digit on max width < 0', function() {
                assert.equal(err.formatNumber(7, -8), "7");
            });
            it('puts no spaces in front of a three digit number on max width 3', function() {
                assert.equal(err.formatNumber(481, 3), "481");
            });
        });

    });
});
