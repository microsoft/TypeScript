# fancy-log

[![Travis Build Status](https://img.shields.io/travis/js-cli/fancy-log.svg?branch=master&label=travis&style=flat-square)](https://travis-ci.org/js-cli/fancy-log)

Log things, prefixed with a timestamp

__This module was pulled out of gulp-util for use inside the CLI__

## Usage

```js
var log = require('fancy-log');

log('a message');
// [16:27:02] a message

log.error('oh no!');
// [16:27:02] oh no!
```

## API

### `log(msg...)`

Logs the message as if you called `console.log` but prefixes the output with the
current time in HH:MM:ss format.

### `log.error(msg...)`

Logs the message as if you called `console.error` but prefixes the output with the
current time in HH:MM:ss format.

### `log.warn(msg...)`

Logs the message as if you called `console.warn` but prefixes the output with the
current time in HH:MM:ss format.


### `log.info(msg...)`

Logs the message as if you called `console.info` but prefixes the output with the
current time in HH:MM:ss format.

### `log.dir(msg...)`

Logs the message as if you called `console.dir` but prefixes the output with the
current time in HH:MM:ss format.

## License

MIT
