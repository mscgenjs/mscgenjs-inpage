
.SUFFIXES: .js .pegjs .css .html .msc .mscin .msgenny .svg .png .jpg
RJS=node_modules/requirejs/bin/r.js
GIT=git
GIT_DEPLOY_FROM_BRANCH=master
SEDVERSION=utl/sedversion.sh
NPM=npm
BOWER=node_modules/bower/bin/bower
MAKEDEPEND=node_modules/.bin/js-makedepend --output-to jsdependencies.mk --exclude "node_modules"
MINIFY=node_modules/.bin/uglifyjs
ISTANBUL=node_modules/.bin/istanbul

BUILDDIR=dist
PRODDIRS=$(BUILDDIR)
MSCGENJS_CORE_ROOT=node_modules/mscgenjs
MSCGENJS_LIBDIRS=src/lib/mscgenjs-core/parse \
	src/lib/mscgenjs-core/render/graphics \
	src/lib/mscgenjs-core/render/text \
	src/lib/mscgenjs-core/lib/lodash
LIBDIRS=$(MSCGENJS_LIBDIRS)
INSTRUMENTATION_DIR=istanbul-instrumented
COVERAGE_REPORT_DIR=coverage

.PHONY: help dev-build install deploy-gh-pages check stylecheck fullcheck mostlyclean clean noconsolestatements consolecheck lint cover prerequisites report test update-dependencies run-update-dependencies depend bower-package

help:
	@echo " --------------------------------------------------------"
	@echo "| Just downloaded the mscgen_js sources?                 |"
	@echo "|  First run 'make prerequisites'                        |"
	@echo " --------------------------------------------------------"
	@echo
	@echo "Most important build targets:"
	@echo
	@echo "install"
	@echo " -> this is probably the target you want when"
	@echo "    hosting mscgen_js"
	@echo
	@echo " creates the production version (minified js)"
	@echo
	@echo "check"
	@echo " runs the linter and executes all unit tests"
	@echo
	@echo "clean"
	@echo " removes everything created by either install or dev-build"
	@echo
	@echo "update-dependencies"
	@echo " updates all (node) module dependencies in package.json"
	@echo " installs them, rebuilds all generated sources and runs"
	@echo " all tests."
	@echo
	@echo " --------------------------------------------------------"
	@echo "| More information and other targets: see wikum/build.md |"
	@echo " --------------------------------------------------------"
	@echo

# production rules
$(PRODDIRS):
	mkdir -p $@

$(LIBDIRS):
	mkdir -p $@

bower_components/canvg-gabelerner/%.js:
	$(BOWER) install

src/lib/require.js: node_modules/requirejs/require.js
	$(MINIFY) $< -m -c > $@

src/lib/mscgenjs-core/render/graphics/%.js: $(MSCGENJS_CORE_ROOT)/render/graphics/%.js $(MSCGENJS_LIBDIRS)
	cp $< $@

src/lib/mscgenjs-core/render/text/%.js: $(MSCGENJS_CORE_ROOT)/render/text/%.js $(MSCGENJS_LIBDIRS)
	cp $< $@

src/lib/mscgenjs-core/parse/%.js: $(MSCGENJS_CORE_ROOT)/parse/%.js $(MSCGENJS_LIBDIRS)
	cp $< $@

src/lib/mscgenjs-core/lib/lodash/%.js: $(MSCGENJS_CORE_ROOT)/lib/lodash/%.js $(MSCGENJS_LIBDIRS)
	cp $< $@

# dependencies
include jsdependencies.mk

# file targets prod

LIVE_DOC_DEPS= $(BUILDDIR)/mscgen-inpage.js \

$(BUILDDIR)/mscgen-inpage.js: $(EMBED_JS_SOURCES) node_modules/almond/almond.js
	$(RJS) -o baseUrl=./src \
			name=../node_modules/almond/almond \
			include=mscgen-inpage \
			out=$@ \
			wrap=true \
			preserveLicenseComments=true

$(BUILDDIR)/script/mscgen-inpage.js: $(BUILDDIR)/mscgen-inpage.js
	cp $< $@

# "phony" targets
prerequisites:
	$(NPM) install


noconsolestatements:
	@echo "scanning for console statements (run 'make consolecheck' to see offending lines)"
	grep -r console src/mscgen-*.js src/embedding src/utl | grep -c console | grep ^0$$
	@echo ... ok

consolecheck:
	grep -r console src/mscgen-*.js src/embedding src/utl

lint:
	$(NPM) run lint

stylecheck:
	$(NPM) run jscs

node-cover: dev-build
	$(NPM) run cover

web-cover: dev-build
	rm -rf $(INSTRUMENTATION_DIR)
	$(ISTANBUL) instrument src/utl -o $(INSTRUMENTATION_DIR)/utl
	$(ISTANBUL) instrument src/embedding -o $(INSTRUMENTATION_DIR)/embedding
	$(ISTANBUL) instrument src/mscgen-inpage.js -o $(INSTRUMENTATION_DIR)/mscgen-inpage.js
	cp -r src/test $(INSTRUMENTATION_DIR)/test
	cp -r src/lib $(INSTRUMENTATION_DIR)/lib
	phantomjs $(INSTRUMENTATION_DIR)/test/index.phantomjs

cover-report:
	mkdir -p $(INSTRUMENTATION_DIR)/test/node-coverage
	cp -Rf coverage/coverage.json $(INSTRUMENTATION_DIR)/test/node-coverage/.
	$(ISTANBUL) report --root $(INSTRUMENTATION_DIR)/test/ lcov

cover: node-cover web-cover cover-report

install: $(BUILDDIR)/mscgen-inpage.js

tag:
	$(GIT) tag -a `utl/getver` -m "tag release `utl/getver`"
	$(GIT) push --tags

# a rudimentary bower package with only the (minified) embedding code
# to be expanded with src, lib & deps
bower-package: $(BUILDDIR)/mscgen-inpage.js
	mkdir -p bower-package
	cp src/bower/* bower-package/.
	cp src/bower/.gitignore bower-package/.
	cp $(BUILDDIR)/mscgen-inpage.js bower-package/mscgen-inpage.js

static-analysis:
	$(NPM) run plato

test: dev-build
	$(NPM) run test
	phantomjs src/test/index.phantomjs

nsp:
	$(NPM) run nsp

outdated:
	$(NPM) outdated

check: noconsolestatements lint stylecheck test

fullcheck: check outdated nsp

update-dependencies: run-update-dependencies clean-generated-sources dev-build test nsp
	$(GIT) diff package.json

run-update-dependencies:
	$(NPM) run npm-check-updates
	$(NPM) install

depend:
	$(MAKEDEPEND) --system amd,cjs src
	$(MAKEDEPEND) --append --system amd --flat-define EMBED_JS_SOURCES src/mscgen-inpage.js

clean-the-build:
	rm -rf $(BUILDDIR)/samples \
		$(BUILDDIR)/mscgen-inpage.js
	rm -rf $(INSTRUMENTATION_DIR)
	rm -rf $(COVERAGE_REPORT_DIR)

clean-generated-sources:
	rm -rf $(GENERATED_SOURCES)

clean: clean-the-build clean-generated-sources
	rm -rf $(LIBDIRS)
