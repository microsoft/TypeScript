# beeper [![Build Status](https://travis-ci.org/sindresorhus/beeper.svg?branch=master)](https://travis-ci.org/sindresorhus/beeper)

> Make your terminal beep

![](https://cloud.githubusercontent.com/assets/170270/5261236/f8471100-7a49-11e4-81af-96cd09a522d9.gif)

Useful as an attention grabber e.g. when an error happens.


## Install

```
$ npm install --save beeper
```


## Usage

```js
var beeper = require('beeper');

beeper();
// beep one time

beeper(3);
// beep three times

beeper('****-*-*');
// beep, beep, beep, beep, pause, beep, pause, beep
```


## API

It will not beep if stdout is not TTY or if the user supplies the `--no-beep` flag.

### beeper([count|melody], [callback])

#### count

Type: `number`  
Default: `1`

How many times you want it to beep.

#### melody

Type: `string`

Construct your own melody by supplying a string of `*` for beep `-` for pause.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
