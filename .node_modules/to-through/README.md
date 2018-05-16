<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# to-through

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Wrap a ReadableStream in a TransformStream.

## Usage

```js
var from = require('from2');
var concat = require('concat-stream');
var toThrough = require('to-through');

var readable = from([' ', 'hello', ' ', 'world']);

// Can be used as a Readable or Transform
var maybeTransform = toThrough(readable);

from(['hi', ' ', 'there', ','])
  .pipe(maybeTransform)
  .pipe(concat(function(result) {
    // result.toString() === 'hi there, hello world'
  }));
```

## API

### `toThrough(readableStream)`

Takes a `readableStream` as the only argument and returns a `through2` stream. If the returned stream is piped before `nextTick`, the wrapped `readableStream` will not flow until the upstream is flushed. If the stream is not piped before `nextTick`, it is ended and flushed (acting as a proper readable).

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/to-through.svg
[npm-url]: https://npmjs.com/package/to-through
[npm-image]: http://img.shields.io/npm/v/to-through.svg

[travis-url]: https://travis-ci.org/gulpjs/to-through
[travis-image]: http://img.shields.io/travis/gulpjs/to-through.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/to-through
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/to-through.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/to-through
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/to-through/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
