# debug-fabulous [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url]

## Install

`npm install --save debug-fabulous`

## Purpose:

Wrapper / Extension around [visionmedia's debug](https://github.com/visionmedia/debug) to allow lazy evaluation of debugging via closure handling.

## Why would I consider using this library?

The main utilities added to this library is lazy log level evaluation. This allows whatever logged strings to only be created and evaluated if a log level is active. This can considerably reduce the amount of memory used in logging when you are not using.

With this in mind, there are no excuses to not log anything and everything as performance can be kept in check easily (via log levels).

### Proof

For analysis of the performance results are in [perfWith.out](./test/perf/perfWith.out) and [perfWithout.out](./test/perf/perfWithout.out).

In summary, the tests using this library are using 3 times less memory for the same logging statements (when the log levels are disabled).

## This library essentially wraps two things:

- [lazy-eval](./src/lazy-eval.js): debug closure handling
- [spawn](./src/spawn.js): spawns off existing namespaces for a sub namespace.

## Example:

For usage see the [tests](./test) or the example below.

```js
var debug = require('')();
// force namespace to be enabled otherwise it assumes process.env.DEBUG is setup
// debug.save('namespace');
// debug.enable(debug.load())
debug = debug('namespace'); // debugger in the namespace
debug(function(){return 'something to log' + someLargeHarryString;});
debug(() => 'something to log ${someLargeHarryString}');
debug('small out'); // prints namespace small out
var childDbg = debug.spawn('child'); // debugger in the namespace:child
childDbg('small out'); // prints namespace:child small out
var grandChildDbg = debug.spawn('grandChild'); // debugger in the namespace:child:grandChild
grandChildDbg('small out'); // prints namespace:child:grandChild small out
```

[npm-image]: https://img.shields.io/npm/v/debug-fabulous.svg
[npm-url]: https://www.npmjs.com/package/debug-fabulous
[travis-image]: https://img.shields.io/travis/nmccready/debug-fabulous.svg
[travis-url]: https://travis-ci.org/nmccready/debug-fabulous
