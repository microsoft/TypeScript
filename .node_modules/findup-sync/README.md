# findup-sync  [![Build Status](https://travis-ci.org/js-cli/node-findup-sync.svg)](https://travis-ci.org/js-cli/node-findup-sync)  [![NPM version](https://badge.fury.io/js/findup-sync.svg)](http://badge.fury.io/js/findup-sync)

> Find the first file matching a given pattern in the current directory or the nearest ancestor directory.

Matching is done with [micromatch][], please report any matching related issues on that repository. 

## Install with [npm](npmjs.org)

```bash
npm i findup-sync --save
```

## Usage

```js
var findup = require('findup-sync');
findup(patternOrPatterns [, micromatchOptions]);

// Start looking in the CWD.
var filepath1 = findup('{a,b}*.txt');

// Start looking somewhere else, and ignore case (probably a good idea).
var filepath2 = findup('{a,b}*.txt', {cwd: '/some/path', nocase: true});
```

* `patterns` **{String|Array}**: Glob pattern(s) or file path(s) to match against.    
* `options` **{Object}**: Options to pass to [micromatch]. Note that if you want to start in a different directory than the current working directory, specify a `cwd` property here.    
* `returns` **{String}**: Returns the first matching file.

## Running tests

Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/)

For bugs and feature requests, [please create an issue](https://github.com/cowboy/node-findup-sync/issues).

## Release History

2017-08-07 - v2.0.0 - Drop node 0.8 support, Bump all dependencies (including some Majors)  
2017-04-18 - v1.0.0 - Major bump from stable 0.4.3  
2015-01-30 - v0.4.0 - Refactored, not also uses [micromatch][] instead of minimatch.  
2015-09-14 - v0.3.0 - updated glob to ~5.0.  
2014-12-17 - v0.2.1 - Updated to glob 4.3.  
2014-12-16 - v0.2.0 - Removed lodash, updated to glob 4.x.  
2014-03-14 - v0.1.3 - Updated dependencies.  
2013-03-08 - v0.1.2 - Updated dependencies. Fixed a Node 0.9.x bug. Updated unit tests to work cross-platform.  
2012-11-15 - v0.1.1 - Now works without an options object.  
2012-11-01 - v0.1.0 - Initial release.  

## Authors

**"Cowboy" Ben Alman**
 
+ [github/cowboy](https://github.com/cowboy)
+ [twitter/cowboy](http://twitter.com/cowboy) 

## License

Copyright (c) 2012-2016 "Cowboy" Ben Alman  
Released under the MIT license

[micromatch]: http://github.com/jonschlinkert/micromatch
