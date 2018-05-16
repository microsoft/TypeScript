# defined

return the first argument that is `!== undefined`

[![browser support](http://ci.testling.com/substack/defined.png)](http://ci.testling.com/substack/defined)

[![build status](https://secure.travis-ci.org/substack/defined.png)](http://travis-ci.org/substack/defined)

Most of the time when I chain together `||`s, I actually just want the first
item that is not `undefined`, not the first non-falsy item.

This module is like the defined-or (`//`) operator in perl 5.10+.

# example

``` js
var defined = require('defined');
var opts = { y : false, w : 4 };
var x = defined(opts.x, opts.y, opts.w, 100);
console.log(x);
```

```
$ node example/defined.js
false
```

The return value is `false` because `false` is the first item that is
`!== undefined`.

# methods

``` js
var defined = require('defined')
```

## var x = defined(a, b, c...)

Return the first item in the argument list `a, b, c...` that is `!== undefined`.

If all the items are `=== undefined`, return undefined.

# install

With [npm](https://npmjs.org) do:

```
npm install defined
```

# license

MIT
