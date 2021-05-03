## The TypeScript Compiler's Tests

## Running the Tests

To run all tests, invoke `runtests-parallel` target using gulp:

```Shell
npm run gulp runtests-parallel
```

This will run all tests; to run only a specific subset of tests, use:

```Shell
npm run gulp runtests --tests=<regex>
```

e.g. to run all compiler baseline tests:

```Shell
npm run gulp runtests -- --tests=compiler
```

or to run a specific test: `tests\cases\compiler\2dArrays.ts`

```Shell
npm run gulp runtests -- --tests=2dArrays
```

## Debugging the tests

You can debug with VS Code or Node instead with `npm run gulp runtests -- -i`:

```Shell
npm run gulp runtests -- --tests=2dArrays -i
```

You can also use the [provided VS Code launch configuration](./.vscode/launch.template.json) to launch a debug session for an open test file. Rename the file 'launch.json', open the test file of interest, and launch the debugger from the debug panel (or press F5).

## Adding a Test

To add a new test case, add a `.ts` file in `tests\cases\compiler` with code that shows the bug is now fixed, or your new feature now works.

These files support metadata tags in the format  `// @metaDataName: value`.
The supported names and values are the same as those supported in the compiler itself, with the addition of the `fileName` flag.
`fileName` tags delimit sections of a file to be used as separate compilation units.
They are useful for testing modules.
See below for examples.

**Note** that if you have a test corresponding to a specific area of spec compliance, you can put it in the appropriate subfolder of `tests\cases\conformance`.
**Note** that test filenames must be distinct from all other test names, so you may have to work a bit to find a unique name if it's something common.

### Tests for specific compiler flags

You can set individual compiler flags for a baseline by using `@[compiler flag name]: [value]`:

```ts
// @module: commonjs
// @target: ES5

export var x = 1;
export var y = 2;
```

You can give multiple values, and the test runner will run multiple times:

```ts
// @module: commonjs,esnext
// @target: ES5

export var x = 1;
export var y = 2;
```

### Tests for multiple files

When you need to mimic having multiple files in a single test to test features such as "import", use the `filename` tag:

```ts
// @filename: file1.ts
export function f() {
}

// @filename: file2.ts
import { f as g } from "file1";

var x = g();
```

## Managing the baselines

Most tests generate "baselines" to find differences in output.
As an example, compiler tests usually emit one file each for

- the `.js` and `.d.ts` output (all in the same `.js` output file),
- the errors produced by the compiler (in an `.errors.txt` file),
- the types of each expression (in a `.types` file),
- the symbols for each identifier (in a `.symbols` file), and
- the source map outputs for files if a test opts into them (in a `.js.map` file).

When a change in the baselines is detected, the test will fail. To inspect changes vs the expected baselines, use

```Shell
git diff --diff-filter=AM --no-index ./tests/baselines/reference ./tests/baselines/local
```

Alternatively, you can set the `DIFF` environment variable and run `gulp diff`, or manually run your favorite folder diffing tool between `tests/baselines/reference` and `tests/baselines/local`. Our team largely uses Beyond Compare and WinMerge.

After verifying that the changes in the baselines are correct, run

```Shell
gulp baseline-accept
```

This will change the files in `tests\baselines\reference`, which should be included as part of your commit.
Be sure to validate the changes carefully -- apparently unrelated changes to baselines can be clues about something you didn't think of.
