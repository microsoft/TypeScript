# @gulp-sourcemaps/identity-map

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Gulp plugin for generating an identity sourcemap for a file.

## Example

```js
var identityMap = require('@gulp-sourcemaps/identity-map');

gulp.src(...)
  .pipe(sourcemaps.init())
  .pipe(identityMap()) // .js and .css files will get a generated sourcemap
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(...))
```

## API

### `identityMap()`

Returns an `objectMode` Transform stream that processes each file with a `.sourceMap` property and buffered contents. A sourcemap is generated and attached for each `.js` and `.css` file.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/@gulp-sourcemaps/identity-map.svg
[npm-url]: https://npmjs.org/package/@gulp-sourcemaps/identity-map
[npm-image]: http://img.shields.io/npm/v/@gulp-sourcemaps/identity-map.svg

[travis-url]: https://travis-ci.org/gulp-sourcemaps/identity-map
[travis-image]: http://img.shields.io/travis/gulp-sourcemaps/identity-map.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/phated/identity-map
[appveyor-image]: https://img.shields.io/appveyor/ci/phated/identity-map.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulp-sourcemaps/identity-map
[coveralls-image]: http://img.shields.io/coveralls/gulp-sourcemaps/identity-map.svg
