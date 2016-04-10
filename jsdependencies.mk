
# DO NOT DELETE THIS LINE -- js-makedepend depends on it.

# amd dependencies
src/embedding/error-rendering.js: \
	src/utl/tpl.js

src/lib/mscgenjs-core/render/graphics/entities.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js

src/lib/mscgenjs-core/render/graphics/markermanager.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/text/arcmappings.js

src/lib/mscgenjs-core/render/graphics/renderast.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/entities.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/markermanager.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/renderskeleton.js \
	src/lib/mscgenjs-core/render/graphics/renderutensils.js \
	src/lib/mscgenjs-core/render/graphics/rowmemory.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory.js \
	src/lib/mscgenjs-core/render/graphics/svglowlevelfactory.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js \
	src/lib/mscgenjs-core/render/graphics/swap.js \
	src/lib/mscgenjs-core/render/text/arcmappings.js \
	src/lib/mscgenjs-core/render/text/flatten.js

src/lib/mscgenjs-core/render/graphics/renderlabels.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js \
	src/lib/mscgenjs-core/render/text/arcmappings.js \
	src/lib/mscgenjs-core/render/text/textutensils.js

src/lib/mscgenjs-core/render/graphics/renderskeleton.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/csstemplates.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory.js

src/lib/mscgenjs-core/render/graphics/svgelementfactory.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/geometry.js \
	src/lib/mscgenjs-core/render/graphics/svglowlevelfactory.js

src/lib/mscgenjs-core/render/graphics/svglowlevelfactory.js: \
	src/lib/mscgenjs-core/render/graphics/constants.js

src/lib/mscgenjs-core/render/graphics/svgutensils.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory.js \
	src/lib/mscgenjs-core/render/graphics/svglowlevelfactory.js

src/lib/mscgenjs-core/render/text/flatten.js: \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/render/text/arcmappings.js \
	src/lib/mscgenjs-core/render/text/asttransform.js \
	src/lib/mscgenjs-core/render/text/textutensils.js

src/mscgen-inpage.js: \
	src/embedding/config.js \
	src/embedding/error-rendering.js \
	src/lib/mscgenjs-core/parse/msgennyparser.js \
	src/lib/mscgenjs-core/parse/xuparser.js \
	src/lib/mscgenjs-core/render/graphics/renderast.js \
	src/utl/domutl.js \
	src/utl/exporter.js \
	src/utl/tpl.js

src/test/embedding/t_config.js: \
	src/embedding/config.js

src/test/embedding/t_error-rendering.js: \
	src/embedding/error-rendering.js

src/test/utl/t_domutl.js: \
	src/utl/domutl.js

src/test/utl/t_exporter.js: \
	src/utl/exporter.js

src/test/utl/t_tpl.js: \
	src/utl/tpl.js

# cjs dependencies
# amd dependencies
EMBED_JS_SOURCES=src/mscgen-inpage.js \
	src/embedding/config.js \
	src/embedding/error-rendering.js \
	src/lib/mscgenjs-core/lib/lodash/lodash.custom.js \
	src/lib/mscgenjs-core/parse/msgennyparser.js \
	src/lib/mscgenjs-core/parse/xuparser.js \
	src/lib/mscgenjs-core/render/graphics/constants.js \
	src/lib/mscgenjs-core/render/graphics/csstemplates.js \
	src/lib/mscgenjs-core/render/graphics/entities.js \
	src/lib/mscgenjs-core/render/graphics/geometry.js \
	src/lib/mscgenjs-core/render/graphics/idmanager.js \
	src/lib/mscgenjs-core/render/graphics/markermanager.js \
	src/lib/mscgenjs-core/render/graphics/renderast.js \
	src/lib/mscgenjs-core/render/graphics/renderlabels.js \
	src/lib/mscgenjs-core/render/graphics/renderskeleton.js \
	src/lib/mscgenjs-core/render/graphics/renderutensils.js \
	src/lib/mscgenjs-core/render/graphics/rowmemory.js \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory.js \
	src/lib/mscgenjs-core/render/graphics/svglowlevelfactory.js \
	src/lib/mscgenjs-core/render/graphics/svgutensils.js \
	src/lib/mscgenjs-core/render/graphics/swap.js \
	src/lib/mscgenjs-core/render/text/arcmappings.js \
	src/lib/mscgenjs-core/render/text/asttransform.js \
	src/lib/mscgenjs-core/render/text/flatten.js \
	src/lib/mscgenjs-core/render/text/textutensils.js \
	src/utl/domutl.js \
	src/utl/exporter.js \
	src/utl/tpl.js
