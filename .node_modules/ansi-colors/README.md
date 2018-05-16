# ansi-colors [![NPM version](https://img.shields.io/npm/v/ansi-colors.svg?style=flat)](https://www.npmjs.com/package/ansi-colors) [![NPM monthly downloads](https://img.shields.io/npm/dm/ansi-colors.svg?style=flat)](https://npmjs.org/package/ansi-colors)  [![NPM total downloads](https://img.shields.io/npm/dt/ansi-colors.svg?style=flat)](https://npmjs.org/package/ansi-colors) [![Linux Build Status](https://img.shields.io/travis/doowb/ansi-colors.svg?style=flat&label=Travis)](https://travis-ci.org/doowb/ansi-colors) [![Windows Build Status](https://img.shields.io/appveyor/ci/doowb/ansi-colors.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/doowb/ansi-colors)

> Collection of ansi colors and styles.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save ansi-colors
```

## Usage

This module exports an object of functions. Each function wraps a string with the ansi codes used to display the string with that color (or style). Use the wrapped string with `console.log`:

```js
var colors = require('ansi-colors');
console.log(colors.bold(colors.cyan('[info]')), colors.cyan('This is some information'));
console.log(colors.bold(colors.yellow('[warning]')), colors.yellow('This is a warning'));
console.error(colors.bold(colors.red('[ERROR]')), colors.red('Danger! There was an error!'));
```

![image](https://user-images.githubusercontent.com/995160/34897845-3150daae-f7be-11e7-9706-38c42461e0ee.png)

## Example

See the [example](./example.js) for more colors and styles.

## About

### Related projects

* [ansi-bgblack](https://www.npmjs.com/package/ansi-bgblack): The color bgblack, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgblack "The color bgblack, in ansi.")
* [ansi-bgblue](https://www.npmjs.com/package/ansi-bgblue): The color bgblue, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgblue "The color bgblue, in ansi.")
* [ansi-bgcyan](https://www.npmjs.com/package/ansi-bgcyan): The color bgcyan, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgcyan "The color bgcyan, in ansi.")
* [ansi-bggreen](https://www.npmjs.com/package/ansi-bggreen): The color bggreen, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bggreen "The color bggreen, in ansi.")
* [ansi-bgmagenta](https://www.npmjs.com/package/ansi-bgmagenta): The color bgmagenta, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgmagenta "The color bgmagenta, in ansi.")
* [ansi-bgred](https://www.npmjs.com/package/ansi-bgred): The color bgred, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgred "The color bgred, in ansi.")
* [ansi-bgwhite](https://www.npmjs.com/package/ansi-bgwhite): The color bgwhite, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgwhite "The color bgwhite, in ansi.")
* [ansi-bgyellow](https://www.npmjs.com/package/ansi-bgyellow): The color bgyellow, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bgyellow "The color bgyellow, in ansi.")
* [ansi-black](https://www.npmjs.com/package/ansi-black): The color black, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-black "The color black, in ansi.")
* [ansi-blue](https://www.npmjs.com/package/ansi-blue): The color blue, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-blue "The color blue, in ansi.")
* [ansi-bold](https://www.npmjs.com/package/ansi-bold): The color bold, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-bold "The color bold, in ansi.")
* [ansi-cyan](https://www.npmjs.com/package/ansi-cyan): The color cyan, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-cyan "The color cyan, in ansi.")
* [ansi-dim](https://www.npmjs.com/package/ansi-dim): The color dim, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-dim "The color dim, in ansi.")
* [ansi-gray](https://www.npmjs.com/package/ansi-gray): The color gray, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-gray "The color gray, in ansi.")
* [ansi-green](https://www.npmjs.com/package/ansi-green): The color green, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-green "The color green, in ansi.")
* [ansi-grey](https://www.npmjs.com/package/ansi-grey): The color grey, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-grey "The color grey, in ansi.")
* [ansi-hidden](https://www.npmjs.com/package/ansi-hidden): The color hidden, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-hidden "The color hidden, in ansi.")
* [ansi-inverse](https://www.npmjs.com/package/ansi-inverse): The color inverse, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-inverse "The color inverse, in ansi.")
* [ansi-italic](https://www.npmjs.com/package/ansi-italic): The color italic, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-italic "The color italic, in ansi.")
* [ansi-magenta](https://www.npmjs.com/package/ansi-magenta): The color magenta, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-magenta "The color magenta, in ansi.")
* [ansi-red](https://www.npmjs.com/package/ansi-red): The color red, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-red "The color red, in ansi.")
* [ansi-reset](https://www.npmjs.com/package/ansi-reset): The color reset, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-reset "The color reset, in ansi.")
* [ansi-strikethrough](https://www.npmjs.com/package/ansi-strikethrough): The color strikethrough, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-strikethrough "The color strikethrough, in ansi.")
* [ansi-underline](https://www.npmjs.com/package/ansi-underline): The color underline, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-underline "The color underline, in ansi.")
* [ansi-white](https://www.npmjs.com/package/ansi-white): The color white, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-white "The color white, in ansi.")
* [ansi-wrap](https://www.npmjs.com/package/ansi-wrap): Create ansi colors by passing the open and close codes. | [homepage](https://github.com/jonschlinkert/ansi-wrap "Create ansi colors by passing the open and close codes.")
* [ansi-yellow](https://www.npmjs.com/package/ansi-yellow): The color yellow, in ansi. | [homepage](https://github.com/jonschlinkert/ansi-yellow "The color yellow, in ansi.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** |  
| --- | --- |  
| 10 | [doowb](https://github.com/doowb) |  
| 3  | [jonschlinkert](https://github.com/jonschlinkert) |  

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](https://twitter.com/doowb)

### License

Copyright © 2018, [Brian Woodward](https://github.com/doowb).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on January 12, 2018._