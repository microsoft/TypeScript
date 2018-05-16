# @gulp-sourcemaps/map-sources

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Gulp plugin for mapping sources of a sourcemap.

## Example

```js
var mapSources = require('@gulp-sourcemaps/map-sources');

gulp.src(...)
  .pipe(sourcemaps.init())
  .pipe(mapSources(function(sourcePath, file) {
    return '../' + sourcePath;
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(...))
```

## API

### `mapSources(mapFn)`

Takes a map function as the only argument. Returns an `objectMode` Transform stream.

#### `mapFn(sourcePath, file)`

The map function is called once per value of the `sources` array of a `sourceMap` attached to each [`Vinyl`][vinyl-url] object passed through the stream.  The map function is called with the `sourcePath` string from the `sources` array and the `file` object it originated from.  The return value replaces the original value in the array.

If a `Vinyl` object doesn't have a `sourceMap` or `sourceMap.sources` property, the file is passed through the stream without having the `mapFn` called.

All `sources` are normalized to use `/` instead of `\\` as path separators.

## License

MIT

[vinyl-url]: https://github.com/gulpjs/vinyl

[downloads-image]: http://img.shields.io/npm/dm/@gulp-sourcemaps/map-sources.svg
[npm-url]: https://npmjs.org/package/@gulp-sourcemaps/map-sources
[npm-image]: http://img.shields.io/npm/v/@gulp-sourcemaps/map-sources.svg

[travis-url]: https://travis-ci.org/gulp-sourcemaps/map-sources
[travis-image]: http://img.shields.io/travis/gulp-sourcemaps/map-sources.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/phated/map-sources
[appveyor-image]: https://img.shields.io/appveyor/ci/phated/map-sources.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulp-sourcemaps/map-sources
[coveralls-image]: http://img.shields.io/coveralls/gulp-sourcemaps/map-sources.svg
