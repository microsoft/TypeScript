through2-filter
===============

[![NPM](https://nodei.co/npm/through2-filter.png)](https://nodei.co/npm/through2-filter/)

This is a super thin wrapper around [through2](http://npm.im/through2) that works like `Array.prototype.filter` but for streams.

For when through2 is just too verbose :wink:

Note you will **NOT** be able to alter the content of the chunks. This is intended for filtering only. If you want to modify the stream content, use either `through2` or `through2-map`.

```js
var filter = require("through2-filter")

var skip = filter(function (chunk) {
  // skip buffers longer than 100
  return chunk.length < 100
})

// vs. with through2:
var skip = through2(function (chunk, encoding, callback) {
  // skip buffers longer than 100
  if (chunk.length < 100) this.push(chunk)
  return callback()
})

// Then use your filter:
source.pipe(skip).pipe(sink)

// Additionally accepts `wantStrings` argument to conver buffers into strings
var alphanum = new RegExp("^[A-Za-z0-1]+$")
var scrub = filter({wantStrings: true}, function (str) {
  return alphanum.exec(str)
})

// Works like `Array.prototype.filter` meaning you can specify a function that
// takes up to two* arguments: fn(element, index)
var skip10 = filter(function (element, index) {
  return index > 10
})
```

*Differences from `Array.prototype.filter`:
  * No third `array` callback argument. That would require realizing the entire stream, which is generally counter-productive to stream operations.
  * `Array.prototype.filter` doesn't modify the source Array, which is somewhat nonsensical when applied to streams.

API
---

`require("through2-filter")([options], fn)`
---

Create a `through2-filter` instance that will call `fn(chunk)`. If `fn(chunk)` returns "true" the chunk will be passed downstream. Otherwise it will be dropped.

`require("through2-filter").ctor([options], fn)`
---

Create a `through2-filter` Type that can be instantiated via `new Type()` or `Type()` to create reusable spies.

`require("through2-filter").obj([options], fn)`
---

Create a `through2-filter` that defaults to `objectMode = true`.

`require("through2-filter").objCtor([options], fn)`
---

Create a `through2-filter` Type that defaults to `objectMode = true`.

Options
-------

  * wantStrings: Automatically call chunk.toString() for the super lazy.
  * all other through2 options

LICENSE
=======

MIT
