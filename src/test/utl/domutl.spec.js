/* eslint max-nested-callbacks:[1,5], no-unused-expressions:0 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    "use strict";
    var $ = require("../../utl/domutl");
    var chai = require("../../../node_modules/chai/chai");
    var expect = chai.expect;

    describe('utl/domutl (browser only)', function() {
        describe('ajax', function(){
            it('should complain when presented with an invalid url ', function() {
                $.ajax('invalid url', function ok (){
                    expect('run').to.equal('not run');
                }, function notok(pArg){
                    expect(pArg instanceof Error).to.be.true;
                });
            });
            it('should run the ok function when presented with a valid url ', function() {
                $.ajax('./utl/t_domutl.js', function ok (pEvent){
                    expect(pEvent instanceof Event).to.be.true;
                    expect(pEvent.target.response).to.contain(
                        'expect(pEvent.target.response).to.contain'
                    );
                }, function notok(){
                    expect('run').to.equal('not run');
                });
            });
        });
    });
});
