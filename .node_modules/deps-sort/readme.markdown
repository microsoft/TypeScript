# deps-sort

sort [module-deps](https://npmjs.org/package/module-deps) output for deterministic
browserify bundles

[![build status](https://secure.travis-ci.org/substack/deps-sort.png)](http://travis-ci.org/substack/deps-sort)

# example

## command-line

```
$ for((i=0;i<5;i++)); do module-deps main.js | deps-sort | browser-pack | md5sum; done
e9e630de2c62953140357db0444c3c3a  -
e9e630de2c62953140357db0444c3c3a  -
e9e630de2c62953140357db0444c3c3a  -
e9e630de2c62953140357db0444c3c3a  -
e9e630de2c62953140357db0444c3c3a  -
```

or using `browserify --deps` on a [voxeljs](http://voxeljs.com/) project:

```
$ for((i=0;i<5;i++)); do browserify --deps browser.js | deps-sort | browser-pack | md5sum; done
fb418c74b53ba2e4cef7d01808b848e6  -
fb418c74b53ba2e4cef7d01808b848e6  -
fb418c74b53ba2e4cef7d01808b848e6  -
fb418c74b53ba2e4cef7d01808b848e6  -
fb418c74b53ba2e4cef7d01808b848e6  -
```

## api

To use this module programmatically, write streaming object data and read
streaming object data:

``` js
var sort = require('../')();
var JSONStream = require('JSONStream');
var parse = JSONStream.parse([ true ]);
var stringify = JSONStream.stringify();

process.stdin.pipe(parse).pipe(sort).pipe(stringify).pipe(process.stdout);
```

# methods

``` js
var depsSort = require('deps-sort');
```

## var stream = depsSort(opts)

Return a new through `stream` that should get written
[module-deps](https://npmjs.org/package/module-deps) objects and will output
sorted objects.

`opts` can be:

* `opts.index` - when true, for each module-deps row, insert `row.index` with
the numeric index and `row.indexDeps` like `row.deps` but mapping require
strings to row indices

* `opts.expose` - array of names or object mapping names to `true` not to mangle
with integer indexes when `opts.index` is turned on. If `opts.expose` maps names
to strings, those strings will be used to resolve the indexed references.

* `opts.dedupe` - set `row.dedupe` for files that match existing contents. Sets
`row.dedupeIndex` when `opts.index` is enabled. When `row.dedupe` is set,
`row.sameDeps` will be set to a boolean of whether the dependencies at the
dedupe target match (true) or just the source content (false).

# install

With [npm](https://npmjs.org) do:

```
npm install deps-sort
```

# license

MIT
