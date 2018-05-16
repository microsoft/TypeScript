# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.2.1](https://github.com/OverZealous/run-sequence/releases/tag/v2.2.0) - 2018-01-03

### Changed

- Replaced deprecated `gulp-util` with individual packages, thanks to [@demurgos](https://github.com/demurgos)

## [2.2.0](https://github.com/OverZealous/run-sequence/releases/tag/v2.2.0) - 2017-09-19

### Changed

- Fixed handling of `orchestration aborted` errors, thanks to [@memoryhole](https://github.com/memoryhole)

## [2.1.0](https://github.com/OverZealous/run-sequence/releases/tag/v2.1.0) - 2017-07-24

### Changed

- Added options object
    - Added option for reduced stack trace reporting
    - Added option to ignore falsey task names

## [2.0.0](https://github.com/OverZealous/run-sequence/releases/tag/v2.0.0) - 2017-06-30

### Changed

- Specified version numbers for all dependencies, due to Chalk dropping support for older Node versions

  This may be a **breaking change** if you depend on a newer release of any dependency, so you can continue using 1.2.2 in that case. 

## [1.2.2](https://github.com/OverZealous/run-sequence/releases/tag/v1.2.2) - 2016-06-29

### Changed

- Now passes the error back to GulpUtil.PluginError

-----

_1, 2, skip a few…_

-----

## [1.0.0](https://github.com/OverZealous/run-sequence/releases/tag/v1.0.0) - 2014-09-29

### Possible Breaking Change in version 1.0.0

In version 1.0 I've added a check that prevents the same task from showing up within any sequence.  This is to help reduce typo errors, as well as prevent the [silent exit bug when the same task occurred twice in a parallel sequence](https://github.com/OverZealous/run-sequence/issues/13).  The sequence will now fail immediately during the validation stage.

If this breaking change affects you, you'll need to take one of several actions:

1. Remove duplicate tasks if they are a mistake.
2. Filter unneeded duplicate tasks before passing them to `run-sequence`.
3. Rewrite your tasks or wrap your tasks within functions that can be called multiple times if for some reason you rely on this functionality.
4. Continue using `run-sequence` version 0.3.7 if it was working for you.

## Older

I'm not going to go through the old history at this point.