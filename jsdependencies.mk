
# DO NOT DELETE THIS LINE -- js-makedepend depends on it.

# amd dependencies
src/embedding/error-rendering.js: \
	src/utl/tpl.js

src/lib/mscgenjs-core/parse/msgennyparser.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/parse/parserHelpers.js

src/lib/mscgenjs-core/parse/xuparser.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/parse/parserHelpers.js

src/lib/mscgenjs-core/render/astmassage/flatten.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/astmassage/asttransform.js \
	src/lib/mscgenjs-core/render/astmassage/normalizekind.js \
	src/lib/mscgenjs-core/render/astmassage/normalizeoptions.js \
	src/lib/mscgenjs-core/render/textutensils/escape.js

src/lib/mscgenjs-core/render/astmassage/normalizeoptions.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js

src/lib/mscgenjs-core/render/graphics/entities.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js

src/lib/mscgenjs-core/render/graphics/renderlabels.js: \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/kind2class.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js \
	src/lib/mscgenjs-core/render/textutensils/wrap.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/straight.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/wobbly.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/straight.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/variationhelpers.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/domprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/getdiagonalangle.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/round.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/wobbly.js: \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/variationhelpers.js

src/lib/mscgenjs-core/render/graphics/svgutensils.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js

src/lib/mscgenjs-core/render/graphics/markermanager.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/astmassage/normalizekind.js

src/lib/mscgenjs-core/render/graphics/renderast.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/astmassage/flatten.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/entities.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/kind2class.js \
	src/lib/mscgenjs-core/render/graphics/markermanager.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/renderskeleton.js \
	src/lib/mscgenjs-core/render/graphics/renderutensils.js \
	src/lib/mscgenjs-core/render/graphics/rowmemory.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js

src/lib/mscgenjs-core/render/graphics/renderskeleton.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/csstemplates.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js

src/lib/mscgenjs-core/render/graphics/renderutensils.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js

src/mscgen-inpage.js: \
	src/embedding/config.js \
	src/embedding/error-rendering.js \
	src/lib/mscgenjs-core/parse/msgennyparser.js \
	src/lib/mscgenjs-core/parse/xuparser.js \
	src/lib/mscgenjs-core/render/graphics/renderast.js \
	src/utl/domutl.js \
	src/utl/exporter.js \
	src/utl/tpl.js

src/test/embedding/config.spec.js: \
	src/embedding/config.js

src/test/embedding/error-rendering.spec.js: \
	src/embedding/error-rendering.js

src/test/utl/domutl.spec.js: \
	src/utl/domutl.js

src/test/utl/exporter.spec.js: \
	src/utl/exporter.js

src/test/utl/tpl.spec.js: \
	src/utl/tpl.js

# cjs dependencies
src/lib/mscgenjs-core/parse/msgennyparser.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/parse/parserHelpers.js

src/lib/mscgenjs-core/parse/xuparser.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/parse/parserHelpers.js

src/lib/mscgenjs-core/render/astmassage/flatten.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/astmassage/asttransform.js \
	src/lib/mscgenjs-core/render/astmassage/normalizekind.js \
	src/lib/mscgenjs-core/render/astmassage/normalizeoptions.js \
	src/lib/mscgenjs-core/render/textutensils/escape.js

src/lib/mscgenjs-core/render/astmassage/normalizeoptions.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js

src/lib/mscgenjs-core/render/graphics/entities.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js

src/lib/mscgenjs-core/render/graphics/renderlabels.js: \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/kind2class.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js \
	src/lib/mscgenjs-core/render/textutensils/wrap.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/straight.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/wobbly.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/straight.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/variationhelpers.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/domprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/getdiagonalangle.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/round.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory/wobbly.js: \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/variationhelpers.js

src/lib/mscgenjs-core/render/graphics/svgutensils.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js

src/lib/mscgenjs-core/render/graphics/markermanager.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/astmassage/normalizekind.js

src/lib/mscgenjs-core/render/graphics/renderast.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/astmassage/flatten.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/entities.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/kind2class.js \
	src/lib/mscgenjs-core/render/graphics/markermanager.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/renderskeleton.js \
	src/lib/mscgenjs-core/render/graphics/renderutensils.js \
	src/lib/mscgenjs-core/render/graphics/rowmemory.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js

src/lib/mscgenjs-core/render/graphics/renderskeleton.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/csstemplates.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js

src/lib/mscgenjs-core/render/graphics/renderutensils.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js

# amd dependencies
EMBED_JS_SOURCES=src/mscgen-inpage.js \
	src/embedding/config.js \
	src/embedding/error-rendering.js \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/parse/msgennyparser.js \
	src/lib/mscgenjs-core/parse/parserHelpers.js \
	src/lib/mscgenjs-core/parse/xuparser.js \
	src/lib/mscgenjs-core/render/astmassage/aggregatekind.js \
	src/lib/mscgenjs-core/render/astmassage/asttransform.js \
	src/lib/mscgenjs-core/render/astmassage/flatten.js \
	src/lib/mscgenjs-core/render/astmassage/normalizekind.js \
	src/lib/mscgenjs-core/render/astmassage/normalizeoptions.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/csstemplates.js \
	src/lib/mscgenjs-core/render/graphics/entities.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/kind2class.js \
	src/lib/mscgenjs-core/render/graphics/markermanager.js \
	src/lib/mscgenjs-core/render/graphics/renderast.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/renderskeleton.js \
	src/lib/mscgenjs-core/render/graphics/renderutensils.js \
	src/lib/mscgenjs-core/render/graphics/rowmemory.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/domprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/getdiagonalangle.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/index.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/round.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/straight.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/svgprimitives.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/variationhelpers.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory/wobbly.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js \
	src/lib/mscgenjs-core/render/textutensils/escape.js \
	src/lib/mscgenjs-core/render/textutensils/wrap.js \
	src/utl/domutl.js \
	src/utl/exporter.js \
	src/utl/tpl.js
