# cloneable-readable

[![Build Status](https://travis-ci.org/mcollina/cloneable-readable.svg?branch=master)](https://travis-ci.org/mcollina/cloneable-readable)

Clone a Readable stream, safely.

```js
'use strict'

var cloneable = require('cloneable-readable')
var fs = require('fs')
var pump = require('pump')

var stream = cloneable(fs.createReadStream('./package.json'))

pump(stream.clone(), fs.createWriteStream('./out1'))

// simulate some asynchronicity
setImmediate(function () {
  pump(stream, fs.createWriteStream('./out2'))
})
```

**cloneable-readable** automatically handles `objectMode: true`.

This module comes out of an healthy discussion on the 'right' way to
clone a Readable in https://github.com/gulpjs/vinyl/issues/85
and https://github.com/nodejs/readable-stream/issues/202. This is my take.

**YOU MUST PIPE ALL CLONES TO START THE FLOW**

You can also attach `'data'` and `'readable'` events to them.

## API

### cloneable(stream)

Create a `Cloneable` stream.
A Cloneable has a `clone()` method to create more clones.
All clones must be resumed/piped to start the flow.

### cloneable.isCloneable(stream)

Check if `stream` needs to be wrapped in a `Cloneable` or not.

## Acknowledgements

This project was kindly sponsored by [nearForm](http://nearform.com).

## License

MIT
