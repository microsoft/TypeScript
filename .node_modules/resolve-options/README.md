<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# resolve-options

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Resolve an options object based on configuration.

## Usage

```js
// This example assumes a Vinyl file

var createResolver = require('resolve-options');

var config = {
  cwd: {
    type: 'string',
    default: process.cwd
  },
  sourcemaps: {
    type: 'boolean',
    default: false
  },
  since: {
    type: ['date', 'number']
  },
  read: {
    type: 'boolean'
  }
};

var options = {
  sourcemaps: true,
  since: Date.now(),
  read: function(file) {
    return (file.extname !== '.mp4');
  }
};

var resolver = createResolver(config, options);

var cwd = resolver.resolve('cwd', file);
// cwd === process.cwd()

var sourcemaps = resolver.resolve('sourcemaps', file);
// sourcemaps === true

var read = resolver.resolve('read', file);
// Given .mp4, read === false
// Given .txt, read === true
```

## API

### `createResolver([config,] [options])`

Takes a `config` object that describes the options to accept/resolve and an `options` object (usually passed by a user) to resolve against the `config`. Returns a `resolver` that contains a `resolve` method for realtime resolution of options.

The `config` object takes the following structure:
```graphql
config {
  [optionKey] {
    type // string, array or function
    default // any value or function
  }
}
```

Each option is represented by its `optionKey` in the `config` object. It must be an object with a `type` property.

The `type` property must be a string, array or function which will be passed to the [`value-or-function`][value-or-function] module (functions will be bound to the resolver to allow for dependent options).

A `default` property may also be specified as a fallback if the option isn't available or is invalid. The `default` value can be any value or a function (functions will be bound to the resolver to allow for dependent defaults). __Note:__ `default` values are not type-validated by the `value-or-function` module.

### `resolver.resolve(optionKey, [...arguments])`

Takes an `optionKey` string and any number of `arguments` to apply if an option is a function. Returns the resolved value for the `optionKey`.

## License

MIT

[value-or-function]: https://github.com/gulpjs/value-or-function

[downloads-image]: http://img.shields.io/npm/dm/resolve-options.svg
[npm-url]: https://npmjs.com/package/resolve-options
[npm-image]: http://img.shields.io/npm/v/resolve-options.svg

[travis-url]: https://travis-ci.org/gulpjs/resolve-options
[travis-image]: http://img.shields.io/travis/gulpjs/resolve-options.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/resolve-options
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/resolve-options.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/resolve-options
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/resolve-options/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
