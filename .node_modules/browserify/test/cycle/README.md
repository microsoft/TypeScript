browserify-bug-713
==================

substack/node-browserify#713 breaks resolving an identical module multiple time from different locations when the module has a circular require.

## Reproduce

Module requires two copies of the same module (identical apart from path) and the sub module has a circular require. 

## Example

This is the case with [readable-stream](https://github.com/isaacs/readable-stream). If two different modules depend on the same version readable-stream (and no npm dedupe), then both of those modules are required in the same project, browserify throws a `RangeError: Maximum call stack size exceeded`

See https://github.com/isaacs/readable-stream/blob/master/lib/_stream_writable.js#L134 and https://github.com/isaacs/readable-stream/blob/master/lib/_stream_duplex.js#L44

This issue is most likely related: substack/node-browserify#735
