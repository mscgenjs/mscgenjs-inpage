/* eslint max-params: 0 */
require(["lib/mscgenjs-core/parse/xuparser",
         "lib/mscgenjs-core/parse/msgennyparser",
         "lib/mscgenjs-core/render/graphics/renderast",
         "utl/exporter",
         "embedding/config",
         "embedding/error-rendering",
         "utl/domutl",
         "utl/tpl"],
function(mscparser, msgennyparser, mscrender, exp, conf, err, $, tpl) {
    "use strict";

    var TPL_SPAN = "<span class='mscgen_js' {src} data-language='{lang}' " +
                   "data-named-style='{namedStyle}' {mirrorEntities}>{msc}<span>";
    var TPL_SPAN_SRC = "data-src='{src}' ";
    var TPL_ERR_FILE_NOT_FOUND =
"ERROR: Could not find or open the URL '{url}' specified in the <code>data-src</code> attribute.";
    var TPL_ERR_FILE_LOADING_DISABLED =
"ERROR: Won't load the chart specified in <code>data-src='{url}'</code>, " +
"because loading from separate files is switched off in the mscgen_js " +
"configuration. <br><br>See " +
"<a href='https://sverweij.github.io/mscgen_js/embed.html#loading-from-separate-files'>" +
"Loading charts from separate files</a> in the mscgen_js embedding " +
"guide how to enable it."
;
    var MIME2LANG = {
        "text/x-mscgen"  : "mscgen",
        "text/x-msgenny" : "msgenny",
        "text/x-xu"      : "xu"
    };

    start();

    function start() {
        processScriptElements();

        var lClassElements = document.getElementsByClassName("mscgen_js");
        renderElementArray(lClassElements, 0);
        renderElementArray(document.getElementsByTagName("mscgen"), lClassElements.length);
    }

    function processScriptElements() {
        var lScripts = document.scripts;

        for (var i = 0; i < lScripts.length; i++){
            if (!!(MIME2LANG[lScripts[i].type]) && !lScripts[i].hasAttribute("data-renderedby")){
                lScripts[i].insertAdjacentHTML(
                    "afterend",
                    tpl.applyTemplate(
                        TPL_SPAN, {
                            src: lScripts[i].src ? tpl.applyTemplate(TPL_SPAN_SRC, {src: lScripts[i].src}) : "",
                            lang: MIME2LANG[lScripts[i].type] || conf.getConfig().defaultLanguage,
                            msc: lScripts[i].textContent.replace(/</g, "&lt;"),
                            mirrorEntities: getMirrorEntities(lScripts[i]) ? "data-mirror-entities='true'" : "",
                            namedStyle: getNamedStyle(lScripts[i])
                        }
                    )
                );
                lScripts[i].setAttribute("data-renderedby", "mscgen_js");
            }
        }
    }

    function renderElementArray(pMscGenElements, pStartIdAt){
        for (var i = 0; i < pMscGenElements.length; i++) {
            processElement(pMscGenElements[i], pStartIdAt + i);
        }
    }

    function processElement(pElement, pIndex) {
        if (!pElement.hasAttribute('data-renderedby')) {
            renderElement(pElement, pIndex);
        }
    }

    function renderElementError(pElement, pString) {
        pElement.innerHTML =
            tpl.applyTemplate(
                "<div style='color: red'>{string}</div>",
                {string:pString}
            );
    }

    function renderElement (pElement, pIndex){
        setElementId(pElement, pIndex);
        pElement.setAttribute("data-renderedby", "mscgen_js");
        if (conf.getConfig().loadFromSrcAttribute && !!pElement.getAttribute("data-src")){
            $.ajax(
                pElement.getAttribute("data-src"),
                function onSuccess(pEvent) {
                    parseAndRender(pElement, pEvent.target.response);
                },
                function onError() {
                    renderElementError(
                        pElement,
                        tpl.applyTemplate(
                            TPL_ERR_FILE_NOT_FOUND,
                            {url: pElement.getAttribute("data-src")}
                        )
                    );
                }
            );
        } else if (!conf.getConfig().loadFromSrcAttribute && !!pElement.getAttribute("data-src")){
            renderElementError(
                pElement,
                tpl.applyTemplate(
                    TPL_ERR_FILE_LOADING_DISABLED,
                    {url: pElement.getAttribute("data-src")}
                )
            );
        } else {
            parseAndRender(pElement, pElement.textContent);
        }
    }

    function parseAndRender(pElement, pSource){
        var lLanguage = getLanguage(pElement);
        var lAST      = getAST(pSource, lLanguage);

        if (lAST.entities) {
            render(
                lAST,
                pElement.id,
                pSource,
                lLanguage,
                getMirrorEntities(pElement),
                getNamedStyle(pElement)
            );
        } else {
            pElement.innerHTML = err.renderError(pSource, lAST.location, lAST.message);
        }
    }

    function renderLink(pSource, pLanguage, pId){
        var lLocation = {
            pathname: "index.html"
        };

        var lLink = document.createElement("a");
        lLink.setAttribute(
            "href",
            conf.getConfig().clickURL + exp.toLocationString(lLocation, pSource, pLanguage)
        );
        lLink.setAttribute("id", pId + "link");
        lLink.setAttribute("style", "text-decoration: none;");
        lLink.setAttribute("title", "click to edit in the mscgen_js interpreter");
        return lLink;
    }

    function setElementId(pElement, pIndex) {
        if (!pElement.id) {
            pElement.id = conf.getConfig().parentElementPrefix + pIndex.toString();
        }
    }

    function getLanguage(pElement) {
        /* the way to do it, but doesn't work in IE:
           lLanguage = pElement.dataset.language;
         */
        var lLanguage = pElement.getAttribute('data-language');
        if (!lLanguage) {
            lLanguage = conf.getConfig().defaultLanguage;
        }
        return lLanguage;
    }

    function getMirrorEntities(pElement) {
        var lMirrorEntities = pElement.getAttribute('data-mirror-entities');

        if (lMirrorEntities && lMirrorEntities === "true") {
            return true;
        }
        return false;
    }

    function getNamedStyle(pElement) {
        return pElement.getAttribute('data-named-style');
    }

    function getAST(pText, pLanguage) {
        var lAST = {};
        try {
            if ("msgenny" === pLanguage) {
                lAST = msgennyparser.parse(pText);
            } else if ("json" === pLanguage) {
                lAST = JSON.parse(pText);
            } else {
                lAST = mscparser.parse(pText);
            }
        } catch (e) {
            return e;
        }
        return lAST;
    }

    function render(pAST, pElementId, pSource, pLanguage, pMirrorEntities, pNamedStyle) {
        var lElement = document.getElementById(pElementId);
        lElement.innerHTML = "";

        if (true === conf.getConfig().clickable){
            lElement.appendChild(renderLink(pSource, pLanguage, pElementId));
            pElementId += "link";
        }
        mscrender.clean(pElementId, window);
        mscrender.renderASTNew(
            pAST,
            window,
            pElementId,
            {
                source                 : pSource,
                additionalTemplate     : pNamedStyle,
                mirrorEntitiesOnBottom : pMirrorEntities
            }
        );
    }

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
