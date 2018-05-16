<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# fs-mkdirp-stream

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Ensure directories exist before writing to them.

## Usage

```js
var to = require('to2');
var from = require('from2');
var mkdirpStream = require('fs-mkdirp-stream');

from.obj([{ dirname: '/path/to/my/', path: '/path/to/my/file.js' }])
  .pipe(mkdirpStream.obj(function(obj, callback) {
    // callback can take 3 arguments (err, dirname, mode)
    callback(null, obj.dirname);
  }))
  .pipe(to.obj(function(obj) {
    // This will be called once the directory exists
    // obj === { dirname: '/path/to/my/', path: '/path/to/my/file.js' }
  }));
```

## API

### `mkdirpStream(resolver)`

Takes a `resolver` function or string and returns a `through2` stream.

If the `resolver` is a function, it will be called once per chunk with the signature `(chunk, callback)`. The `callback(error, dirpath, mode)` must be called with the `dirpath` to be created as the 2nd parameter or an `error` as the 1st parameter; optionally with a `mode` as the 3rd parameter.

If the `resolver` is a string, it will be created/ensured for each chunk (e.g. if it were deleted between chunks, it would be recreated). When using a string, a custom `mode` can't be used.

### `mkdirpStream.obj(resolver)`

The same as the top-level API but for object streams. See the example to see the benefit of object streams with this module.

## License

MIT

Contains a custom implementation of `mkdirp` originally based on https://github.com/substack/node-mkdirp (Licensed MIT/X11 - Copyright 2010 James Halliday) with heavy modification to better support custom modes.

[downloads-image]: http://img.shields.io/npm/dm/fs-mkdirp-stream.svg
[npm-url]: https://npmjs.com/package/fs-mkdirp-stream
[npm-image]: http://img.shields.io/npm/v/fs-mkdirp-stream.svg

[travis-url]: https://travis-ci.org/gulpjs/fs-mkdirp-stream
[travis-image]: http://img.shields.io/travis/gulpjs/fs-mkdirp-stream.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/fs-mkdirp-stream
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/fs-mkdirp-stream.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/fs-mkdirp-stream
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/fs-mkdirp-stream/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
