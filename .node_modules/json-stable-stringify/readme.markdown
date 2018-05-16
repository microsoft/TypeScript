# json-stable-stringify

deterministic version of `JSON.stringify()` so you can get a consistent hash
from stringified results

You can also pass in a custom comparison function.

[![browser support](https://ci.testling.com/substack/json-stable-stringify.png)](https://ci.testling.com/substack/json-stable-stringify)

[![build status](https://secure.travis-ci.org/substack/json-stable-stringify.png)](http://travis-ci.org/substack/json-stable-stringify)

# example

``` js
var stringify = require('json-stable-stringify');
var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
console.log(stringify(obj));
```

output:

```
{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}
```

# methods

``` js
var stringify = require('json-stable-stringify')
```

## var str = stringify(obj, opts)

Return a deterministic stringified string `str` from the object `obj`.

If `opts` is given, you can supply an `opts.cmp` to have a custom comparison
function for object keys. Your function `opts.cmp` is called with these
parameters:

``` js
opts.cmp({ key: akey, value: avalue }, { key: bkey, value: bvalue })
```

For example, to sort on the object key names in reverse order you could write:

``` js
var stringify = require('json-stable-stringify');

var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
var s = stringify(obj, function (a, b) {
    return a.key < b.key ? 1 : -1;
});
console.log(s);
```

which results in the output string:

```
{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}
```

Or if you wanted to sort on the object values in reverse order, you could write:

```
var stringify = require('json-stable-stringify');

var obj = { d: 6, c: 5, b: [{z:3,y:2,x:1},9], a: 10 };
var s = stringify(obj, function (a, b) {
    return a.value < b.value ? 1 : -1;
});
console.log(s);
```

which outputs:

```
{"d":6,"c":5,"b":[{"z":3,"y":2,"x":1},9],"a":10}
```

# install

With [npm](https://npmjs.org) do:

```
npm install json-stable-stringify
```

# license

MIT
