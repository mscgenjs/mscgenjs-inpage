# embedding
:page_with_curl: code in [mscgen-inpage.js](mscgen-inpage.js)

The embedding controller uses the obvious approach:
- Run through all elements in the DOM tree and filter out those that have the mscgen_js class
  or are of the `mscgen` element type.
- For each element thus found attempt to parse and render its content as mscgen (or one of
  the three other supported languages).
- If the parsing doesn't work out, display the text of the element with the
  error the parser found highlighted.

## defer: prevent execution before DOM tree has loaded
When testing this on larger DOM trees (like the one of the
[tutorial](https://sverweij.github.io/mscgen_js/tutorial.html)), we found that
sometimes the code would start executing before the browser completed loading
the DOM tree. The result of this was that the only part of the embedded
mscgen would be rendered.

Libraries like jquery have tricks up their sleeves to prevent this from happening.
However, we don't want to use more libraries than strictly necessary.
Less code => less to download => faster load times.

The solution we're using now is to use the `defer` attribute in the script
element. With this attribute in place most modern browsers (firefox, chrome, safari)
wait with loading and executing the script until the complete DOM tree is loaded
```html
<script src='https://sverweij.github.io/mscgen_js/mscgen-inpage.js' defer></script>
```

## One javascript file: r.js and almond
As you can see mscgen_js keeps its functionality in separate amd modules. It
uses r.js and almond [almond](https://github.com/jrburke/almond) to smash
em together in one ball of javascript.

(Between version 1.5.1 and 1.9.11 we were using webpack with the same goal.
That solution generated slightly smaller packages, but we found webpack
- with exactly the same input - generated javascript that could not be
parsed by internet explorer 11.)
