This is the codebase for a native port of the TypeScript compiler and language server.
The source directories of interest that we have are:

- `internal` - Contains the compiler and language server code.
- `_extension` - Contains a preview VS Code extension code that integrates with the language server.
- `_submodules/TypeScript` - the stable TypeScript repository, checked out at the appropriate commit.

Most of our development takes place in the `internal` directory, and most behaviors can be tested via compiler tests.

Most development on the codebase is in Go.
Standard Go commands and practices apply, but we primarily use a tool called `hereby` to build, run tests, and other tasks.
Run `npx hereby --tasks` to see all available commands.

```sh
npx hereby build  # Build the tsgo binary (not required for tests)
npx hereby test   # Run tests
npx hereby format # Format the code
npx hereby lint   # Run linters

# To run a specific compiler test:
go test -run='TestSubmodule/<test name>' ./internal/testrunner  # For pre-existing "submodule" tests in _submodules/TypeScript
go test -run='TestLocal/<test name>' ./internal/testrunner      # For new "local" tests created in testdata/tests/cases
```

Always make sure code is formatted, linted, and tested before sending a pull request.

## Compiler Features, Fixes, and Tests

When fixing a bug or implementing a new feature, at least one minimal test case should always be added in advance to verify the fix.
This project primarily uses snapshot/baseline/golden tests rather than unit tests.
New compiler tests are written in `.ts`/`.tsx` files in the directory `testdata/tests/cases/compiler/`, and are written in the following format:

**Note:** Issues with editor features cannot be tested with compiler tests in `testdata/tests/cases/`. Editor functionality requires integration testing with the language server.

```ts
// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @strict: true
// @checkJs: true

// @filename: fileA.ts

export interface Person {
    name: string;
    age: number;
}

// @filename: fileB.js

/** @import { Person } from "./fileA" */

/**
* @param {Person} person
*/
function greet(person) {
    console.log(`Hello, ${person.name}!`);
}
```

**New compiler tests should always enable strict mode (`@strict: true`) unless the bug specifically involves non-strict mode behavior.**

Tests don't always need the above `@option`s specified, but they are common to specify or modify.
Tests can be run with multiple settings for a given option by using a comma-separated list (e.g. `@option: settingA,settingB`).
`@filename` is only required when a test has multiple files, or when writing a test for a single JavaScript file (where `allowJs` or `checkJs` is enabled).
You can see more tests in `_submodules/TypeScript/tests/cases/{compiler,conformance}`.

When tests are run, they will produce output files in the `testdata/baselines/local` directory.
**Test failures are fine** if they are just differences in output files.
A reduction/removal of `.diff` file baselines is **ideal** because it indicates the port has converged in behavior with the stable TypeScript codebase.
The new outputs can be diffed against `testdata/baselines/reference` to see if the output has changed.

Running

```sh
npx hereby baseline-accept
```

will update the baselines/snapshots, and `git diff` can be used to see what has changed.

It is ideal to implement features and fixes in the following order, and commit code after each step:

1. Write a minimal test case, or test cases, that demonstrate the bug or feature.   
1. Run the tests to ensure it fails (for a bug) or passes (for a feature). Then accept generated baselines (not applicable in the case of a crash).
1. Implement the fix or feature.
1. Run the tests again to ensure everything is working correctly. Accept the baselines.

It is fine to implement more and more of a feature across commits, but be sure to update baselines every time so that reviewers can measure progress.

## Code Porting Reference

The code in `internal` is ported from the code in `_submodules/TypeScript`.
When implementing features or fixing bugs, those files should be searched for similar functions when code is either missing or potentially wrong.
The TypeScript submodule serves as the reference implementation for behavior and functionality.

# Other Instructions

- Do not add or change existing dependencies unless asked to.
 