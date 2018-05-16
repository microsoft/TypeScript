# 16.2.2

Remove some extraneous files from the published package.

# 16.2.1

Fix relative `--external` paths on Windows.

https://github.com/browserify/browserify/pull/1704

Fix tests to work on Windows, and add Appveyor CI for Windows testing.

https://github.com/browserify/browserify/pull/1819

# 16.2.0

update the browser versions of `vm-browserify` and `string_decoder`.

`string_decoder` updates to the Node 8+ API.
`vm-browserify` replaces an unlicensed dependency by an MIT one.

https://github.com/browserify/browserify/pull/1829

# 16.1.1

add empty stub for the `perf_hooks` builtin module.

https://github.com/browserify/browserify/pull/1815

# 16.1.0

add `bare` and `node` options to the API, same as the `--bare` and `--node` CLI arguments.

https://github.com/browserify/browserify/pull/1804

# 16.0.0

add `--preserve-symlinks` option from Node 6.3

https://github.com/browserify/browserify/pull/1742
https://github.com/browserify/browserify/pull/1801

update the browser version of `events` to 2.0.0—this version adds methods like `prependListener` that were introduced in recent node versions, but it is also twice the size of events v1.x (2KB instead of 1KB).

https://github.com/browserify/browserify/pull/1803

Dynamically calculate `__dirname` and `__filename` when `--node` is passed

https://github.com/browserify/browserify/pull/1725

upgrade module-deps, see https://github.com/browserify/module-deps/releases/tag/v6.0.0

https://github.com/browserify/browserify/commit/e5e1ec8799f1007a56118ae46646e0048385ed84

# 15.2.0

create parent directories if they do not exist when `--outfile /x/y/z/bundle.js` is used

https://github.com/browserify/browserify/pull/995

add regression test for object rest spread syntax

https://github.com/browserify/browserify/pull/1798

# 15.1.0

restore support for node `< 4.0` until we can decide on a support schedule

# 15.0.0

fixed repository url in package.json.

https://github.com/browserify/browserify/commit/5ec19eed48a5f46cb48d44be8ffc2f6bfb73fbfb

update `module-deps` to 5.0.0, which enables requiring modules in backtick-enclosed strings.

https://github.com/browserify/browserify/pull/1785

dropped testing in node 0.10 and 0.12, set supported node versions to `>=4`

https://github.com/browserify/browserify/pull/1743
https://github.com/browserify/browserify/pull/1793

add support for passing arrays to the `exclude` and `ignore` methods.

https://github.com/browserify/browserify/pull/1769

# 14.5.0

update `os-browserify` to 0.3.0, which adds a shim for node.js's `os.homedir` method.

https://github.com/browserify/browserify/pull/1767

update `browserify-zlib` to 0.2.0, which adds support for dictionaries.

https://github.com/browserify/browserify/pull/1733

# 14.4.0

update `string_decoder` to 1.0.0, which matches the latest node.js behavior more closely.

https://github.com/substack/node-browserify/pull/1714

# 14.3.0

update `https-browserify` to 1.0.0, which matches node.js behavior more closely.

- throw exception if non-https URL is passed to `https.request` or `https.get`
- support passing string URL as first argument to `https.request` and `https.get`

https://github.com/substack/node-browserify/pull/1710

# 14.2.0

adds a --transform-key flag to the command-line tool

https://github.com/substack/node-browserify/pull/1709

# 14.1.0

writes to a temp outfile until success

Previously, browserify would overwrite output files when an error occurs.

https://github.com/substack/node-browserify/pull/1673
https://github.com/substack/node-browserify/issues/899

# 14.0.0

Updates the version of the buffer package, which drops support for IE8-10.

buffer v5 removes the `Object` implementation and relies on a single,
fast Typed Array (`Uint8Array`) implementation, greatly simplifying the
maintanence of the buffer package.

If IE8-10 support is critical to your web app, you can continue to rely on
browserify v13, or see the PR for other workarounds.

https://github.com/substack/node-browserify/pull/1678

# 13.3.0

updates the version for the assert package

https://github.com/substack/node-browserify/pull/1611

# 13.2.0

allow configuring transformKey from module-deps
https://github.com/substack/node-browserify/pull/1670

# 13.1.1

boost performance by memoizing calls to path.relative()

https://github.com/substack/node-browserify/pull/1544

# 13.1.0

