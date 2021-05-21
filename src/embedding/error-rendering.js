const tpl = require("../utl/tpl");

const TPL_ERROR_LINENO =
  "<pre><div style='color: #d00'># ERROR on line {line}, column {col} - {message}</div>";
const TPL_ERROR = "<pre><div style='color: #d00'># ERROR {message}</div>";
const TPL_MARKED_LINE = "<mark>{line}\n</mark>";
const TPL_UNDERLINED_CHAR =
  "<span style='text-decoration:underline'>{char}</span>";
const MAX_NUMBER_WIDTH = 3;

/**
 * Given a Number, emits a String with that number in, left padded so the
 * string is pMaxWidth long. If the number doesn't fit within pMaxWidth
 * characters, just returns a String with that number in it
 *
 * @param {number} pNumber
 * @param {number} pMaxWidth
 * @return {string} - the formatted number
 */
function formatNumber(pNumber, pMaxWidth) {
  let lReturnValue = pNumber.toString();
  let lPosLeft = pMaxWidth - lReturnValue.length;
  // eslint-disable-next-line no-plusplus
  for (let lIndex = 0; lIndex < lPosLeft; lIndex++) {
    lReturnValue = ` ${lReturnValue}`;
  }
  return lReturnValue;
}

function formatLine(pLine, pLineNo) {
  return `${formatNumber(pLineNo, MAX_NUMBER_WIDTH)} ${pLine}`;
}

/**
 * returns a 'sanitized' version of the passed
 * string. Sanitization is <em>very barebones</em> at the moment
 * - it replaces < by &lt; so the browser won't start interpreting it
 * as html. I'd rather use something standard for this, but haven't
 * found it yet...
 */
function deZALGΌtheBlackPonyLord(pString) {
  return pString.replace(/</g, "&lt;");
}

function underlineCol(pLine, pCol) {
  return pLine.split("").reduce((pPrevious, pChar, pIndex) => {
    if (pIndex === pCol) {
      return (
        pPrevious +
        tpl.applyTemplate(TPL_UNDERLINED_CHAR, {
          char: deZALGΌtheBlackPonyLord(pChar),
        })
      );
    }
    return pPrevious + deZALGΌtheBlackPonyLord(pChar);
  }, "");
}

module.exports = {
  formatNumber,
  deHTMLize: deZALGΌtheBlackPonyLord,
  renderError: function renderError(pSource, pErrorLocation, pMessage) {
    let lErrorIntro = pErrorLocation
      ? tpl.applyTemplate(TPL_ERROR_LINENO, {
          message: pMessage,
          line: pErrorLocation.start.line,
          col: pErrorLocation.start.column,
        })
      : tpl.applyTemplate(TPL_ERROR, {
          message: pMessage,
        });

    return `${pSource.split("\n").reduce((pPrevious, pLine, pIndex) => {
      if (Boolean(pErrorLocation) && pIndex === pErrorLocation.start.line - 1) {
        return (
          pPrevious +
          tpl.applyTemplate(TPL_MARKED_LINE, {
            line: formatLine(
              underlineCol(pLine, pErrorLocation.start.column - 1),
              pIndex + 1
            ),
          })
        );
      }
      return `${
        pPrevious + deZALGΌtheBlackPonyLord(formatLine(pLine, pIndex + 1))
      }\n`;
    }, lErrorIntro)}</pre>`;
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
