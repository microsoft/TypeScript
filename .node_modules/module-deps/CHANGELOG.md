# module-deps Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 6.0.2 - 2018-03-28
* Fix missing 'file' event when file has a syntax error [#146](https://github.com/browserify/module-deps/pull/146)

## 6.0.1 - 2018-03-27
* Fix crash when file has a transform and a syntax error [#145](https://github.com/browserify/module-deps/pull/145)

## 6.0.0 - 2018-02-07
* Ignore package.json files that do not contain JSON objects [#142](https://github.com/browserify/module-deps/pull/142)
* Don't preserve symlinks when resolving transforms, matching Node resolution behaviour [#133](https://github.com/browserify/module-deps/pull/133)
* Fix 'file' events with `persistentCache` [#127](https://github.com/browserify/module-deps/pull/127)
* Add dependencies to a file when transforms emit 'dep' event [#141](https://github.com/browserify/module-deps/pull/141)

## 5.0.1 - 2018-01-06
* Restore support for node < 4.0.0.

## 5.0.0 - 2018-01-02
* Update deps
* Drop support for node < 0.12 due due to detective dropping support
* Add engines field set to `>=4.0.0`