exposes `opts.dedupe` and `--no-deupe` to optionally turn off deduping behavior:
[#1581](https://github.com/substack/node-browserify/pull/1581)

# 13.0.1

## Internal

[#1552](https://github.com/substack/node-browserify/pull/1552), [#1555](https://github.com/substack/node-browserify/pull/1555): Use native `Array.isArray` and drop `isarray` dep. ([@kt3k](https://github.com/kt3k))

# 13.0.0

This release bumps the [`buffer`](https://www.npmjs.com/package/buffer) dependency
to v4, which has one possible breaking change:

- The `buffer.toArrayBuffer()` method on `Buffer` instances has been removed.

(This is probably not a problem for 99.9% of users.)

This API was added in node v0.11.8 and
[removed before v0.12 was released](https://github.com/nodejs/node-v0.x-archive/issues/7609#issuecomment-42903457).
It was added to browserify's `buffer` implementation but was never removed when v0.12
 was released. `buffer` v4 removes it so we have full parity with node.js.

Going forward, to get an `ArrayBuffer` from a node.js-style `Buffer`, users should
just use `buffer.buffer`. This works because `Buffer` is a subclass of `Uint8Array`
in both the browser and node.js (since v3).

On the plus side, this release also includes:

- Performance improvements to `buffer` that
[increase the speed](https://github.com/feross/buffer/pull/92) of some buffer
methods by as much as 30%!

# 12.0.2

normalizes module paths on windows to consistently use `/`

https://github.com/substack/node-browserify/pull/1424#issuecomment-170143099

# 12.0.1

adds the previously failing tests and a small change necessary for transforms to
be applied properly for symlinked packages

https://github.com/substack/node-browserify/pull/1392

# 12.0.0

Node support changes: now testing against the latest node (currently 4.2.1).
node 0.8 is no longer supported, and iojs isn't actively tested.

Stream3 everywhere! Everything has been updated to use streams3.

Sourcemaps charset now uses an `=` instead of a `:`. This fixes certain issues
with Chinese characters in sourcemaps. See #753.

module-deps has been updated to fix root transforms on symlinked modules. See
https://github.com/substack/module-deps/pull/99.

stream-http, the module that provides `http` support, dropped IE8 support. If
you depend on this, see https://github.com/jhiesey/stream-http#ie8-note.

Removed `builtins` and `commondir` – both unused dependencies.

# 11.2.0

When `bundleExternal` is set to `false`, `process` and `buffer` are now correctly excluded. Also, using `--igv` via the CLI now works. That also means that `--bare` and `--node` actually insert `__filename` and `__dirname`.

https://github.com/substack/node-browserify/pull/1361

# 11.1.0

adds a `'.'` to extensions if it wasn't added

https://github.com/substack/node-browserify/pull/1380

# 11.0.1

The callback form of bundle() uses the returned output stream instead of the
pipeline so that the `'end'` event will fire on the bundle instance.

https://github.com/substack/watchify/pull/249#issuecomment-126061169

# 11.0.0

## streams3

The [`readable-stream`](https://npmjs.com/package/readable-stream) dependency was updated to `^2.0.0`. This package is inserted into bundles as `require('stream')`. Bundles will now get the latest streams implementation from io.js/node.js core, instead of an old version from node.js 0.11.x. Go forth and stream ALL THE DATA without fear!

## shiny new HTTP package

[John Hiesey](https://github.com/jhiesey) rewrote the [http-browserify](https://npmjs.org/package/http-browserify) package
to create [stream-http](https://npmjs.org/package/stream-http), an implemention of `http` that supports streaming in modern browsers. Before v11.0.0, in most situations when you used `http.get` or `http.request`, the entire request would buffer in memory until the download was complete, and a single `'data'` event was emitted with the entire response as a string.

`stream-http` uses the [Fetch API](https://fetch.spec.whatwg.org/) and various browser-specific XHR extensions to make binary streaming http requests work in as many browsers as possible.

The following browsers support true streaming, where only a small amount of the request has to be held in memory at once:

* Chrome >= 43 (using the `fetch` api)
* Firefox >= 9 (using `moz-chunked-arraybuffer` responseType with XHR)

The following browsers support pseudo-streaming, where the data is available before the request finishes, but the entire response must be held in memory:

* Safari >= 5
* IE >= 10
* Most other Webkit-based browsers, including the default Android browser

Older browsers will work, without streaming support. There is no support for IE6 or IE7.

Compared to `http-browserify`, it is not necessary to set `options.responseType`. The `responseType` property of the XHR object will be set automatically depending on what features are detected in the browser (although see `options.mode` in the [readme](https://github.com/jhiesey/stream-http) to see how you can optimize this choice manually).

The `response` is a streams3 stream, so all data is passed as `Buffer`s, unlike the variable types provided by the `'data'` event in `http-browserify`. This behavior tries to mimic the node core `http` module as closely as possible.

* [#1327](https://github.com/substack/node-browserify/pull/1327)

If you're brave, go ahead and give v11.0.0 a try today!

# 10.2.6

uses the non-sync version of fs.realpath

# 10.2.5

fixes an issue with symlinked files executing multiple times

https://github.com/substack/node-browserify/issues/1063
https://github.com/substack/node-browserify/pull/1318

# 10.2.4

fixes requiring an entry from another entry

remove unused dep "deep-equal" and unused file "lib/_exclude.js"

https://github.com/substack/node-browserify/pull/1268

# 10.2.3

fixes an errant space in the `--no-browser-field` flag alias
that kept it from working

https://github.com/substack/node-browserify/issues/1286

# 10.2.2

fix tests for tap@^1.1.0 (and update tap)

https://github.com/substack/node-browserify/pull/1276

# 10.2.1

housekeeping - removed unused code

https://github.com/substack/node-browserify/pull/1273

# 10.2.0

remove unnecessary "isDedupe" json check. this was a hack-fix for watchify <=2.4.

https://github.com/substack/node-browserify/pull/1244

fixes for the "noParse" path matcher.

https://github.com/substack/node-browserify/pull/1259

add syntax check cache. this speeds up rebuilds (like when using watchify).

https://github.com/substack/node-browserify/pull/1253

update to browser-pack@^5.0.0 - includes several fixes related to source maps.

https://github.com/substack/node-browserify/pull/1257

# 10.1.3

Replace jsonstream with JSONStream

https://github.com/substack/node-browserify/pull/1252

# 10.1.2

Replace JSONStream with jsonstream
Update deps to avoid jsonstream npm case problems

https://github.com/substack/node-browserify/pull/1247
https://github.com/substack/node-browserify/commit/1ca71e23

# 10.1.1

ensures that entry paths are always full paths

https://github.com/substack/node-browserify/pull/1248

# 10.1.0

adds `--no-browser-field` and `opts.browserField = false` behavior to turn off
the package.json browser field. This is useful if you want to make a bundle with
a target of node or some environment with shimmed node primitives.

A new alias `--node` sets `--no-browser-field` and `--bare`.

https://github.com/substack/node-browserify/pull/1240

# 10.0.0

## Possibly Breaking Change
The ‘process’ dependency was updated to ~0.11.0, this module is inserted into bundles as the ‘process’ global/dependency.
Previously, an unhandled error thrown in a ‘process.nextTick’ task would prevent any subsequent tasks from running, forever.
The task queue now recovers from this condition, but may do so on a future browser tick.
As part of this update, ‘process.nextTick’ now accepts variadic arguments, passed to the task, added to io.js in 1.8.1.

* [#1231](https://github.com/substack/node-browserify/pull/1231)
* [defunctzombie/node-process#38](https://github.com/defunctzombie/node-process/pull/38)
* [iojs/io.js#1077](https://github.com/iojs/io.js/pull/1077)

## Other changes

* Escapes JavaScript-unsafe characters from JSON. [#1211](https://github.com/substack/node-browserify/pull/1211)
* Removes ‘-v’ shortcut for ‘--version’ (conflicted with watchify) [#1222](https://github.com/substack/node-browserify/pull/1222)
* Updated ‘defined’, ‘punycode’, ‘module-deps’, and ‘xtend’ dependencies to reduce install size [#1230](https://github.com/substack/node-browserify/pull/1230)

# 9.0.8

makes `.require({ expose: 'name' })` and `require('name')` work at the same time

https://github.com/substack/node-browserify/issues/850
https://github.com/substack/node-browserify/pull/1202

# 9.0.7

fixes an issue with catching error events on the b.bundle() stream

https://github.com/substack/node-browserify/issues/1194
https://github.com/substack/node-browserify/pull/1195

# 9.0.6

republishing 9.0.5 in an attempt to satisfy npm.

# 9.0.5

sets the stream returned by bundle() to be readable-only

https://github.com/substack/node-browserify/pull/1187#issuecomment-89044008

# 9.0.4

handles the colon better for drive paths and improves the test suite for windows
users

https://github.com/substack/node-browserify/pull/1182
https://github.com/substack/node-browserify/pull/1183

# 9.0.3

fixes a problem with deduping for json files.

This caused problems for running bundle() multiple times on the same instance
with caching turned on, which people reported encountering using watchify.

https://github.com/substack/node-browserify/issues/1101
https://github.com/substack/watchify/issues/143

# 9.0.2

fixes a bug where transforms in `opts.transform` were getting run twice

https://github.com/substack/node-browserify/issues/1124
https://github.com/substack/node-browserify/pull/1128

# 9.0.1

fixes exposed files persisting across bundles

https://github.com/substack/node-browserify/pull/1030

# 9.0.0

updates browser-pack which uses umd 3.0.0.
This sligtly changes how `--standalone $name` works.

https://github.com/substack/browser-pack/pull/49
https://github.com/substack/node-browserify/pull/1105

Also some tidying up around handling expose that module-deps can do now:

https://github.com/substack/node-browserify/pull/1077

and some fixes to regressions involving the `'package'` event:

https://github.com/substack/node-resolve/issues/69

Upstream changes in resolve/browser-resolve mean that `require('foo/bar')` works
better with the package.json browser field. You can do something like:

``` json
{
  "browser": { "./bar": "whatever.js" }
}
```

# 8.1.3

uses / instead of \ for source map url separators on windows
https://github.com/substack/node-browserify/pull/1096

# 8.1.2

resolves mappings from the browser field for externals

https://github.com/substack/node-browserify/pull/1100

# 8.1.1

fixes an issue with resolving exposed packages relative to the basedir

https://github.com/substack/node-browserify/pull/1059
https://github.com/substack/node-browserify/issues/1039
https://github.com/daiweilu/browserify-broken-require

# 8.1.0

use assert@1.3, which fixes a bug in assert.deepEqual related to argument ordering,
and ensures assert.deepEqual continues working in Chrome 40 and Firefox 35.

use process@0.10, which adds process.umask() and a faster process.nextTick()
implementation.

https://github.com/substack/node-browserify/pull/1018
https://github.com/substack/node-browserify/pull/1041

# 8.0.3

passes opts.debug through to insert-module-globals so that is can insert inline
source maps for its modifications

# 8.0.2

ensures that transforms always execute in the order they were added

https://github.com/substack/node-browserify/pull/1043

# 8.0.1

fixes some file path leaks in deduped deps

https://github.com/substack/node-browserify/pull/994
https://github.com/substack/node-browserify/issues/951

# 8.0.0

In previous releases, the deduping logic was over-zealous about how it handled
module references for duplicates. The prior behavior would detect when the
dependency tree of a module matched an existing module in addition to having the
exact same source code to share an instance. This was originally designed to
support libraries like threejs that internally use `instanceof` checks that
don't usually work very well across multiple packages. This feature didn't pan
out and didn't work very well in practice.

Later, a better way of deduping emerged after some unrelated tweaks to
browser-pack to support source introspection for webworkers. The reflection form
of deduping using implicit arguments is now the only kind.

The deduping instance feature resulted in this bug:
https://github.com/substack/node-browserify/issues/1027
which created very surprising results when duplicate files were in use.

# 7.1.0

uses the new buffer@3.0.0, which passes node's own buffer test suite

https://github.com/substack/node-browserify/pull/1040

# 7.0.3

allows modules to be bundled with local paths and exposed at the same time

https://github.com/substack/node-browserify/pull/1033

# 7.0.2

fixes the global transform getting added each re-bundle

https://github.com/substack/node-browserify/issues/1026

# 7.0.1

fixes rebundling (used by watchify) when transforming

https://github.com/substack/node-browserify/issues/1012

also fixes https://github.com/substack/node-browserify/issues/1015

# 7.0.0

Global transforms are now resolved to an absolute path before walking files.
This fixes some bugs with local module versions taking precedence over global
transforms and unresolvable global transforms spanning system directories.

This is a small breaking change since now transform objects live in the pipeline
between the record and deps phases. This should only affect programs that expect
records in the pipeline to only contain file objects.

# 6.3.4

fixes a bug setting placeholder filenames on stream inputs to be properly unique

# 6.3.3

fixes an issue with the expose property when opts.fullPaths is enabled

This issue commonly crops up in watchify.

https://github.com/substack/node-browserify/pull/991
https://github.com/substack/node-browserify/issues/850

# 6.3.2

updates regexps that test for absolute and relative paths to work better on
windows

https://github.com/substack/node-browserify/pull/948

# 6.3.1

fixes ignoreTransform for the case where transforms were given in package.json
as an array

https://github.com/substack/node-browserify/pull/966

# 6.3.0

uses noParse for better parity with module-deps

https://github.com/substack/node-browserify/pull/954

# 6.2.0

fixes #!shebang syntax when --bare is in effect by adding an unshebang phase to
the pipeline

https://github.com/substack/node-browserify/issues/943

# 6.1.2

fixes the behavior for multiple external bundles

https://github.com/substack/node-browserify/issues/933

# 6.1.1

fixes a circular dependency issue with readable-stream

https://github.com/substack/node-browserify/pull/964
https://github.com/substack/node-browserify/issues/963

# 6.1.0

allows transforms to be ignored throughout the entire bundle

https://github.com/substack/node-browserify/pull/945

# 6.0.3

fixes a bug where module insert-module-globals would trigger too soon and
conflict with other transforms

https://github.com/substack/node-browserify/issues/867
https://github.com/substack/node-browserify/issues/895
https://github.com/substack/node-browserify/issues/855

# 6.0.2

upgrades process to 0.8.0
https://github.com/substack/node-browserify/pull/906

# 6.0.1

respects opts.expose in require()
https://github.com/substack/node-browserify/pull/907

# 6.0.0

resolves source map maths relative to the base url. This should help with more
reproducible builds.

https://github.com/substack/node-browserify/pull/923

Version 6 is a tiny but breaking change to how source map paths work.

Now all source map paths are relative by default. This makes it easier to have
deterministic debug builds across different systems and directories. If
browserify is installed in a project-local directory, all the source map paths
will be self-contained and relative against that location in node_modules.

# 5.13.1

bails early if opts.basedir is not the correct type
https://github.com/substack/node-browserify/pull/927

# 5.13.0

exposes global browserify options to transforms under opts._flags
https://github.com/substack/node-browserify/pull/910

# 5.12.2

fixes the array form of b.external()
https://github.com/substack/node-browserify/issues/930

# 5.12.1

dedupe deps when fullPaths is on
https://github.com/substack/node-browserify/pull/917
and fixes the crypto tests

# 5.12.0

adds back the array form for add() and require(), with extra places to add
options

# 5.11.2

fixes ignore for relative paths
in https://github.com/substack/node-browserify/issues/896

# 5.11.1

fixes exports across resets, which caused issues for watchify with exports
https://github.com/substack/node-browserify/pull/892

# 5.11.0

adds an implicit dependency on the original module during dedupe
https://github.com/substack/node-browserify/pull/880

# 5.10.1

fixes the command-line client to properly ignore paths that don't match a glob
https://github.com/substack/node-browserify/pull/866

# 5.10.0

adds back support for `.external(b)` on a browserify instance `b`
that was dropped on the v5 refactor

# 5.9.3

buffers the record pipeline phase to start outputting after the first tick
so that user plugins can capture and modify recorder output

# 5.9.2

fixes a bug with using --ignore to exclude node_modules packages on the command-line

https://github.com/substack/node-browserify/pull/845

# 5.9.1

improves the detection for --ignore

# 5.9.0

fixes bug with builtins that load json files (the 'constants' module),
new 'json' pipeline label

https://github.com/substack/module-deps/issues/46

# 5.8.0

allow optional extensions in bin/args

# 5.7.0

re-instates transforms after a reset and fixes exposing the transform events
properly

# 5.6.1

makes stream entry files deterministic

# 5.6.0

adds 'package' events from module-deps when a package.json file is read

# 5.5.0

adds back the `'bundle'` event and copies over options correctly to reset()

# 5.4.2

adds a note about derequire in standalone mode to the readme

# 5.4.1

fixes an error with basedir resolving plugins from names

# 5.4.0

also allows opts.plugin from the constructor like transform

# 5.3.0

passes `.file` on stream inputs through to transforms
https://github.com/substack/node-browserify/issues/744

# 5.2.1

sets require() for streams to not just be entry files

# 5.2.0

upgrades crypto-browserify to v3

# 5.1.1

updates --list to always print file paths

# 5.1.0

adds back `.plugin()` which was mistakenly omitted

# 5.0.8

fixes using debug and standalone at the same time
https://github.com/substack/node-browserify/issues/750

# 5.0.7

fixes command-line versions of -u and -x
https://github.com/substack/node-browserify/issues/821

# 5.0.6

test for --bare

# 5.0.5

fix for detectGlobals, --bare
https://github.com/substack/node-browserify/issues/803

# 5.0.4

fixes --no-bundle-external with globals

https://github.com/substack/node-browserify/issues/828

# 5.0.3

upgrades insert-module-globals to fix
https://github.com/substack/node-browserify/issues/834

# 5.0.2

fixes the changelog link https://github.com/substack/node-browserify/pull/835

# 5.0.1

adds an untracked test

# 5.0.0

At a glance:

* extensible internal labeled-stream-splicer pipeline
* bundle() - no longer accepts `opts`, callback gets a buffer
* b.deps(), b.pack(), opts.pack, opts.deps are gone
* can call bundle() multiple times on the same instance
* a better --noparse matcher
* id labeling integer index based instead of hash based
* derequire removed for performance reasons
* .external(bundle) has been removed (for now)
* semicolon at end of output
* hashing is gone so `expose: true` or explicit expose id is required for doing
multi-export bundles

Version 5 is a big rearranging of browserify internals with more places for
external code to hook into the build pipeline.

These changes are mostly aligned around the theme of making it easier for
external code to interface with browserify internals in a less hacky way.

## pipeline

Now the core of browserify is organized into a
[labeled-stream-splicer](https://npmjs.org/package/labeled-stream-splicer)
pipeline. This means that user code and plugins can hook into browserify by
pushing themselves onto the pipeline at a label:

``` js
var browserify = require('browserify');
var through = require('through2');
var bundle = browserify();

bundle.pipeline.get('deps').push(through.obj(function (row, enc, next) {
    console.log('DEP:', row.id);
    this.push(row);
    next();
}));
```

User code can remove existing transforms or add its own hooks. These are the
labeled sections you can get a handle on with `bundle.pipeline.get()`

* `'record'` - save inputs to play back later on subsequent `bundle()` calls
* `'deps'` - [module-deps](https://npmjs.org/package/module-deps)
* `'unbom'` - remove byte-order markers
* `'syntax'` - check for syntax errors
* `'sort'` - sort the dependencies for deterministic bundles
* `'dedupe'` - remove duplicate source contents
* `'label'` - apply integer labels to files
* `'emit-deps'` - emit `'dep'` event
* `'debug'` - apply source maps
* `'pack'` - [browser-pack](https://npmjs.org/package/browser-pack)
* `'wrap'` - apply final wrapping, `require=` and a newline and semicolon

Because there is now a proper pipeline, `opts.pack`, `opts.deps`, `b.deps()`,
and `b.pack()` are removed.

## bundle()

Big changes have been made to the `bundle()` function. All options have been
moved out of the `bundle(opts)` form and into the browserify constructor. Before
there was an unclear split between which arguments went into which function.

You can now call `bundle()` multiple times on the same instance, even in
parallel. This will greatly simplify the caching system under watchify and will
fix many long-standing bugs.

The callback to `bundle(cb)` is now called with `cb(err, buf)` instead of
`cb(err, string)` as before.

## labeling

The former hashing system is removed, in favor of file paths rooted at the
`opts.basedir`, or the cwd.

This removal means that browserify can be much more consistent about applying
integer ids, which avoids exposing system paths in bundle output.

Hashes are used internally for deduping purposes, but they operate on the
source content only.

## others

The matching logic in the `--noparse` feature is greatly improved.

derequire has been taken out of core, which should speed up `--standalone`.

# 4.2.3

reverts 4.2.2 due to breaking some existing use-cases

# 4.2.2

fixes a bug applying transforms to symlinked files by resolving the realpath
first https://github.com/substack/node-browserify/pull/831

# 4.2.1

SECURITY NOTICE

Make sure your installation of browserify is using syntax-error@1.1.1 or
later. there was a security vulnerability where a malicious file could
execute code when browserified.

The vulnerability involves breaking out of `Function()`, which was used to
check syntax for more informative errors. In node 0.10, `Function()` seems
to be implemented in terms of `eval()`, so malicious code can execute even
if the function returned by `Function()` was never called. node 0.11 does
not appear to be vulnerable.

Thanks to Cal Leeming [cal@iops.io]
for discovering and disclosing this bug!

# 4.2.0

upgrades http-browserify, crypto-browserify, and sets more versions to float
with ^ semvers

# 4.1.11

fixes a bug with transform argument handling https://github.com/substack/node-browserify/pull/795

# 4.1.10

upgrades browser-resolve to get opts.path fixes https://github.com/defunctzombie/node-browser-resolve/pull/43

# 4.1.9

upgrades resolve to fix relative NODE_PATH paths https://github.com/substack/node-resolve/pull/46

# 4.1.8

bumps the module-deps version to get an ordering bugfix https://github.com/substack/module-deps/pull/39 https://github.com/substack/node-browserify/pull/774

# 4.1.7

fixes ignoreMissing when set in the constructor https://github.com/substack/node-browserify/pull/785

# 4.1.6

emits the 'id' event on the correct instance https://github.com/substack/node-browserify/pull/780

# 4.1.5

added this document

# 4.1.4

fixes a bug in `ie<=8` support for querystring https://github.com/substack/node-browserify/issues/764

# 4.1.2

upgrades umd to fix some issues with --standalone https://github.com/substack/node-browserify/pull/714

# 4.1.1

makes deps() behave more like bundle() https://github.com/substack/node-browserify/issues/757 and fixes global transform precedence https://github.com/substack/node-browserify/issues/759

# 4.1.0

upgrades the version of buffer to ^2.3.0

# 4.0

Here are the new breaking changes in browserify v4. Most users should be unaffected.

## readable-stream

`require('stream')` is now using [readable-stream](https://npmjs.org/package/readable-stream) (but the classic-mode shim persists in stream-browserify just like in node core). This should result in much smaller files for all modules using a similar-enough version of readable-stream as browserify itself. Other modules should be relatively unaffected.

## removed .expose()

Removal of the previously-deprecated and obscure `bundle.expose()`.

## took out implicit reading from stdin

Previously if you invoked the browserify command without any entry files as arguments and stdin was a tty, stdin would be implicitly added as an entry file. This feature was causing problems so it has been removed. https://github.com/substack/node-browserify/issues/724#issuecomment-42731877

## more!

In the run-up to the 4.0, [module-deps](https://npmjs.org/package/module-deps) got an extensive rewrite with minimal test changes. Mostly it was just getting really messy because it was a giant ball-of-mud closure instead of a more straightforward prototype-based implementation with more clearly-defined methods.

The module-deps rewrite was triggered by [system paths showing up in build output](https://github.com/substack/node-browserify/issues/675) but was fixed in 3.46.1. The solution actually didn't end up needing changes in module-deps as originally anticipated but module-deps was in dire need of a cleanup.

# 3.46.1

fixes a bug exposing the host path of the process module in the bundle output https://github.com/substack/insert-module-globals/pull/32

# 3.46.0

allows array arguments in b.require(), b.add(), and b.external() https://github.com/substack/node-browserify/pull/742 from @spacepluk

# 3.45.0

renders complete stack traces where before they were getting truncated https://github.com/substack/node-browserify/pull/741  patch from @secoif

# 3.44.2

slims down the dependency payload by 20M https://github.com/substack/node-browserify/pull/736

# 3.44.1

fixes the recursion error many people were getting https://github.com/substack/node-browserify/pull/713  Thanks to @MattMcKegg  for isolating the bug!

# 3.44.0

upgrades module-deps to 1.10.0 to make all the packageFilter dir argument pathways are consistent

# 3.43.0

lets b.transform(opts, t) args to be swapped around since opts is more common as a last argument

# 3.42.0

passes through the dir parameter in opts.packageFilter from module-deps 1.10.0 https://github.com/substack/node-browserify/pull/731

# 3.41.0

has an option to disable external files, making it easier to run bundles in node for code coverage https://github.com/substack/node-browserify/pull/672

# 3.40.4

makes --list work again https://github.com/substack/node-browserify/pull/727

# 3.40.3

merges a patch for piping via stdin and --require at the same time https://github.com/substack/node-browserify/pull/728

# 3.40.2

upgrades module-deps to fix --list for $NODE_PATH https://github.com/substack/node-browserify/issues/726

# 3.40.1

upgrades module-deps to get this packageTransform bugfix https://github.com/substack/module-deps/pull/32

# 3.40.0

modifies the behavior of opts.builtins to be more useful and intuitive https://github.com/substack/node-browserify/pull/717

# 3.39.0

adds a zlib that has parity with node https://github.com/substack/node-browserify/pull/721

# 3.38.0

upgrades derequire which uses esprima-fb https://github.com/substack/node-browserify/pull/710

# 3.37.2

adds 'close' events back to the bundle stream. This should fix some issues with watchify.

# 3.37.1

fixes a bug with through being required in the bin/cmd.js instead of through2

# 3.37.0

also reverts that require('process') thing which was mistakenly briefly put in the builtins list

# 3.37.0

gives streams2 semantics for bundle() https://github.com/substack/node-browserify/pull/646

# 3.36.1

fixes a dumb bug with ^ for versions that don't work in old npm clients

# 3.36.0

adds require('process') and removes the path resolution for process out of insert-module-globals

# 3.35.0

adds an empty tls stub to the builtins list https://github.com/substack/node-browserify/issues/703

# 3.34.0

fixes a bug with transforms not being applied in deps() https://github.com/substack/node-browserify/pull/708

# 3.33.1

fixes a bug with options in --global-transform on the command-line https://github.com/substack/node-browserify/pull/705

# 3.33.0

fixes parsing errors while maintaining es6 support by switching to esprima-fb https://github.com/substack/node-browserify/issues/698

# 3.32.1

should be easier to shinkwrap and install on windows https://github.com/substack/node-browserify/pull/684

# 3.32.0

adds --full-path and opts.fullPath to always expand ids to full paths https://github.com/substack/node-browserify/pull/668#issuecomment-36586786

# 3.31.2

fixes a bug in the subarg argument parsing for multiple transforms https://github.com/substack/node-browserify/issues/678

# 3.31.1

uses process.cwd() as the default rebase target instead of commondir https://github.com/substack/node-browserify/pull/669#issuecomment-36078282

# 3.31.0

merges https://github.com/substack/node-browserify/pull/669  which should help with more deterministic builds across systems

# 3.30.4

fixes parsing the --insert-global-vars argument properly https://github.com/substack/node-browserify/pull/674

# 3.30.3

fixes exclude globbing in the arg parser https://github.com/substack/node-browserify/pull/676

# 3.30.2

included a fix for --no-builtins for non-wrapped modules https://github.com/substack/node-browserify/pull/666

# 3.30.1

upgrades buffer for a utf8 fix https://github.com/substack/node-browserify/pull/656

# 3.30.0

adds globs for -u, -i, and -x https://github.com/substack/node-browserify/issues/654

# 3.29.1

adds relatively-resolved paths to ignored and excluded files

# 3.29.0

upgrades http-browserify to 1.3.1

# 3.28.2

now always includes the full package.json content in the 'package' event

# 3.28.1

fixes a bug with stream entry order https://github.com/substack/node-browserify/pull/643

# 3.28.0

adds plugins for doing super fancy things like factored bundle output https://github.com/substack/node-browserify#plugins

# 3.27.1

fixes a bug resolving transform modules when browserify is under a symlink

# 3.27.0

adds transform configuration in the package.json browserify.transform field https://github.com/substack/module-deps#packagejson-transformkey

# 3.26.0

you can pass arguments to transforms https://github.com/substack/node-browserify/blob/master/bin/advanced.txt#L67-L77

# 3.25.2

fixes a bug where the transform event didn't fire while IO was pending

# 3.25.1

fixes the transform docs

# 3.25.0

adds 'bundle' and 'transform' events https://github.com/substack/node-browserify#bonbundle-function-bundle-

# 3.24.11

upgrades derequire to 0.6.0. That should be the last piece needed for full es6 syntax support.

# 3.24.10

expands the documentation for the package.json browser and browserify.transform fields https://github.com/substack/node-browserify#packagejson

# 3.24.9

fixes generator syntax and other es6-isms in browserify https://github.com/substack/node-browserify/issues/614

# 3.24.7

fixes noParse, which had accidentally been disabled in the insert-module-global changes and also closes https://github.com/substack/node-browserify/issues/504

# 3.24.6

similar to 3.24.5, 3.24.6 fixes some error reporting propagation from the browserify command

# 3.24.3

fixes how require('buffer').Buffer wasn't the same as implicit Buffer https://github.com/substack/node-browserify/issues/612

# 3.24.2

fixes where the output stream didn't emit "close" in standalone mode https://github.com/substack/node-browserify/pull/608

# 3.24.1

fixes an issue where --standalone combined with expose caused a syntax error https://github.com/substack/node-browserify/issues/489

# 3.24.0

removes require() calls from --standalone so you can require() a standalone bundle again

# 3.23.0

merges this tiny fix returning `this` in noParse() https://github.com/substack/node-browserify/pull/592

# 3.22.0

merges https://github.com/substack/node-browserify/pull/587  which changes the source map prefix from //@ to //#

# 3.21.0

standardizes the module missing error formats to have filename, parent, and type === 'not found' fields

# 3.20.1

has a fix for the case where stdin is implicitly treated as the input stream instead of a file

# 3.20.0

3.20.0 is out: parity with how $NODE_PATH works in node https://github.com/substack/node-browserify/issues/593

# 3.19.1

restores support for node 0.8 by upgrading concat-stream

# 3.0

A new [browserify](http://browserify.org) version is upon us, just in time for
the FESTIVE SEASON during which we in the northern hemisphere at mid to high
latitudes huddle for warmth around oxidizing hydrocarbons!

There are 2 big changes in v3 but most code should be relatively unaffected.

## shiny new Buffer

[feross](https://github.com/feross) forked
the [buffer-browserify](https://npmjs.org/package/buffer-browserify) package
to create
[native-buffer-browserify](https://npmjs.org/package/native-buffer-browserify),
a `Buffer` implementation that uses `Uint8Array` to get `buf[i]` notation and
parity with the node core `Buffer` api without the performance hit of the
previous implementation and a much smaller file size. The downside is that
`Buffer` now only works in browsers with `Uint8Array` and `DataView` support.
All the other modules should maintain existing browser support.

*Update*: a [shim was added](https://npmjs.org/package/typedarray)
to in 3.1 for Uint8Array and DataView support. Now you can use `Buffer` in every
browser.

## direct builtin dependencies

In v3, browserify no longer depends on
[browser-builtins](https://npmjs.org/package/browser-builtins), in favor of
depending on packages directly. Instead of having some separate packages and
some files in a `builtin/` directory like browser-builtins, browserify now uses
*only* external packages for the shims it uses. By only using external packages
we can keep browserify core focused purely on the static analysis and bundling
machinery while letting the individual packages worry about things like browser
compatibility and parity with the node core API as it evolves.

Individual, tiny packages should also be much easier for newcomers to contribute
packages toward because they won't need to get up to speed with all the other
pieces going on and the packages can have their own tests and documentation.
Additionally, each package may find uses in other projects beside browserify
more easily and if people want variations on the versions of shims that ship
with browserify core this is easier to do when everything is separate.

Back when we were using browser-builtins there was a large latency between
pushing out fixes to the individual packages and getting them into browserify
core because we had to wait on browser-builtins to upgrade the semvers in its
package.json. With direct dependencies we get much lower latency for package
upgrades and much more granular control over upgrading packages.

Here is the list of packages we now directly depend on in v3:

* [assert](https://npmjs.org/package/assert)
* [buffer](https://npmjs.org/package/native-buffer-browserify)
* [console](https://npmjs.org/package/console-browserify)
* [constants](https://npmjs.org/package/constants-browserify)
* [crypto](https://npmjs.org/package/crypto-browserify)
* [events](https://npmjs.org/package/events-browserify)
* [http](https://npmjs.org/package/http-browserify)
* [https](https://npmjs.org/package/https-browserify)
* [os](https://npmjs.org/package/os-browserify)
* [path](https://npmjs.org/package/path-browserify)
* [punycode](https://npmjs.org/package/punycode)
* [querystring](https://npmjs.org/package/querystring)
* [stream](https://npmjs.org/package/stream-browserify)
* [string_decoder](https://npmjs.org/package/string_decoder)
* [timers](https://npmjs.org/package/timers-browserify)
* [tty](https://npmjs.org/package/tty-browserify)
* [url](https://npmjs.org/package/url)
* [util](https://npmjs.org/package/util)
* [vm](https://npmjs.org/package/vm-browserify)
* [zlib](https://npmjs.org/package/zlib-browserify)

That's it! If you're bold enough to give v3 a spin, just do:

```
npm install -g browserify
```
