/* global mscgen_js_config */

var gConfig = {
  defaultLanguage: 'mscgen',
  parentElementPrefix: 'mscgen_js-parent_',
  clickable: false,
  clickURL: 'https://sverweij.github.io/mscgen_js/',
  loadFromSrcAttribute: false
}

function mergeConfig (pConfigBase, pConfigToMerge) {
  Object.getOwnPropertyNames(pConfigToMerge).forEach(function (pAttribute) {
    pConfigBase[pAttribute] = pConfigToMerge[pAttribute]
  })
}

module.exports = {
  getConfig: function () {
    if (typeof (mscgen_js_config) !== 'undefined' && mscgen_js_config &&
            typeof (mscgen_js_config) === 'object') {
      mergeConfig(gConfig, mscgen_js_config)
    }
    return gConfig
  }
}
/* eslint security/detect-object-injection: 0, camelcase: 0 */
/* We're good here with object injection stuff; the attributes are not passed from the outside */
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
