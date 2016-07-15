if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["../../embedding/config", "../../../node_modules/chai/chai"], function(conf, chai) {
    "use strict";
    var expect = chai.expect;

    function getGlobal(){
        if (typeof global === "undefined"){
            return window;
        } else {
            return global;
        }
    }

    describe('embedding/embed-config', function() {
        describe('#getConfig - merges with the global mscgen_js_config', function() {

            it('should return the default configuration when no global mscgen_js_config is present', function() {
                expect(conf.getConfig()).to.deep.equal(
                    {
                        defaultLanguage : "mscgen",
                        parentElementPrefix : "mscgen_js-parent_",
                        clickable : false,
                        clickURL : "https://sverweij.github.io/mscgen_js/",
                        loadFromSrcAttribute: false
                    });
            });

            it('should return a changed configuration when a mscgen_js_config is present', function(){
                var lGlobal = getGlobal();

                lGlobal.mscgen_js_config = {
                    clickable: true,
                    clickURL: "http://localhost/"
                };
                expect(conf.getConfig()).to.deep.equal(
                    {
                        defaultLanguage : "mscgen",
                        parentElementPrefix : "mscgen_js-parent_",
                        clickable : true,
                        clickURL : "http://localhost/",
                        loadFromSrcAttribute: false
                    });
                delete lGlobal.mscgen_js_config;
            });
        });
    });
});
