# syntax-error

Detect and report syntax errors in source code strings.

[![build status](https://secure.travis-ci.org/substack/node-syntax-error.png)](http://travis-ci.org/substack/node-syntax-error)

When you type `node src.js` you get a friendly error report about exactly where
the syntax error is. This module lets you check for syntax errors and report
them in a similarly friendly format that wrapping a try/catch around
`Function()` or `vm.runInNewContext()` doesn't get you.

# example

``` js
var fs = require('fs');
var check = require('syntax-error');

var file = __dirname + '/src.js';
var src = fs.readFileSync(file);

var err = check(src, file);
if (err) {
    console.error('ERROR DETECTED' + Array(62).join('!'));
    console.error(err);
    console.error(Array(76).join('-'));
}
```

---

```
$ node check.js
ERROR DETECTED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/home/substack/projects/node-syntax-error/example/src.js:5
        if (Array.isArray(x) res.push.apply(res, x);
                             ^
ParseError: Unexpected identifier
---------------------------------------------------------------------------
```

# methods

``` js
var check = require('syntax-error')
```

## var err = check(src, file, opts={})

Check the source code string `src` for syntax errors.
Optionally you can specify a filename `file` that will show up in the output.

If `src` has a syntax error, return an error object `err` that can be printed or
stringified.

If there are no syntax errors in `src`, return `undefined`.

Options will be passed through to [acorn-node](https://github.com/browserify/acorn-node).
acorn-node defaults to options that match the most recent Node versions.

## err.toString()

Return the long string description with a source snippet and a `^` under
pointing exactly where the error was detected.

# attributes

## err.message

short string description of the error type

## err.line

line number of the error in the original source (indexing starts at 1)

## err.column

column number of the error in the original source (indexing starts at 1)

# install

With [npm](http://npmjs.org) do:

```
npm install syntax-error
```

# license

MIT
