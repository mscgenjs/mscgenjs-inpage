const mscparser = require("mscgenjs/dist/cjs/parse/xuparser");
const msgennyparser = require("mscgenjs/dist/cjs/parse/msgennyparser");
const renderast = require("mscgenjs/dist/cjs/render/graphics/renderast");

const config = require("./embedding/config");
const errorRendering = require("./embedding/error-rendering");
const $ = require("./utl/domutl");
const exporter = require("./utl/exporter");
const tpl = require("./utl/tpl");

const TPL_SPAN =
  "<span class='mscgen_js' {src} data-language='{lang}' " +
  "data-named-style='{namedStyle}' " +
  "data-regular-arc-text-vertical-alignment='{regularArcTextVerticalAlignment}' " +
  "{mirrorEntities}>{msc}<span>";
const TPL_SPAN_SOURCE = "data-src='{src}' ";
const TPL_ERROR_FILE_NOT_FOUND =
  "ERROR: Could not find or open the URL '{url}' specified in the <code>data-src</code> attribute.";
const TPL_ERR_FILE_LOADING_DISABLED =
  "ERROR: Won't load the chart specified in <code>data-src='{url}'</code>, " +
  "because loading from separate files is switched off in the mscgen_js " +
  "configuration. <br><br>See " +
  "<a href='https://sverweij.github.io/mscgen_js/embed.html#loading-from-separate-files'>" +
  "Loading charts from separate files</a> in the mscgen_js embedding " +
  "guide how to enable it.";

const MIME2LANG = Object.freeze({
  "text/x-mscgen": "mscgen",
  "text/x-msgenny": "msgenny",
  "text/x-xu": "xu",
});

function getLanguage(pElement) {
  /* the way to do it, but doesn't work in IE:
        lLanguage = pElement.dataset.language;
        */
  let lLanguage = pElement.getAttribute("data-language");
  if (!lLanguage) {
    lLanguage = config.getConfig().defaultLanguage;
  }
  return lLanguage;
}

function getAST(pText, pLanguage) {
  let lAST = {};
  try {
    if (pLanguage === "msgenny") {
      lAST = msgennyparser.parse(pText);
    } else if (pLanguage === "json") {
      lAST = JSON.parse(pText);
    } else {
      lAST = mscparser.parse(pText);
    }
  } catch (pError) {
    return pError;
  }
  return lAST;
}

function renderElementError(pElement, pString) {
  pElement.innerHTML = tpl.applyTemplate(
    "<div style='color: #d00'>{string}</div>",
    { string: pString }
  );
}

function setElementId(pElement, pIndex) {
  if (!pElement.id) {
    pElement.id = config.getConfig().parentElementPrefix + pIndex.toString();
  }
}

function renderLink(pSource, pLanguage, pId) {
  let lLocation = {
    pathname: "index.html",
  };

  let lLink = document.createElement("a");
  lLink.setAttribute(
    "href",
    config.getConfig().clickURL +
      exporter.toLocationString(lLocation, pSource, pLanguage)
  );
  lLink.setAttribute("id", `${pId}link`);
  lLink.setAttribute("style", "text-decoration: none;");
  lLink.setAttribute("title", "click to edit in the mscgen_js interpreter");
  return lLink;
}

function render(pAST, pElementId, pOptions) {
  // eslint-disable-next-line unicorn/prefer-query-selector
  let lElement = document.getElementById(pElementId);
  lElement.innerHTML = "";

  if (config.getConfig().clickable === true) {
    lElement.append(renderLink(pOptions.source, pOptions.language, pElementId));
    pElementId += "link";
  }
  renderast.clean(pElementId, window);
  renderast.render(pAST, window, pElementId, {
    source: pOptions.source,
    additionalTemplate: pOptions.namedStyle,
    mirrorEntitiesOnBottom: pOptions.mirrorEntities,
    regularArcTextVerticalAlignment: pOptions.regularArcTextVerticalAlignment,
  });
}

