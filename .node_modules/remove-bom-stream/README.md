<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# remove-bom-stream

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Remove a UTF8 BOM at the start of the stream.

## Usage

```js
var fs = require('fs');
var concat = require('concat-stream');
var removeBOM = require('remove-bom-stream');

fs.createReadStream('utf8-file-with-bom.txt')
  .pipe(removeBOM())
  .pipe(concat(function(result) {
    // result won't have a BOM
  }));
```

## API

### `removeBOM()`

Returns a `through2` stream that will remove a BOM, given the data is a UTF8 Buffer with a BOM at the beginning. If the data is not UTF8 or does not have a BOM, the data is not changed and this becomes a normal passthrough stream.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/remove-bom-stream.svg
[npm-url]: https://npmjs.com/package/remove-bom-stream
[npm-image]: http://img.shields.io/npm/v/remove-bom-stream.svg

[travis-url]: https://travis-ci.org/gulpjs/remove-bom-stream
[travis-image]: http://img.shields.io/travis/gulpjs/remove-bom-stream.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/remove-bom-stream
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/remove-bom-stream.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/remove-bom-stream
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/remove-bom-stream/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
