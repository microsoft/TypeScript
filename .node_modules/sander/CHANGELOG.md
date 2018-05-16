# changelog

## 0.5.1

* Update dependencies

## 0.5.0

* Update dependencies
* Simplify build process

## 0.4.0

* Add ES6 build

## 0.3.8

* `sander.writeFile` and `sander.appendFile` return promises that resolve with the data written or appended

## 0.3.7

* Previous version introduced a bug that affected older versions of Node.js – now fixed

## 0.3.6

* In Node.js 4, buffers are created in JavaScript – replace `!== '[object Buffer]'` check with `=== '[object Object]'`

## 0.3.5

* `sander.writeFile` and `sander.appendFile`, and their sync equivalents, can take a final `options` argument specifying e.g. encoding ([#6](https://github.com/Rich-Harris/sander/pull/6))

## 0.3.4

* Fix `symlinkOrCopy` on Windows ([#4](https://github.com/Rich-Harris/sander/pull/4)) - thanks [@clintwood](https://github.com/clintwood)

## 0.3.3

* Reinstate graceful-fs to avoid EMFILE errors

## 0.3.2

* Create intermediate directories when symlinking

## 0.3.1

* Include dist files in npm package. (Whoops!)

## 0.3.0

* Rewrote as ES6 modules
* Added `symlinkOrCopy` and `symlinkOrCopySync` methods, inspired by [symlink-or-copy](https://github.com/broccolijs/node-symlink-or-copy)

## 0.2.4

* Add `appendFile` and `appendFileSync` methods ([#2](https://github.com/Rich-Harris/sander/issues/2))

## 0.2.2-0.2.3

* Appeasing the npm gods

## 0.2.1

* `sander.copydir()` no longer fails with empty directories

## 0.2.0

* Now using [graceful-fs](https://github.com/isaacs/node-graceful-fs), to prevent EMFILE errors from ruining your day
* Intermediate directories are created by `sander.link()`, `sander.rename()` and their synchronous equivalents
