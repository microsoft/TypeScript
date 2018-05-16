# browser-pack

pack node-style source files from a json stream into a browser bundle

[![build status](https://secure.travis-ci.org/browserify/browser-pack.png)](http://travis-ci.org/browserify/browser-pack)

# example

json input:

``` json
[
  {
    "id": "a1b5af78",
    "source": "console.log(require('./foo')(5))",
    "deps": { "./foo": "b8f69fa5" },
    "entry": true
  },
  {
    "id": "b8f69fa5",
    "source": "module.exports = function (n) { return n * 111 }",
    "deps": {}
  }
]
```

bundle script:

``` js
var pack = require('browser-pack')();
process.stdin.pipe(pack).pipe(process.stdout);
process.stdin.resume();
```

output:

```
$ browser-pack < input.json
(function(p,c,e){function r(n){if(!c[n]){c[n]={exports:{}};p[n][0](function(x){return r(p[n][1][x])},c[n],c[n].exports);}return c[n].exports}for(var i=0;i<e.length;i++)r(e[i]);return r})({"a1b5af78":[function(require,module,exports){console.log(require('./foo')(5))},{"./foo":"b8f69fa5"}],"b8f69fa5":[function(require,module,exports){module.exports = function (n) { return n * 111 }},{}]},{},["a1b5af78","b8f69fa5"])
```

# methods

``` js
var pack = require('browser-pack');
```

## pack(opts)

Return a through stream that takes a stream of json input and produces a stream
of javascript output. This module does not export its internal `require()`
function but you can prepend `'var require='` to the stream contents to get the
require function. `require()` will return `undefined` when a module hasn't been
defined to support splitting up modules across several bundles with custom
fallback logic.

If `opts.raw` is given, the writable end of the stream will expect objects to be
written to it instead of expecting a stream of json text it will need to parse.

If `opts.sourceMapPrefix` is given and source maps are computed, the
`opts.sourceMapPrefix` string will be used instead of `//#`.

If `opts.sourceRoot` is given and source maps are computed, the root for the
output source map will be defined. (default is no root)

Additionally, rows with a truthy `entry` may have an `order` field that
determines the numeric index to execute the entries in.

You can specify a custom prelude with `opts.prelude` but you should really know
what you're doing first. See the `prelude.js` file in this repo for the default
prelude. If you specify a custom prelude, you must also specify a valid
`opts.preludePath` to the prelude source file for sourcemaps to work.

`opts.standalone` external string name to use for umd

`opts.standaloneModule` sets the internal module name to export for standalone

`opts.hasExports` whether the bundle should include `require=` (or the
`opts.externalRequireName`) so that `require()` is available outside the bundle

# install

With [npm](https://npmjs.org), to get the library do:

```
npm install browser-pack
```

and to get the command-line tool do:

```
npm install -g browser-pack
```

# license

MIT
