<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# value-or-function

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Normalize a value or function, applying extra args to the function

## Example

```js
var normalize = require('value-or-function');

// Values matching type are returned
var isEnabled = normalize('boolean', true);
// isEnabled === true

// Values not matching type return undefined
var isEnabled = normalize('boolean', 1);
// isEnabled === undefined

// Functions are called
var isEnabled = normalize('boolean', function() {
  return false;
});
// isEnabled === false

// Extra arguments are applied to function
var count = normalize('number', function(a, b) {
  return a + b;
}, 1, 2);
// count === 3

// Supply the function with context
var context = { c: 3 };
var count = normalize.call(context, 'number', function(a, b) {
  return a + b + this.c;
}, 1, 2);
// count === 6

// Values one of multiple types are returned
var isEnabled = normalize(['string', 'boolean'], true);
// isEnabled === true

// Provide a function as first argument to do custom coercion
var now = new Date();
var enabledSince = normalize(function(value) {
  if (value.constructor === Date) {
    return value;
  }
}, now);
// enabledSince === now

// Convenience methods are available for the built-in types
var result = normalize.object({});
var result = normalize.number(1);
var result = normalize.string('');
var result = normalize.symbol(Symbol());
var result = normalize.boolean(true);
var result = normalize.function(function() {});
var result = normalize.date(new Date());
```

## API

### `normalize(coercer, value[, ...appliedArguments])`

Takes a coercer function `coercer` to transform `value` to the desired type.
Also optionally takes any extra arguments to apply to `value` if `value` is a function.

If the return value of `coercer(value)` is not `null` or `undefined`, that value is returned.
Otherwise, if `value` is a function, that function is called with any extra arguments
supplied to `normalize`, and its return value is passed through the coercer.

If `coercer` is a string, it must be one of the built-in types (see below)
and the appropriate default coercer is invoked, optionally first reducing `value`
to a primitive type with `.valueOf()` if it is an Object.

If `coercer` is an array, each element is tried until one returns something other
than `null` or `undefined`, or it results in `undefined` if all of the elements yield `null` or `undefined`.

#### `normalize.object(value[, ...appliedArguments])`

Convenience method for `normalize('object', ...)`.

#### `normalize.number(value[, ...appliedArguments])`

Convenience method for `normalize('number', ...)`.

#### `normalize.string(value[, ...appliedArguments])`

Convenience method for `normalize('string', ...)`.

#### `normalize.symbol(value[, ...appliedArguments])`

Convenience method for `normalize('symbol', ...)`.

#### `normalize.boolean(value[, ...appliedArguments])`

Convenience method for `normalize('boolean', ...)`.

#### `normalize.function(value[, ...appliedArguments])`

Convenience method for `normalize('function', ...)`.

#### `normalize.date(value[, ...appliedArguments])`

Convenience method for `normalize('date', ...)`.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/value-or-function.svg
[npm-url]: https://npmjs.org/package/value-or-function
[npm-image]: http://img.shields.io/npm/v/value-or-function.svg

[travis-url]: https://travis-ci.org/gulpjs/value-or-function
[travis-image]: http://img.shields.io/travis/gulpjs/value-or-function.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/value-or-function
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/value-or-function.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/value-or-function
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/value-or-function/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
