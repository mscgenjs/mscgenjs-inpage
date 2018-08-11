if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    var exporter = require("../../utl/exporter");
    var chai = require("../../../node_modules/chai/chai");
    var assert = chai.assert;
    var gMsc = 'msc{a[label="💩"],b[label="序"],c [label="💩"]; a => b[label="things"], c => b;}';

    describe('utl/exporter', function(){
        describe('#toLocationString', function(){
            it('without extra parameters', function(){
                var lLocation = {
                    protocol: "http",
                    host: "localhost",
                    pathname: "mscgen_js/index.html"
                };
                assert.equal(
                    exporter.toLocationString(lLocation, gMsc, 'mscgen'),
                    'mscgen_js/index.html?lang=mscgen&msc=msc%7Ba%5Blabel%3D%22%F0%9F%92%A9%22%5D%2Cb%5Blabel%3D%22%E5%BA%8F%22%5D%2Cc%20%5Blabel%3D%22%F0%9F%92%A9%22%5D%3B%20a%20%3D%3E%20b%5Blabel%3D%22things%22%5D%2C%20c%20%3D%3E%20b%3B%7D'
                );


            });
            it('with a source that is too big (> 4k)', function(){
                var lLocation = {
                    protocol: "http",
                    host: "localhost",
                    pathname: "mscgen_js/index.html"
                };
                var l100wString = '# 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890';
                var lBig = l100wString;
                for (var i = 0; i < 40; i++){
                    lBig += l100wString;
                }
                assert.equal(
                    exporter.toLocationString(lLocation, lBig, 'mscgen'),
                    'mscgen_js/index.html?lang=mscgen&msc=%23%20source%20too%20long%20for%20an%20URL'
                );

            });
        });
    });
});

/* eslint max-len: 0 */
/* we can't really make these two long strings shorter without compromising readability */