function getMirrorEntities(pElement) {
  let lMirrorEntities = pElement.getAttribute("data-mirror-entities");

  if (lMirrorEntities && lMirrorEntities === "true") {
    return true;
  }
  return false;
}

function getNamedStyle(pElement) {
  return pElement.getAttribute("data-named-style") || "basic";
}

function getVerticalAlignment(pElement) {
  return (
    pElement.getAttribute("data-regular-arc-text-vertical-alignment") ||
    "middle"
  );
}

function parseAndRender(pElement, pSource) {
  let lLanguage = getLanguage(pElement);
  let lAST = getAST(pSource, lLanguage);

  if (lAST.entities) {
    render(lAST, pElement.id, {
      source: pSource,
      language: lLanguage,
      mirrorEntities: getMirrorEntities(pElement),
      namedStyle: getNamedStyle(pElement),
      regularArcTextVerticalAlignment: getVerticalAlignment(pElement),
    });
  } else {
    pElement.innerHTML = errorRendering.renderError(
      pSource,
      lAST.location,
      lAST.message
    );
  }
}

function renderElement(pElement, pIndex) {
  setElementId(pElement, pIndex);
  pElement.dataset.renderedby = "mscgen_js";
  if (
    config.getConfig().loadFromSrcAttribute &&
    Boolean(pElement.getAttribute("data-src"))
  ) {
    $.ajax(
      pElement.getAttribute("data-src"),
      (pEvent) => {
        parseAndRender(pElement, pEvent.target.response);
      },
      () => {
        renderElementError(
          pElement,
          tpl.applyTemplate(TPL_ERROR_FILE_NOT_FOUND, {
            url: pElement.getAttribute("data-src"),
          })
        );
      }
    );
  } else if (
    !config.getConfig().loadFromSrcAttribute &&
    Boolean(pElement.getAttribute("data-src"))
  ) {
    renderElementError(
      pElement,
      tpl.applyTemplate(TPL_ERR_FILE_LOADING_DISABLED, {
        url: pElement.getAttribute("data-src"),
      })
    );
  } else {
    parseAndRender(pElement, pElement.textContent);
  }
}

function processElement(pElement, pIndex) {
  if (!pElement.hasAttribute("data-renderedby")) {
    renderElement(pElement, pIndex);
  }
}

function processScriptElements() {
  let lScripts = document.scripts;

  for (const lScript of lScripts) {
    if (
      Boolean(MIME2LANG[lScript.type]) &&
      !lScript.hasAttribute("data-renderedby")
    ) {
      lScript.insertAdjacentHTML(
        "afterend",
        tpl.applyTemplate(TPL_SPAN, {
          src: lScript.src
            ? tpl.applyTemplate(TPL_SPAN_SOURCE, { src: lScript.src })
            : "",
          lang: MIME2LANG[lScript.type] || config.getConfig().defaultLanguage,
          msc: lScript.textContent.replace(/</g, "&lt;"),
          mirrorEntities: getMirrorEntities(lScript)
            ? "data-mirror-entities='true'"
            : "",
          namedStyle: getNamedStyle(lScript),
          regularArcTextVerticalAlignment: getVerticalAlignment(lScript),
        })
      );
      lScript.dataset.renderedby = "mscgen_js";
    }
  }
}

function renderElementArray(pMscGenElements, pStartIdAt) {
  // eslint-disable-next-line budapestian/local-variable-pattern
  for (const [lIndex, pMscGenElement] of pMscGenElements.entries()) {
    processElement(pMscGenElement, pStartIdAt + lIndex);
  }
}

function start() {
  processScriptElements();

  let lClassElements = document.querySelectorAll(".mscgen_js");
  renderElementArray(lClassElements, 0);
  renderElementArray(
    document.querySelectorAll("mscgen"),
    lClassElements.length
  );
}

start();

/* eslint security/detect-object-injection: 0 */
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
