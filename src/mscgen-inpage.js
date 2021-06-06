const mscparser = require("mscgenjs/dist/cjs/parse/xuparser");
const msgennyparser = require("mscgenjs/dist/cjs/parse/msgennyparser");
const renderast = require("mscgenjs/dist/cjs/render/graphics/renderast");

const config = require("./embedding/config");
const errorRendering = require("./embedding/error-rendering");
const exporter = require("./utl/exporter");

const ERR_FILE_LOADING_DISABLED =
  "ERROR: Won't load the chart specified,\n" +
  "because loading from separate files is switched off in the mscgen_js " +
  "configuration. \n\nSee " +
  "https://sverweij.github.io/mscgen_js/embed.html#loading-from-separate-files " +
  "how to enable it.";

const MIME2LANG = Object.freeze({
  "text/x-mscgen": "mscgen",
  "text/x-msgenny": "msgenny",
  "text/x-xu": "xu",
});

function getLanguage(pElement) {
  let lLanguage =
    pElement.dataset.language || MIME2LANG[pElement.getAttribute("type")];
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
  const lElement = document.createElement("pre");

  lElement.setAttribute("style", "color: #d00");
  lElement.textContent = pString;
  pElement.replaceChildren(lElement);
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

  return lMirrorEntities && lMirrorEntities === "true";
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

function parseAndRender(
  pRenderElement,
  pSource,
  pSourceElement = pRenderElement
) {
  let lLanguage = getLanguage(pSourceElement);
  let lAST = getAST(pSource, lLanguage);

  if (lAST.entities) {
    render(lAST, pRenderElement.id, {
      source: pSource,
      language: lLanguage,
      mirrorEntities: getMirrorEntities(pSourceElement),
      namedStyle: getNamedStyle(pSourceElement),
      regularArcTextVerticalAlignment: getVerticalAlignment(pSourceElement),
    });
  } else {
    pRenderElement.innerHTML = errorRendering.renderError(
      pSource,
      lAST.location,
      lAST.message
    );
  }
}

function getResponseStatus(pResponse) {
  if (pResponse.ok) {
    return Promise.resolve(pResponse);
  } else {
    return Promise.reject(new Error(`ERROR: ${pResponse.statusText}`));
  }
}

function getResponseText(pResponse) {
  return pResponse.text();
}

function getSourceAttribute(pElement) {
  return pElement.getAttribute("data-src") || pElement.getAttribute("src");
}

function getElementSource(pScript) {
  const lSourceURL = getSourceAttribute(pScript);

  if (lSourceURL) {
    //  deepcode ignore Ssrf: false positive. This is not server side. It's als not 'flowing in here from an exception on line 41'
    return fetch(lSourceURL).then(getResponseStatus).then(getResponseText);
  } else {
    return new Promise((pResolve, pReject) => {
      if (pScript.textContent) {
        pResolve(pScript.textContent);
      } else {
        pReject(new Error("ERROR: this element doesn't contain any text"));
      }
    });
  }
}

function renderElement(
  pSourceElement,
  pIndex,
  pRenderElement = pSourceElement
) {
  pSourceElement.dataset.renderedby = "mscgen_js";
  if (
    !config.getConfig().loadFromSrcAttribute &&
    Boolean(getSourceAttribute(pSourceElement))
  ) {
    renderElementError(pRenderElement, ERR_FILE_LOADING_DISABLED);
  } else {
    setElementId(pRenderElement, pIndex);
    getElementSource(pSourceElement)
      .then((pSource) => {
        parseAndRender(pRenderElement, pSource, pSourceElement);
      })
      .catch((pError) => {
        renderElementError(pRenderElement, pError.message);
      });
  }
}

function processElement(pElement, pIndex) {
  if (!pElement.dataset.renderedby) {
    // you can render inside a script element, but it won't become
    // visible any time soon. Workaround: insert a span and render
    // in there.
    if (pElement.tagName === "SCRIPT") {
      let lRenderElement = document.createElement("span");

      pElement.after(lRenderElement);
      renderElement(pElement, pIndex, lRenderElement);
    } else {
      renderElement(pElement, pIndex);
    }
  }
}

function getId() {
  const lSomeBigNumber = 1000000000;
  return Math.round(lSomeBigNumber * Math.random());
}

function renderElementArray(pMscGenElements) {
  pMscGenElements.forEach((pMscGenElement) => {
    processElement(pMscGenElement, getId());
  });
}

function observerCallback(pEntries) {
  pEntries.forEach((pEntry) => {
    if (pEntry.isIntersecting) {
      const lElement = pEntry.target.nextElementSibling;
      processElement(lElement, getId());
    }
  });
}

// historically we used any element with a mscgen_js class,
// later on we added the wikimedia style mscgen tag and
// even later the script one, because they looked snazzy:
const ELEMENTS_TO_RENDER = [
  ...[...document.querySelectorAll(".mscgen_js")],
  ...[...document.scripts].filter((pScript) =>
    Boolean(MIME2LANG[pScript.type])
  ),
  ...[...document.querySelectorAll("mscgen")],
];

const OBSERVER = new IntersectionObserver(observerCallback, {
  rootMargin: "100% 0% 100% 0%",
});

ELEMENTS_TO_RENDER.forEach((pElement) => {
  // scripts are not visible, hence observing them for visibility
  // is doing nothing. Workaround: insert a marker element right
  // before it that _is_ visible, and observe that.
  const lMarker = document.createElement("mscgenjs-marker");
  pElement.before(lMarker);

  OBSERVER.observe(lMarker);
});

// Observer trickery, of course, is nice, but when you print a page
// you want all of the graphs to show up anyway. This ensures that
// that indeed happens at the right time:
window.addEventListener("beforeprint", () => {
  renderElementArray(ELEMENTS_TO_RENDER);
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
