# htmlescape

Properly escape JSON for usage as an object literal inside of a `<script>` tag. Use `htmlescape` in place of `JSON.stringify`. For more info see [JSON: The JavaScript subset that isn't](http://timelessrepo.com/json-isnt-a-javascript-subset).

## Transformations

| from     | to        |
| -------- |:---------:|
| `&`      | `\\u0026` |
| `>`      | `\\u003e` |
| `<`      | `\\u003c` |
| `\u2028` | `\\u2028` |
| `\u2029` | `\\u2029` |


## Usage

```js
var htmlescape = require('htmlescape');
htmlescape({prop:'value'});
//=> '{"prop":"value"}'
```

Or in your templates:

```html
<script>
var payload = <%= htmlescape(payload) %>;
</script>
```
