# browserify

`require('modules')` in the browser

Use a [node](http://nodejs.org)-style `require()` to organize your browser code
and load modules installed by [npm](https://www.npmjs.com).

browserify will recursively analyze all the `require()` calls in your app in
order to build a bundle you can serve up to the browser in a single `<script>`
tag.

[![build status](https://img.shields.io/travis/browserify/browserify/master.svg)](https://travis-ci.org/browserify/browserify)

![browserify!](./assets/logo.png)

# getting started

If you're new to browserify, check out the
[browserify handbook](https://github.com/browserify/browserify-handbook)
and the resources on [browserify.org](http://browserify.org/).

# example

Whip up a file, `main.js` with some `require()`s in it. You can use relative
paths like `'./foo.js'` and `'../lib/bar.js'` or module paths like `'gamma'`
that will search `node_modules/` using
[node's module lookup algorithm](https://github.com/browserify/resolve).

``` js
var foo = require('./foo.js');
var bar = require('../lib/bar.js');
var gamma = require('gamma');

var elem = document.getElementById('result');
var x = foo(100) + bar('baz');
elem.textContent = gamma(x);
```

Export functionality by assigning onto `module.exports` or `exports`:

``` js
module.exports = function (n) { return n * 111 }
```

Now just use the `browserify` command to build a bundle starting at `main.js`:

```
$ browserify main.js > bundle.js
```

All of the modules that `main.js` needs are included in the `bundle.js` from a
recursive walk of the `require()` graph using
[required](https://github.com/defunctzombie/node-required).

To use this bundle, just toss a `<script src="bundle.js"></script>` into your
html!

# install

With [npm](https://www.npmjs.com/) do:

```
npm install -g browserify
```

# usage

```
Usage: browserify [entry files] {OPTIONS}

Standard Options:

    --outfile, -o  Write the browserify bundle to this file.
                   If unspecified, browserify prints to stdout.

    --require, -r  A module name or file to bundle.require()
                   Optionally use a colon separator to set the target.

      --entry, -e  An entry point of your app

     --ignore, -i  Replace a file with an empty stub. Files can be globs.

    --exclude, -u  Omit a file from the output bundle. Files can be globs.

   --external, -x  Reference a file from another bundle. Files can be globs.

  --transform, -t  Use a transform module on top-level files.

    --command, -c  Use a transform command on top-level files.

  --standalone -s  Generate a UMD bundle for the supplied export name.
                   This bundle works with other module systems and sets the name
                   given as a window global if no module system is found.

       --debug -d  Enable source maps that allow you to debug your files
                   separately.

       --help, -h  Show this message

For advanced options, type `browserify --help advanced`.

Specify a parameter.
```

```
Advanced Options:

  --insert-globals, --ig, --fast    [default: false]

    Skip detection and always insert definitions for process, global,
    __filename, and __dirname.

    benefit: faster builds
    cost: extra bytes

  --insert-global-vars, --igv

    Comma-separated list of global variables to detect and define.
    Default: __filename,__dirname,process,Buffer,global

  --detect-globals, --dg            [default: true]

    Detect the presence of process, global, __filename, and __dirname and define
    these values when present.

    benefit: npm modules more likely to work
    cost: slower builds

  --ignore-missing, --im            [default: false]

    Ignore `require()` statements that don't resolve to anything.

  --noparse=FILE

    Don't parse FILE at all. This will make bundling much, much faster for giant
    libs like jquery or threejs.

  --no-builtins

    Turn off builtins. This is handy when you want to run a bundle in node which
    provides the core builtins.

  --no-commondir

    Turn off setting a commondir. This is useful if you want to preserve the
    original paths that a bundle was generated with.

  --no-bundle-external

    Turn off bundling of all external modules. This is useful if you only want
    to bundle your local files.

  --bare

    Alias for both --no-builtins, --no-commondir, and sets --insert-global-vars
    to just "__filename,__dirname". This is handy if you want to run bundles in
    node.

  --no-browser-field, --no-bf

    Turn off package.json browser field resolution. This is also handy if you
    need to run a bundle in node.

  --transform-key

    Instead of the default package.json#browserify#transform field to list
    all transforms to apply when running browserify, a custom field, like, e.g.
    package.json#browserify#production or package.json#browserify#staging
    can be used, by for example running:
    * `browserify index.js --transform-key=production > bundle.js`
    * `browserify index.js --transform-key=staging > bundle.js`

  --node

    Alias for --bare and --no-browser-field.

  --full-paths

    Turn off converting module ids into numerical indexes. This is useful for
    preserving the original paths that a bundle was generated with.

  --deps

    Instead of standard bundle output, print the dependency array generated by
    module-deps.

  --no-dedupe

    Turn off deduping.

  --list

    Print each file in the dependency graph. Useful for makefiles.

  --extension=EXTENSION

    Consider files with specified EXTENSION as modules, this option can used
    multiple times.

  --global-transform=MODULE, -g MODULE

    Use a transform module on all files after any ordinary transforms have run.

  --ignore-transform=MODULE, -it MODULE

    Do not run certain transformations, even if specified elsewhere.

  --plugin=MODULE, -p MODULE

    Register MODULE as a plugin.

Passing arguments to transforms and plugins:

  For -t, -g, and -p, you may use subarg syntax to pass options to the
  transforms or plugin function as the second parameter. For example:

    -t [ foo -x 3 --beep ]

  will call the `foo` transform for each applicable file by calling:

    foo(file, { x: 3, beep: true })

```

# compatibility

Many [npm](https://www.npmjs.com/) modules that don't do IO will just work after being
browserified. Others take more work.

Many node built-in modules have been wrapped to work in the browser, but only
when you explicitly `require()` or use their functionality.

When you `require()` any of these modules, you will get a browser-specific shim:

* [assert](https://www.npmjs.com/package/assert)
* [buffer](https://www.npmjs.com/package/buffer)
* [console](https://www.npmjs.com/package/console-browserify)
* [constants](https://www.npmjs.com/package/constants-browserify)
* [crypto](https://www.npmjs.com/package/crypto-browserify)
* [domain](https://www.npmjs.com/package/domain-browser)
* [events](https://www.npmjs.com/package/events)
* [http](https://www.npmjs.com/package/stream-http)
* [https](https://www.npmjs.com/package/https-browserify)
* [os](https://www.npmjs.com/package/os-browserify)
* [path](https://www.npmjs.com/package/path-browserify)
* [punycode](https://www.npmjs.com/package/punycode)
* [querystring](https://www.npmjs.com/package/querystring-es3)
* [stream](https://www.npmjs.com/package/stream-browserify)
* [string_decoder](https://www.npmjs.com/package/string_decoder)
* [timers](https://www.npmjs.com/package/timers-browserify)
* [tty](https://www.npmjs.com/package/tty-browserify)
* [url](https://www.npmjs.com/package/url)
* [util](https://www.npmjs.com/package/util)
* [vm](https://www.npmjs.com/package/vm-browserify)
* [zlib](https://www.npmjs.com/package/browserify-zlib)

Additionally, if you use any of these variables, they
[will be defined](https://github.com/browserify/insert-module-globals)
in the bundled output in a browser-appropriate way:

* [process](https://www.npmjs.com/package/process)
* [Buffer](https://www.npmjs.com/package/buffer)
* global - top-level scope object (window)
* __filename - file path of the currently executing file
* __dirname - directory path of the currently executing file

# more examples

## external requires

You can just as easily create a bundle that will export a `require()` function so
you can `require()` modules from another script tag. Here we'll create a
`bundle.js` with the [through](https://www.npmjs.com/package/through)
and [duplexer](https://www.npmjs.com/package/duplexer) modules.

```
$ browserify -r through -r duplexer -r ./my-file.js:my-module > bundle.js
```

Then in your page you can do:

``` html
<script src="bundle.js"></script>
<script>
  var through = require('through');
  var duplexer = require('duplexer');
  var myModule = require('my-module');
  /* ... */
</script>
```

## external source maps

If you prefer the source maps be saved to a separate `.js.map` source map file, you may use
[exorcist](https://github.com/thlorenz/exorcist) in order to achieve that. It's as simple as:

```
$ browserify main.js --debug | exorcist bundle.js.map > bundle.js
```

Learn about additional options [here](https://github.com/thlorenz/exorcist#usage).

## multiple bundles

If browserify finds a `require`d function already defined in the page scope, it
will fall back to that function if it didn't find any matches in its own set of
bundled modules.

In this way, you can use browserify to split up bundles among multiple pages to
get the benefit of caching for shared, infrequently-changing modules, while
still being able to use `require()`. Just use a combination of `--external` and
`--require` to factor out common dependencies.

For example, if a website with 2 pages, `beep.js`:

``` js
var robot = require('./robot.js');
console.log(robot('beep'));
```

and `boop.js`:

``` js
var robot = require('./robot.js');
console.log(robot('boop'));
```

both depend on `robot.js`:

``` js
module.exports = function (s) { return s.toUpperCase() + '!' };
```

```
$ browserify -r ./robot.js > static/common.js
$ browserify -x ./robot.js beep.js > static/beep.js
$ browserify -x ./robot.js boop.js > static/boop.js
```

Then on the beep page you can have:

``` html
<script src="common.js"></script>
<script src="beep.js"></script>
```

while the boop page can have:

``` html
<script src="common.js"></script>
<script src="boop.js"></script>
```

This approach using `-r` and `-x` works fine for a small number of split assets,
but there are plugins for automatically factoring out components which are
described in the
[partitioning section of the browserify handbook](https://github.com/browserify/browserify-handbook#partitioning).

## api example

You can use the API directly too:

``` js
var browserify = require('browserify');
var b = browserify();
b.add('./browser/main.js');
b.bundle().pipe(process.stdout);
```

# methods

``` js
var browserify = require('browserify')
```

## `browserify([files] [, opts])`

Returns a new browserify instance.

<dl>
<dt>
files
</dt>

<dd>
String, file object, or array of those types (they may be mixed) specifying entry file(s).
</dd>

<dt>
opts
</dt>

<dd>
Object.
</dd>
</dl>

`files` and `opts` are both optional, but must be in the order shown if both are
passed.

Entry files may be passed in `files` and / or `opts.entries`.

External requires may be specified in `opts.require`, accepting the same formats
that the `files` argument does.

If an entry file is a stream, its contents will be used. You should pass
`opts.basedir` when using streaming files so that relative requires can be
resolved.

`opts.entries` has the same definition as `files`.

`opts.noParse` is an array which will skip all require() and global parsing for
each file in the array. Use this for giant libs like jquery or threejs that
don't have any requires or node-style globals but take forever to parse.

`opts.transform` is an array of transform functions or modules names which will
transform the source code before the parsing.

`opts.ignoreTransform` is an array of transformations that will not be run,
even if specified elsewhere.

`opts.plugin` is an array of plugin functions or module names to use. See the
plugins section below for details.

`opts.extensions` is an array of optional extra extensions for the module lookup
machinery to use when the extension has not been specified.
By default browserify considers only `.js` and `.json` files in such cases.

`opts.basedir` is the directory that browserify starts bundling from for
filenames that start with `.`.

`opts.paths` is an array of directories that browserify searches when looking
for modules which are not referenced using relative path. Can be absolute or
relative to `basedir`. Equivalent of setting `NODE_PATH` environmental variable
when calling `browserify` command.

`opts.commondir` sets the algorithm used to parse out the common paths. Use
`false` to turn this off, otherwise it uses the
[commondir](https://www.npmjs.com/package/commondir) module.

`opts.fullPaths` disables converting module ids into numerical indexes. This is
useful for preserving the original paths that a bundle was generated with.

`opts.builtins` sets the list of built-ins to use, which by default is set in
`lib/builtins.js` in this distribution.

`opts.bundleExternal` boolean option to set if external modules should be
bundled. Defaults to true.

When `opts.browserField` is false, the package.json browser field will be ignored.

When `opts.insertGlobals` is true, always insert `process`, `global`,
`__filename`, and `__dirname` without analyzing the AST for faster builds but
larger output bundles. Default false.

When `opts.detectGlobals` is true, scan all files for `process`, `global`,
`__filename`, and `__dirname`, defining as necessary. With this option npm
modules are more likely to work but bundling takes longer. Default true.

When `opts.ignoreMissing` is true, ignore `require()` statements that don't
resolve to anything.

When `opts.debug` is true, add a source map inline to the end of the bundle.
This makes debugging easier because you can see all the original files if
you are in a modern enough browser.

When `opts.standalone` is a non-empty string, a standalone module is created
with that name and a [umd](https://github.com/forbeslindesay/umd) wrapper.
You can use namespaces in the standalone global export using a `.` in the string
name as a separator, for example `'A.B.C'`. The global export will be [sanitized
and camel cased](https://github.com/ForbesLindesay/umd#name-casing-and-characters).

Note that in standalone mode the `require()` calls from the original source will
still be around, which may trip up AMD loaders scanning for `require()` calls.
You can remove these calls with
[derequire](https://www.npmjs.com/package/derequire):

```
$ npm install -g derequire
$ browserify main.js --standalone Foo | derequire > bundle.js
```

`opts.insertGlobalVars` will be passed to
[insert-module-globals](https://www.npmjs.com/package/insert-module-globals)
as the `opts.vars` parameter.

`opts.externalRequireName` defaults to `'require'` in `expose` mode but you can
use another name.

`opts.bare` creates a bundle that does not include Node builtins, and does not
replace global Node variables except for `__dirname` and `__filename`.

`opts.node` creates a bundle that runs in Node and does not use the browser
versions of dependencies. Same as passing `{ bare: true, browserField: false }`.

Note that if files do not contain javascript source code then you also need to
specify a corresponding transform for them.

All other options are forwarded along to
[module-deps](https://www.npmjs.com/package/module-deps)
and [browser-pack](https://www.npmjs.com/package/browser-pack) directly.

## b.add(file, opts)

Add an entry file from `file` that will be executed when the bundle loads.

If `file` is an array, each item in `file` will be added as an entry file.

## b.require(file, opts)

Make `file` available from outside the bundle with `require(file)`.

The `file` param is anything that can be resolved by `require.resolve()`,
including files from `node_modules`. Like with `require.resolve()`, you must
prefix `file` with `./` to require a local file (not in `node_modules`).

`file` can also be a stream, but you should also use `opts.basedir` so that
relative requires will be resolvable.

If `file` is an array, each item in `file` will be required.
In `file` array form, you can use a string or object for each item. Object items
should have a `file` property and the rest of the parameters will be used for
the `opts`.

Use the `expose` property of opts to specify a custom dependency name.
`require('./vendor/angular/angular.js', {expose: 'angular'})` enables `require('angular')`

## b.bundle(cb)

Bundle the files and their dependencies into a single javascript file.

Return a readable stream with the javascript file contents or
optionally specify a `cb(err, buf)` to get the buffered results.

## b.external(file)

Prevent `file` from being loaded into the current bundle, instead referencing
from another bundle.

If `file` is an array, each item in `file` will be externalized.

If `file` is another bundle, that bundle's contents will be read and excluded
from the current bundle as the bundle in `file` gets bundled.

## b.ignore(file)

Prevent the module name or file at `file` from showing up in the output bundle.

If `file` is an array, each item in `file` will be ignored.

Instead you will get a file with `module.exports = {}`.

## b.exclude(file)

Prevent the module name or file at `file` from showing up in the output bundle.

If `file` is an array, each item in `file` will be excluded.

If your code tries to `require()` that file it will throw unless you've provided
another mechanism for loading it.

## b.transform(tr, opts={})

Transform source code before parsing it for `require()` calls with the transform
function or module name `tr`.

If `tr` is a function, it will be called with `tr(file)` and it should return a
[through-stream](https://github.com/substack/stream-handbook#through)
that takes the raw file contents and produces the transformed source.

If `tr` is a string, it should be a module name or file path of a
[transform module](https://github.com/browserify/module-deps#transforms)
with a signature of:

``` js
var through = require('through');
module.exports = function (file) { return through() };
```

You don't need to necessarily use the
[through](https://www.npmjs.com/package/through) module.
Browserify is compatible with the newer, more verbose
[Transform streams](http://nodejs.org/api/stream.html#stream_class_stream_transform_1)
built into Node v0.10.

Here's how you might compile coffee script on the fly using `.transform()`:

``` js
var coffee = require('coffee-script');
var through = require('through');

b.transform(function (file) {
    var data = '';
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
        this.queue(coffee.compile(data));
        this.queue(null);
    }
});
```

Note that on the command-line with the `-c` flag you can just do:

```
$ browserify -c 'coffee -sc' main.coffee > bundle.js
```

Or better still, use the [coffeeify](https://github.com/jnordberg/coffeeify)
module:

```
$ npm install coffeeify
$ browserify -t coffeeify main.coffee > bundle.js
```

If `opts.global` is `true`, the transform will operate on ALL files, despite
whether they exist up a level in a `node_modules/` directory. Use global
transforms cautiously and sparingly, since most of the time an ordinary
transform will suffice. You can also not configure global transforms in a
`package.json` like you can with ordinary transforms.

Global transforms always run after any ordinary transforms have run.

Transforms may obtain options from the command-line with
[subarg](https://www.npmjs.com/package/subarg) syntax:

```
$ browserify -t [ foo --bar=555 ] main.js
```

or from the api:

```
b.transform('foo', { bar: 555 })
```

In both cases, these options are provided as the second argument to the
transform function:

```
module.exports = function (file, opts) { /* opts.bar === 555 */ }
```

Options sent to the browserify constructor are also provided under
`opts._flags`. These browserify options are sometimes required if your transform
needs to do something different when browserify is run in debug mode, for
example.

## b.plugin(plugin, opts)

Register a `plugin` with `opts`. Plugins can be a string module name or a
function the same as transforms.

`plugin(b, opts)` is called with the browserify instance `b`.

For more information, consult the plugins section below.

## b.pipeline

There is an internal
[labeled-stream-splicer](https://www.npmjs.com/package/labeled-stream-splicer)
pipeline with these labels:

* `'record'` - save inputs to play back later on subsequent `bundle()` calls
* `'deps'` - [module-deps](https://www.npmjs.com/package/module-deps)
* `'json'` - adds `module.exports=` to the beginning of json files
* `'unbom'` - remove byte-order markers
* `'unshebang'` - remove #! labels on the first line
* `'syntax'` - check for syntax errors
* `'sort'` - sort the dependencies for deterministic bundles
* `'dedupe'` - remove duplicate source contents
* `'label'` - apply integer labels to files
* `'emit-deps'` - emit `'dep'` event
* `'debug'` - apply source maps
* `'pack'` - [browser-pack](https://www.npmjs.com/package/browser-pack)
* `'wrap'` - apply final wrapping, `require=` and a newline and semicolon

You can call `b.pipeline.get()` with a label name to get a handle on a stream pipeline
that you can `push()`, `unshift()`, or `splice()` to insert your own transform
streams.

## b.reset(opts)

Reset the pipeline back to a normal state. This function is called automatically
when `bundle()` is called multiple times.

This function triggers a 'reset' event.

# package.json

browserify uses the `package.json` in its module resolution algorithm, just like
node. If there is a `"main"` field, browserify will start resolving the package
at that point. If there is no `"main"` field, browserify will look for an
`"index.js"` file in the module root directory. Here are some more
sophisticated things you can do in the package.json:

## browser field

There is a special "[browser](https://gist.github.com/4339901)" field you can
set in your package.json on a per-module basis to override file resolution for
browser-specific versions of files.

For example, if you want to have a browser-specific module entry point for your
`"main"` field you can just set the `"browser"` field to a string:

``` json
"browser": "./browser.js"
```

or you can have overrides on a per-file basis:

``` json
"browser": {
  "fs": "level-fs",
  "./lib/ops.js": "./browser/opts.js"
}
```

Note that the browser field only applies to files in the local module, and like
transforms, it doesn't apply into `node_modules` directories.

## browserify.transform

You can specify source transforms in the package.json in the
`browserify.transform` field. There is more information about how source
transforms work in package.json on the
[module-deps readme](https://github.com/browserify/module-deps#transforms).

For example, if your module requires [brfs](https://www.npmjs.com/package/brfs), you
can add

``` json
"browserify": { "transform": [ "brfs" ] }
```

to your package.json. Now when somebody `require()`s your module, brfs will
automatically be applied to the files in your module without explicit
intervention by the person using your module. Make sure to add transforms to
your package.json dependencies field.

# events

## b.on('file', function (file, id, parent) {})
## b.pipeline.on('file', function (file, id, parent) {})

When a file is resolved for the bundle, the bundle emits a `'file'` event with
the full `file` path, the `id` string passed to `require()`, and the `parent`
object used by
[browser-resolve](https://github.com/defunctzombie/node-browser-resolve).

You could use the `file` event to implement a file watcher to regenerate bundles
when files change.

## b.on('package', function (pkg) {})
## b.pipeline.on('package', function (pkg) {})

When a package file is read, this event fires with the contents. The package
directory is available at `pkg.__dirname`.

## b.on('bundle', function (bundle) {})

When `.bundle()` is called, this event fires with the `bundle` output stream.

## b.on('reset', function () {})

When the `.reset()` method is called or implicitly called by another call to
`.bundle()`, this event fires.

## b.on('transform', function (tr, file) {})
## b.pipeline.on('transform', function (tr, file) {})

When a transform is applied to a file, the `'transform'` event fires on the
bundle stream with the transform stream `tr` and the `file` that the transform
is being applied to.

# plugins

For some more advanced use-cases, a transform is not sufficiently extensible.
Plugins are modules that take the bundle instance as their first parameter and
an option hash as their second.

Plugins can be used to do perform some fancy features that transforms can't do.
For example, [factor-bundle](https://www.npmjs.com/package/factor-bundle) is a
plugin that can factor out common dependencies from multiple entry-points into a
common bundle. Use plugins with `-p` and pass options to plugins with
[subarg](https://www.npmjs.com/package/subarg) syntax:

```
browserify x.js y.js -p [ factor-bundle -o bundle/x.js -o bundle/y.js ] \
  > bundle/common.js
```

For a list of plugins, consult the
[browserify-plugin tag](https://www.npmjs.com/browse/keyword/browserify-plugin)
on npm.

# list of source transforms

There is a [wiki page that lists the known browserify
transforms](https://github.com/browserify/browserify/wiki/list-of-transforms).

If you write a transform, make sure to add your transform to that wiki page and
add a package.json keyword of `browserify-transform` so that
[people can browse for all the browserify
transforms](https://www.npmjs.com/browse/keyword/browserify-transform) on npmjs.org.

# third-party tools

There is a [wiki page that lists the known browserify
tools](https://github.com/browserify/browserify/wiki/browserify-tools).

If you write a tool, make sure to add it to that wiki page and
add a package.json keyword of `browserify-tool` so that
[people can browse for all the browserify
tools](https://www.npmjs.com/browse/keyword/browserify-tool) on npmjs.org.

# changelog

Releases are documented in
[changelog.markdown](changelog.markdown) and on the
[browserify twitter feed](https://twitter.com/browserify).

# license

[MIT](./LICENSE)

![browserify!](./assets/browserify.png)
