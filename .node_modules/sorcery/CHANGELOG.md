# changelog

## 0.10.0

* Allow CLI to recurse over a directory ([#13](https://github.com/Rich-Harris/sorcery/issues/13))

## 0.9.4

* Remove caching mechanism due to collisions ([#74](https://github.com/Rich-Harris/sorcery/pull/74))

## 0.9.3

* Update dependencies, use Bublé instead of Babel

## 0.9.1-2

* Fix case-sensitive filenames

## 0.9.0

* Update build process

## 0.8.0

* Add ES6 build

## 0.7.0

* Use [sourcemap-codec](https://github.com/rich-harris/sourcemap-codec) instead of vlq

## 0.6.5

* Use rollup-babel

## 0.6.4

* Update dependencies
* General tidy-up

## 0.6.3

* New `writeSync` method - same options as `write` ([#16](https://github.com/Rich-Harris/sorcery/issues/16))
* User-supplied content is correctly used in `sourcesContent` with `loadSync` ([#16](https://github.com/Rich-Harris/sorcery/issues/16))

## 0.6.2

* Handle segments of length 1 (normal segments have a length of 4 or 5) ([#10](https://github.com/Rich-Harris/sorcery/issues/10))
* Fix `excludeContent` CLI option ([#12](https://github.com/Rich-Harris/sorcery/pull/12))
* Fix `sources` array on Windows ([#11](https://github.com/Rich-Harris/sorcery/pull/11))

## 0.6.1

* Handle URLs that look a bit like data URIs

## 0.6.0

* Use [rollup](https://github.com/rich-harris/rollup) for building, instead of esperanto

## 0.5.5

* sourceRoot is respected

## 0.5.4

* sourceMappingURLs are correctly encoded

## 0.5.3

* Better CSS sourcemap handling (old comments are removed, new comments are block-style)

## 0.5.2

* Handle CSS sourcemap comments

## 0.5.1

* Fix build definition to prevent ES6-only features appearing in dist files
* Hook up to Travis CI
* Update tests to not use gobble (since latest gobble uses sorcery by default)

## 0.5.0

* Allow user to supply content and sourcemaps, if available ([#8](https://github.com/Rich-Harris/sorcery/issues/8))
* Remove all existing sourceMappingURL comments
* Allow `base` to be specified on `chain.write()`, i.e. `chain.write({ base: somethingOtherThanDest })`
* Internal refactor

## 0.4.0

* Handle sourceMappingURLs with spaces ([#6](https://github.com/Rich-Harris/sorcery/issues/6))
* Encode URLs when writing sourceMappingURL comments

## 0.3.5

* Better handling of inline data URIs

## 0.3.4

* Ensure trailing newline on `chain.write()` ([#4](https://github.com/Rich-Harris/sorcery/issues/4))
* Upgrade dependencies

## 0.3.3

* Cache decodings for better performance
* Add `node.stat()` method for rudimentary profiling

## 0.3.2

* Significant (>2x) performance improvements (achieved by replacing `forEach` and `map` with `for`/`while` loops where appropriate, and avoiding hard-to-transpile destructuring)

## 0.3.1

* Correct behaviour on Windows ([#3](https://github.com/Rich-Harris/sorcery/issues/3))

## 0.3.0

* Handle browserify-style line mappings

## 0.2.5

* Re-architect as ES6 modules, add `jsnext:main` field to package.json

## 0.2.4

* `absolutePath` option ensures `sourceMappingURL` is an absolute path to the resulting `.map` file

## 0.2.3

* CLI now uses `chain.write()` internally

## 0.2.2

* `chain.write()` will overwrite the existing file, if no destination is supplied
* sorcery will use the `sourcesContent` array, rather than reading additional files, if possible

## 0.2.1

* Implement `chain.write()`
* Various bug fixes

## 0.2.0

* Redesigned API around `sorcery.load()` - consult the [docs](https://github.com/Rich-Harris/sorcery/wiki)
* Command line interface

## 0.1.1

* `sorcery.resolve()` fulfils with `null` if the target file has no sourcemap

## 0.1.0

* First release. Here be dragons.
