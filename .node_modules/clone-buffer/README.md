<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# clone-buffer

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Easier Buffer cloning in node.

## Example

```js
var cloneBuffer = require('clone-buffer');

var buffer = new Buffer('test');
var cloned = cloneBuffer(buffer);
// buffer !== cloned
```

## API

### `cloneBuffer(buffer)`

Takes a `Buffer` object and returns a clone.  Throws if a non-`Buffer` is passed.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/clone-buffer.svg
[npm-url]: https://npmjs.org/package/clone-buffer
[npm-image]: http://img.shields.io/npm/v/clone-buffer.svg

[travis-url]: https://travis-ci.org/gulpjs/clone-buffer
[travis-image]: http://img.shields.io/travis/gulpjs/clone-buffer.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/clone-buffer
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/clone-buffer.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/clone-buffer
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/clone-buffer/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
