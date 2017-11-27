
.SUFFIXES: .js .pegjs .css .html .msc .mscin .msgenny .svg .png .jpg
RJS=node_modules/requirejs/bin/r.js
GIT=git
GIT_DEPLOY_FROM_BRANCH=master
SEDVERSION=utl/sedversion.sh
NPM=npm
MAKEDEPEND=node_modules/.bin/js-makedepend --output-to jsdependencies.mk --exclude "node_modules"
ISTANBUL=node_modules/.bin/istanbul

BUILDDIR=dist
PRODDIRS=$(BUILDDIR)
MSCGENJS_CORE_ROOT=node_modules/mscgenjs
MSCGENJS_LIBDIRS=src/lib/mscgenjs-core/parse \
	src/lib/mscgenjs-core/render/astmassage \
	src/lib/mscgenjs-core/render/graphics \
	src/lib/mscgenjs-core/render/graphics/styling \
	src/lib/mscgenjs-core/render/graphics/svgelementfactory \
	src/lib/mscgenjs-core/render/text \
	src/lib/mscgenjs-core/render/textutensils \
	src/lib/mscgenjs-core/lib/lodash
LIBDIRS=$(MSCGENJS_LIBDIRS)
INSTRUMENTATION_DIR=istanbul-instrumented
COVERAGE_REPORT_DIR=coverage

.PHONY: help  install deploy-gh-pages check fullcheck mostlyclean clean lint cover prerequisites report test update-dependencies run-update-dependencies depend

help:
	@echo " --------------------------------------------------------"
	@echo "| Just downloaded the mscgen_js sources?                 |"
	@echo "|  First run 'make prerequisites' or 'npm install'       |"
	@echo " --------------------------------------------------------"
	@echo
	@echo "Most important build targets:"
	@echo
	@echo "install"
	@echo " -> this is probably the target you want when"
	@echo "    hosting mscgen_js"
	@echo
	@echo " creates the production version (minified js) in the "
	@echo " dist folder"
	@echo
	@echo "check"
	@echo " runs the linter and executes all unit tests"
	@echo
	@echo "clean"
	@echo " removes everything created by install"
	@echo
	@echo "update-dependencies"
	@echo " updates all (node) module dependencies in package.json"
	@echo " installs them, rebuilds all generated sources and runs"
	@echo " all tests."
	@echo

# production rules
$(PRODDIRS):
	mkdir -p $@

$(LIBDIRS):
	mkdir -p $@

src/lib/require.js: node_modules/requirejs/require.js
	cp $< $@

src/lib/mscgenjs-core/%.js: $(MSCGENJS_CORE_ROOT)/%.js $(MSCGENJS_LIBDIRS)
	cp $< $@

src/lib/mscgenjs-core/lib/lodash/%.js: $(MSCGENJS_CORE_ROOT)/lib/lodash/%.js $(MSCGENJS_LIBDIRS)
	cp $< $@

# dependencies
include jsdependencies.mk

.npmignore: .gitignore
	cp $< $@
	echo "src/test/**" >> $@
	echo "utl/**" >> $@
	echo "wikum/**" >> $@
	echo ".bithoundrc" >> $@
	echo ".codeclimate.yml" >> $@
	echo ".eslintignore" >> $@
	echo ".eslintrc" >> $@
	echo ".eslintrc.json" >> $@
	echo ".gitlab-ci.yml" >> $@
	echo ".istanbul.yml" >> $@
	echo ".travis.yml" >> $@
	echo "Makefile" >> $@
	echo "jsdependencies.mk" >> $@
	echo "sitemap.xml" >> $@

# file targets prod

LIVE_DOC_DEPS= $(BUILDDIR)/mscgen-inpage.js \

# $(BUILDDIR)/mscgen-inpage.js: $(EMBED_JS_SOURCES)
# 	$(WEBPACK) --optimize-minimize --optimize-max-chunks 1 src/mscgen-inpage.js $@

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

lint:
	$(NPM) run lint

lint-fix:
	$(NPM) run lint:fix

node-cover:
	$(NPM) run test:cover

publish-patch:
	$(NPM) version patch

publish-minor:
	$(NPM) version minor

publish-major:
	$(NPM) version major

web-cover: src/lib/require.js
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

install: $(BUILDDIR)/mscgen-inpage.js .npmignore

tag:
	$(GIT) tag -a `utl/getver` -m "tag release `utl/getver`"
	$(GIT) push --tags

test: src/lib/require.js
	$(NPM) run test
	phantomjs src/test/index.phantomjs

nsp:
	$(NPM) run nsp

outdated:
	$(NPM) outdated

check: lint test

fullcheck: check nsp # outdated

update-dependencies: run-update-dependencies clean-generated-sources test nsp lint-fix
	$(GIT) diff package.json

run-update-dependencies:
	$(NPM) run npm-check-updates
	$(NPM) install

depend:
	$(MAKEDEPEND) --system amd,cjs src
	$(MAKEDEPEND) --append --system amd --flat-define EMBED_JS_SOURCES src/mscgen-inpage.js

clean-the-build:
	rm -rf $(BUILDDIR)/mscgen-inpage.js
	rm -rf $(INSTRUMENTATION_DIR)
	rm -rf $(COVERAGE_REPORT_DIR)

clean-generated-sources:
	rm -rf $(GENERATED_SOURCES)

clean: clean-the-build clean-generated-sources
	rm -rf $(LIBDIRS)
