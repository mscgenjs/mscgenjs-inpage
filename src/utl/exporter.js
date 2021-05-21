/* max length of an URL on github (4122)
 * "https://sverweij.github.io/".length (27) - 1
 */
let gMaxLocationLength = 4094;

function source2LocationString(pLocation, pSource, pLanguage) {
  return `${pLocation.pathname}?lang=${pLanguage}&msc=${encodeURIComponent(
    pSource
  )}`;
}

function sourceIsURLable(pLocation, pSource, pLanguage) {
  return (
    source2LocationString(pLocation, pSource, pLanguage).length <
    gMaxLocationLength
  );
}

module.exports = {
  toLocationString(pLocation, pSource, pLanguage) {
    let lSource = "# source too long for an URL";
    if (sourceIsURLable(pLocation, pSource, pLanguage)) {
      lSource = pSource;
    }
    return source2LocationString(pLocation, lSource, pLanguage);
  },
};
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
