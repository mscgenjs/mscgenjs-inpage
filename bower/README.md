# mscgen_js bower package
This was an initial version of an package for the script to embed MscGen in
HTML - released on bower.io only.
- Support (updates & fixes) for this bower package will be dropped 2016-06-01.
- Use the npm package [mscgenjs-inpage](https://www.npmjs.com/package/mscgenjs-inpage)
  instead.
- If you need to use it after 2016-06-01 and/ or have a serious use case for
  bower over npm - drop me a line:
  - leave a note in the issues or
  - use the mailing address mentioned with the npm package (checked ~ weekly)

## License information
This software is free software [licensed under GPLv3][3]. This means (a.o.) you _can_ use
it as part of other free software, but _not_ as part of non free software.

### Commercial use of embedding mscgen using `mscgen-inpage.js`
In addition to the GNU public license, for the use of the minified version of the embedding code
(```mscgen-inpage.js```) as described on [embedding][30] a special exception
to the GPL is made:  

> As a special exception to the GPL, any HTML file which merely makes
function calls to mscgen-inpage.js, and for that purpose includes
it by reference shall be deemed a separate work for copyright law
purposes. In addition, the copyright holders of this code give you
permission to combine this code with free software libraries that
are released under the GNU LGPL. You may copy and distribute such
a system following the terms of the GNU GPL for this code and the
LGPL for the libraries. If you modify this code, you may extend
this exception to your version of the code, but you are not obligated
to do so. If you do not wish to do so, delete this exception statement
from your version.

### Dependencies and their licenses
mscgen_js is built on various libraries, each of which have their own license (incidentally all
MIT style):
- [requirejs][19] is used for modularization.
- The bare (embedding only) mscgen_js is packaged using requirejs and [almond][31] to be able to run as a stand alone, dependency less package.
- Parsers are generated with [pegjs][12].


It uses [mocha][21], [istanbul][28], [eslint][22], [plato][23] and
[nsp][35] to maintain some modicum of verifiable code quality.
You can see the build history in [Travis](https://travis-ci.org/sverweij/mscgen_js) and an indication of the
shape of the code at [Code Climate ](https://codeclimate.com/github/sverweij/mscgen_js).

## Thanks
- [Mike McTernan][1] for creating the wonderful mscgen standard, the accompanying c implementation and for
  releasing both to the public domain (the last one under a [GPLv2][18] license to be precise).
- [David Majda][8] for cooking and maintaining the fantastic and lightning fast [PEG.js][9] parser generator.

[1]: http://www.mcternan.me.uk/mscgen
[2]: https://sverweij.github.io/mscgen_js
[3]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.mscgen_js.md
[5]: https://github.com/sverweij/mscgen_js/blob/master/wikum/msgenny.md
[6]: https://github.com/sverweij/mscgen_js/labels/compliance
[7]: https://github.com/sverweij/mscgen_js/blob/master/wikum/build.md
[8]: http://majda.cz/en/
[9]: http://pegjs.majda.cz/
[10]: http://marijnhaverbeke.nl
[11]: http://codemirror.net
[12]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.pegjs.md
[13]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.codemirror.md
[15]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.icons.md
[16]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.canvg.md
[17]: https://github.com/gabelerner/canvg
[18]: http://code.google.com/p/mscgen/source/browse/trunk/COPYING
[19]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.requirejs.md
[20]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.amdefine.md
[21]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.mocha.md
[22]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.eslint.md
[23]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.plato.md
[24]: http://tmpvar.com/
[25]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.jsdom.md
[26]: http://cs.brown.edu/~dap/
[28]: https://github.com/sverweij/mscgen_js/blob/master/wikum/licenses/license.istanbul.md
[29]: https://github.com/sverweij/mscgen_js/blob/master/wikum/xu.md
[30]: https://sverweij.github.io/mscgen_js/embed.html
[31]: https://github.com/jrburke/almond
[33]: https://github.com/sverweij/mscgen_js/blob/master/src/script
[34]: https://github.com/tmpvar/jsdom
[35]: https://nodesecurity.io/
[36]: wikum/licenses/license.node-localstorage.md
[37]: wikum/licenses/license.btoa.md
