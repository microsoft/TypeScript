# module-deps

walk the dependency graph to generate json output that can be fed into
[browser-pack](https://github.com/browserify/browser-pack)

[![build status](https://secure.travis-ci.org/browserify/module-deps.png)](http://travis-ci.org/browserify/module-deps)

# example

``` js
var mdeps = require('module-deps');
var JSONStream = require('JSONStream');

var md = mdeps();
md.pipe(JSONStream.stringify()).pipe(process.stdout);
md.end({ file: __dirname + '/files/main.js' });
```

output:

```
$ node example/deps.js
[
{"id":"/home/substack/projects/module-deps/example/files/main.js","source":"var foo = require('./foo');\nconsole.log('main: ' + foo(5));\n","entry":true,"deps":{"./foo":"/home/substack/projects/module-deps/example/files/foo.js"}}
,
{"id":"/home/substack/projects/module-deps/example/files/foo.js","source":"var bar = require('./bar');\n\nmodule.exports = function (n) {\n    return n * 111 + bar(n);\n};\n","deps":{"./bar":"/home/substack/projects/module-deps/example/files/bar.js"}}
,
{"id":"/home/substack/projects/module-deps/example/files/bar.js","source":"module.exports = function (n) {\n    return n * 100;\n};\n","deps":{}}
]
```

and you can feed this json data into
[browser-pack](https://github.com/browserify/browser-pack):

```
$ node example/deps.js | browser-pack | node
main: 1055
```

# usage

```
usage: module-deps [files]

  generate json output from each entry file

```

# methods

``` js
var mdeps = require('module-deps')
```

## var d = mdeps(opts={})

Return an object transform stream `d` that expects entry filenames or
`{ id: ..., file: ... }` objects as input and produces objects for every
dependency from a recursive module traversal as output.

Each file in `files` can be a string filename or a stream.

Optionally pass in some `opts`:

* `opts.transform` - a string or array of string transforms (see below)

* `opts.transformKey` - an array path of strings showing where to look in the
package.json for source transformations. If falsy, don't look at the
package.json at all.

* `opts.resolve` - custom resolve function using the
`opts.resolve(id, parent, cb)` signature that
[browser-resolve](https://github.com/shtylman/node-browser-resolve) has

* `opts.filter` - a function (id) to skip resolution of some module `id` strings.
If defined, `opts.filter(id)` should return truthy for all the ids to include
and falsey for all the ids to skip.

* `opts.postFilter` - a function (id, file, pkg) that gets called after `id` has
been resolved. Return false to skip this file.

* `opts.packageFilter` - transform the parsed package.json contents before using
the values. `opts.packageFilter(pkg, dir)` should return the new `pkg` object to
use.

* `opts.noParse` - an array of absolute paths to not parse for dependencies. Use
this for large dependencies like jquery or threejs which take forever to parse.

* `opts.cache` - an object mapping filenames to file objects to skip costly io

* `opts.packageCache` - an object mapping filenames to their parent package.json
contents for browser fields, main entries, and transforms

* `opts.fileCache` - an object mapping filenames to raw source to avoid reading
from disk.

* `opts.persistentCache` - a complex cache handler that allows async and persistent
    caching of data. A `persistentCache` needs to follow this interface:
    ```js
    function persistentCache (
        file, // the path to the file that is loaded
        id,   // the id that is used to reference this file
        pkg,  // the package that this file belongs to fallback
        fallback, // async fallback handler to be called if the cache doesn't hold the given file 
        cb    // callback handler that receives the cache data
    ) {
        if (hasError()) {
            return cb(error) // Pass any error to the callback
        }

        var fileData = fs.readFileSync(file)
        var key = keyFromFile(file, fileData)

        if (db.has(key)) {
            return cb(null, {
                source: db.get(key).toString(),
                package: pkg, // The package for housekeeping
                deps: {
                    'id':  // id that is used to reference a required file
                    'file' // file path to the required file
                }
            })
        }
        //
        // The fallback will process the file in case the file is not
        // in cache.
        //
        // Note that if your implementation doesn't need the file data
        // then you can pass `null` instead of the source and the fallback will
        // fetch the data by itself.
        //
        fallback(fileData, function (error, cacheableEntry) {
            if (error) {
                return cb(error)
            }
            db.addToCache(key, cacheableEntry)
            cb(null, cacheableEntry)
        })
    }
    ```

* `opts.paths` - array of global paths to search. Defaults to splitting on `':'`
in `process.env.NODE_PATH`

* `opts.ignoreMissing` - ignore files that failed to resolve

# input objects

Input objects should be string filenames or objects with these parameters:

* `row.file` - filename
* `row.expose` - name to be exposed as
* `row.noparse` when true, don't parse the file contents for dependencies

or objects can specify transforms:

* `row.transform` - string name, path, or function
* `row.options` - transform options as an object
* `row.global` - boolean, whether the transform is global

# events

## d.on('transform', function (tr, file) {})

Every time a transform is applied to a `file`, a `'transform'` event fires with
the instantiated transform stream `tr`.

## d.on('file', function (file) {})

Every time a file is read, this event fires with the file path.

## d.on('missing', function (id, parent) {})

When `opts.ignoreMissing` is enabled, this event fires for each missing package.

## d.on('package', function (pkg) {})

Every time a package is read, this event fires. The directory name of the
package is available in `pkg.__dirname`.

# transforms

module-deps can be configured to run source transformations on files before
parsing them for `require()` calls. These transforms are useful if you want to
compile a language like [coffeescript](http://coffeescript.org/) on the fly or
if you want to load static assets into your bundle by parsing the AST for
`fs.readFileSync()` calls.

If the transform is a function, it should take the `file` name as an argument
and return a through stream that will be written file contents and should output
the new transformed file contents.

If the transform is a string, it is treated as a module name that will resolve
to a module that is expected to follow this format:

``` js
var through = require('through2');
module.exports = function (file, opts) { return through() };
```

You don't necessarily need to use the
[through2](https://github.com/rvagg/through2) module to create a
readable/writable filter stream for transforming file contents, but this is an
easy way to do it.

module-deps looks for `require()` calls and adds their arguments as dependencies
of a file. Transform streams can emit `'dep'` events to include additional
dependencies that are not consumed with `require()`.

When you call `mdeps()` with an `opts.transform`, the transformations you
specify will not be run for any files in node_modules/. This is because modules
you include should be self-contained and not need to worry about guarding
themselves against transformations that may happen upstream.

Modules can apply their own transformations by setting a transformation pipeline
in their package.json at the `opts.transformKey` path. These transformations
only apply to the files directly in the module itself, not to the module's
dependants nor to its dependencies.

## package.json transformKey

Transform keys live at a configurable location in the package.json denoted by
the `opts.transformKey` array.

For a transformKey of `['foo','bar']`, the transformKey can be a single string
(`"fff"`):

``` json
{
  "foo": {
    "bar": "fff"
  }
}
```

or an array of strings (`["fff","ggg"]`):

``` json
{
  "foo": {
    "bar": ["fff","ggg"]
  }
}
```

If you want to pass options to the transforms, you can use a 2-element array
inside of the primary array. Here `fff` gets an options object with `{"x":3}`
and `ggg` gets `{"y":4}`:

``` json
{
  "foo": {
    "bar": [["fff",{"x":3}],["ggg",{"y":4}]]
  }
}
```

Options sent to the module-deps constructor are also provided under
`opts._flags`. These options are sometimes required if your transform
needs to do something different when browserify is run in debug mode, for
example.

# usage

```
module-deps [FILES] OPTIONS

  Generate json output for the entry point FILES.

OPTIONS are:

  -t TRANSFORM  Apply a TRANSFORM.
  -g TRANSFORM  Apply a global TRANSFORM.

```

# install

With [npm](http://npmjs.org), to get the module do:

```
npm install module-deps
```

and to get the `module-deps` command do:

```
npm install -g module-deps
```

# license

MIT
