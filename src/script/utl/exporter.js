/* jshint nonstandard:true */
/* jshint browser: true */ // for btoa. Alternative: https://github.com/node-browser-compat/btoa/blob/master/index.js
/* jshint node: true */

/* istanbul ignore else */
if ( typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {
    "use strict";

    var MAX_LOCATION_LENGTH = 4094;// max length of an URL on github (4122) - "https://sverweij.github.io/".length (27) - 1

    function source2LocationString(pLocation, pSource, pLanguage){
        return pLocation.pathname +
                '?lang=' + pLanguage +
                '&msc=' + encodeURIComponent(pSource);
    }

    function sourceIsURLable(pLocation, pSource, pLanguage){
        return source2LocationString(pLocation, pSource, pLanguage).length < MAX_LOCATION_LENGTH;
    }

    return {
        toLocationString: function (pLocation, pSource, pLanguage) {
            var lSource = '# source too long for an URL';
            if (sourceIsURLable(pLocation, pSource, pLanguage)) {
                lSource = pSource;
            }
            return source2LocationString(pLocation, lSource, pLanguage);
        }
    };
});
/*
 This file is part of mscgen_js.

 mscgen_js is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 mscgen_js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with mscgen_js.  If not, see <http://www.gnu.org/licenses/>.
 */
