# Implementation of declaration emit

This implementation uses the the parser and printer from the TypeScript code base but replaces the binder and emit resolver with rewritten versions that do not depend on the type checker.

The declaration transform itself is mostly the same as the version in TypeScript (with some code erased and different imports)

## Package scripts

- `build`/ `watch` - Build the code
- `run-tests-parallel` - Emits declarations using tsc and the stand alone emitter for the tests in the TypeScript code base in parallel. Outputs to `tsc-tests`
- `run-test` - Emits declarations using tsc and the stand alone emitter for the tests in the TypeScript code base on a single thread, or filtered if you specify a test name. Outputs to `tsc-tests`
- `transform-tests-parallel` - Transforms the TypeScript tests t add missing type annotations and write them to `tsc-tests\updated-tests`. Runs in parallel
- `transform-test` - Transforms the TypeScript tests t add missing type annotations and write them to `tsc-tests\updated-tests`. Runs on a single thread. Accepts a test name or regex filter
- `run-transformed-tests-parallel` - Same as `run-tests-parallel` but runs on the transformed tests in `tsc-tests\updated-tests`
- `run-transformed-test`- Same as `run-test` but runs on the transformed tests in `tsc-tests\updated-tests`


Note: Tests currently just output the declarations, there is no console error message. Use an external diff tool to see differences.