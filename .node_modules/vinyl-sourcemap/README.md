<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# vinyl-sourcemap

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Add/write sourcemaps to/from Vinyl files.

## Usage

```js
sourcemap.add(file, function(err, updatedFile) {
  // updatedFile will have a .sourceMap property
});

// The 2nd argument can be given as a path string
sourcemap.write(file, './maps', function(err, updatedFile, sourcemapFile) {
  // sourcemapFile will be a Vinyl file to be written to some location
  // updatedFile will have the .contents property updated with a sourceMappingURL that resolves to sourcemapFile
});

// If not defined, the sourcemap is inlined
sourcemap.write(file, function(err, updatedFile, sourcemapFile) {
  // sourcemapFile is undefined
  // updatedFile will have the .contents property updated with a sourceMappingURL that is an inlined sourcemap
});
```

## API

### `sourcemap.add(file, callback)`

Takes a [Vinyl][vinyl] `file` object and a `callback` function. It attempts to parse an inline sourcemap or load an external sourcemap for the file. If a valid sourcemap is found, the `sources` & `sourcesContent` properties are resolved to actual files (if possible) and a fully resolved sourcemap is attached as `file.sourceMap`. If a sourcemap is not found, a stub sourcemap is generated for the file and attached as `file.sourceMap`.

Once all resolution is complete, the `callback(err, updatedFile)` is called with the `updatedFile`. If an error occurs, it will be passed as `err` and `updatedFile` will be undefined. __Note:__ The original file is mutated but `updatedFile` is passed to the callback as a convenience.

If the `file` is not a Vinyl object or the contents are streaming, an Error will be passed to the `callback`.

If the `file` has a `.sourceMap` property or the contents are null, the `callback` will be called immediately without mutation to the file.

All filesystem operations are optional & non-fatal so any errors will not be bubbled to the `callback`.

### `sourcemap.write(file, [outputPath,] callback)`

Takes a [Vinyl][vinyl] `file` object, (optionally) an `outputPath` string and a `callback` function.

If `outputPath` is not passed, an inline sourcemap will be generated from the `file.sourceMap` property and appended to the `file.contents`. Once the inline sourcemap is appended, the `callback(err, updatedFile)` is called with the `updatedFile`. If an error occurs, it will be passed as `err` and `updatedFile` will be undefined. __Note:__ The original file is mutated but `updatedFile` is passed to the callback as a convenience.

If `outputPath` is passed, a new Vinyl file will be generated using `file.cwd` and `file.base` from the original file, the path to the external sourcemap, and the `file.sourceMap` (as contents). The external location will be appended to the `file.contents` of the original file. Once the new file is created and location appended, the `callback(err, updatedFile, sourcemapFile)` is called with the `updatedFile` and the `sourcemapFile`. If an error occurs, it will be passed as `err` and `updatedFile`/`sourcemapFile` will be undefined. __Note:__ The original file is mutated but `updatedFile` is passed to the callback as a convenience.

If the `file` is not a Vinyl object or the contents are streaming, an Error will be passed to the `callback`.

If the `file` doesn't have a `.sourceMap` property or the contents are null, the `callback` will be called immediately without mutation to the file.

## License

MIT

[vinyl]: https://github.com/gulpjs/vinyl

[downloads-image]: http://img.shields.io/npm/dm/vinyl-sourcemap.svg
[npm-url]: https://npmjs.com/package/vinyl-sourcemap
[npm-image]: http://img.shields.io/npm/v/vinyl-sourcemap.svg

[travis-url]: https://travis-ci.org/gulpjs/vinyl-sourcemap
[travis-image]: http://img.shields.io/travis/gulpjs/vinyl-sourcemap.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/vinyl-sourcemap
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/vinyl-sourcemap.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/vinyl-sourcemap
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/vinyl-sourcemap/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
