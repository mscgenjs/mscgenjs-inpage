# embedding

:page_with_curl: code in [mscgen-inpage.js](mscgen-inpage.js)

The embedding controller uses the obvious approach:

- Run through all elements in the DOM tree and filter out those that have the
  mscgen_js class, are of the `mscgen` element type or are a script with
  one of the supported mime types (text/x-mscgen, text/x-msgenny, text/x-xu)
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
<script
  src="https://sverweij.github.io/mscgen_js/mscgen-inpage.js"
  defer
></script>
```
