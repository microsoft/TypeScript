# detective

find all calls to `require()` by walking the AST

[![build status](https://secure.travis-ci.org/browserify/detective.png)](http://travis-ci.org/browserify/detective)

# example

## strings

strings_src.js:

``` js
var a = require('a');
var b = require('b');
var c = require('c');
```

strings.js:

``` js
var detective = require('detective');
var fs = require('fs');

var src = fs.readFileSync(__dirname + '/strings_src.js');
var requires = detective(src);
console.dir(requires);
```

output:

```
$ node examples/strings.js
[ 'a', 'b', 'c' ]
```

# methods

``` js
var detective = require('detective');
```

## detective(src, opts)

Give some source body `src`, return an array of all the `require()` calls with
string arguments.

The options parameter `opts` is passed along to `detective.find()`.

## var found = detective.find(src, opts)

Give some source body `src`, return `found` with:

* `found.strings` - an array of each string found in a `require()`
* `found.expressions` - an array of each stringified expression found in a
`require()` call
* `found.nodes` (when `opts.nodes === true`) - an array of AST nodes for each
argument found in a `require()` call

Optionally:

* `opts.word` - specify a different function name instead of `"require"`
* `opts.nodes` - when `true`, populate `found.nodes`
* `opts.isRequire(node)` - a function returning whether an AST `CallExpression`
node is a require call
* `opts.parse` - supply options directly to
[acorn](https://npmjs.org/package/acorn) with some support for esprima-style
options `range` and `loc`
* `opts.ecmaVersion` - default: 9

# install

With [npm](https://npmjs.org) do:

```
npm install detective
```

# license

MIT
