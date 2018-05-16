<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# lead

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Sink your streams.

## Usage

```js
var from = require('from2');
var through = require('through2');
var sink = require('lead');

// Might be used as a Transform or Writeable
var maybeThrough = through(function(chunk, enc, cb) {
  // processing
  cb(null, chunk);
});

from(['hello', 'world'])
  // Sink it to behave like a Writeable
  .pipe(sink(maybeThrough))
```

## API

### `sink(stream)`

Takes a `stream` to sink and returns the same stream. Sets up event listeners to infer if the stream is being used as a `Transform` or `Writeable` stream and sinks it on `nextTick` if necessary. If the stream is being used as a `Transform` stream but becomes unpiped, it will be sunk. Respects `pipe`, `on('data')` and `on('readable')` handlers.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/lead.svg
[npm-url]: https://npmjs.com/package/lead
[npm-image]: http://img.shields.io/npm/v/lead.svg

[travis-url]: https://travis-ci.org/gulpjs/lead
[travis-image]: http://img.shields.io/travis/gulpjs/lead.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/lead
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/lead.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/lead
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/lead/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
