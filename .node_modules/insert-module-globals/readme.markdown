# insert-module-globals

insert implicit module globals
(`__filename`, `__dirname`, `process`, `global`, and `Buffer`)
as a browserify-style transform

[![build status](https://secure.travis-ci.org/browserify/insert-module-globals.png)](http://travis-ci.org/browserify/insert-module-globals)

# example

``` js
var mdeps = require('module-deps');
var bpack = require('browser-pack');
var insert = require('insert-module-globals');
function inserter (file) {
    return insert(file, { basedir: __dirname + '/files' });
}

var files = [ __dirname + '/files/main.js' ];
mdeps(files, { transform: inserter })
    .pipe(bpack({ raw: true }))
    .pipe(process.stdout)
;
```

```
$ node example/insert.js | node
in main.js: {"__filename":"/main.js","__dirname":"/"}
in foo/index.js: {"__filename":"/foo/index.js","__dirname":"/foo"}
```

or use the command-line scripts:

```
$ module-deps main.js | insert-module-globals | browser-pack | node
in main.js: {"__filename":"/main.js","__dirname":"/"}
in foo/index.js: {"__filename":"/foo/index.js","__dirname":"/foo"}
```

or use insert-module-globals as a transform:

```
$ module-deps main.js --transform insert-module-globals | browser-pack | node
in main.js: {"__filename":"/main.js","__dirname":"/"}
in foo/index.js: {"__filename":"/foo/index.js","__dirname":"/foo"}
```

# methods

``` js
var insertGlobals = require('insert-module-globals')
```

## var inserter = insertGlobals(file, opts)

Return a transform stream `inserter` for the filename `file` that will accept a
javascript file as input and will output the file with a closure around the
contents as necessary to define extra builtins.

When `opts.always` is true, wrap every file with all the global variables
without parsing. This is handy because parsing the scope can take a long time,
so you can prioritize fast builds over saving bytes in the final output. When
`opts.always` is truthy but not true, avoid parsing but perform a quick test to
determine if wrapping should be skipped.

Use `opts.vars` to override the default inserted variables, or set
`opts.vars[name]` to `undefined` to not insert a variable which would otherwise
be inserted.

`opts.vars` properties with a `.` in their name will be executed instead of the
parent object if ONLY that property is used. For example, `"Buffer.isBuffer"`
will mask `"Buffer"` only when there is a `Buffer.isBuffer()` call in a file and
no other references to `Buffer`.

If `opts.debug` is true, an inline source map will be generated to compensate
for the extra lines.

# events

## inserter.on('global', function (name) {})

When a global is detected, the inserter stream emits a `'global'` event.

# usage

```
usage: insert-module-globals {basedir}
```

# install

With [npm](https://npmjs.org), to get the library do:

```
npm install insert-module-globals
```

and to get the bin script do:

```
npm install -g insert-module-globals
```

# insert custom globals.

`insert-module-globals` can also insert arbitary globals into files.
Pass in an object of functions as the `vars` option.

``` js
var vars = {
    process: function (file, basedir) {
        return {
            id: "path/to/custom_process.js",
            source: customProcessContent
        }
    },
    Buffer: function (file, basedir) {
        return {
            id: 'path/to/custom_buffer.js',
            source: customProcessContent,
            //suffix is optional
            //it's used to extract the value from the module.
            //it becomes: require(...).Buffer in this case.
            suffix: '.Buffer'
        }
    },
    Math: function () {
        //if you return a string,
        //it's simply set as the value.
        return '{}'
        //^ any attempt to use Math[x] will throw!
    }
}

function inserter (file) {
    return insert(file, { vars: vars });
}
mdeps(files, { transform: inserter })
    .pipe(bpack({ raw: true }))
    .pipe(process.stdout)
```


# license

MIT
