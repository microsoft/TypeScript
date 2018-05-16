# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.4.0 - 2015-02-23

### Added
* Link to `timers-browserify-full`, which offers a larger, but much more exact,
  version of Node's `timers` library

### Changed
* `setTimeout` and `setInterval` return objects with the same API as the Node
  implementation, instead of just IDs

### Fixed
* `active` implementation actually has an effect, as in Node
* Replaced usages of `apply` that break in IE 8

## 1.3.0 - 2015-02-04

### Changed
* Prefer native versions of `setImmediate` and `clearImmediate` if they exist

## 1.2.0 - 2015-01-02

### Changed
* Update `process` dependency

## 1.1.0 - 2014-08-26

### Added
* `clearImmediate` available to undo `setImmediate`

## 1.0.3 - 2014-06-30

### Fixed
* Resume returning opaque IDs from `setTimeout` and `setInterval`

## 1.0.2 - 2014-06-30

### Fixed
* Pass `window` explicitly to `setTimeout` and others to resolve an error in
  Chrome

## 1.0.1 - 2013-12-28

### Changed
* Replaced `setimmediate` dependency with `process` for the `nextTick` shim

## 1.0.0 - 2013-12-10

### Added
* Guard against undefined globals like `setTimeout` in some environments

## 0.0.0 - 2012-05-30

### Added
* Basic functionality for initial release
