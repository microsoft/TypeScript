---
name: compiler-and-fourslash-tests
description: >
  How to write, run, and debug compiler tests and fourslash (LSP) tests in the
  typescript-go repository. Covers test file formats, directives, markers,
  baseline management, and the fourslash verification API.
---

# Writing, Running, and Debugging Compiler Tests and Fourslash Tests

This guide covers the complete testing workflow for the typescript-go repository, including compiler tests (type-checking, emit, diagnostics) and fourslash tests (language server features like completions, hover, go-to-definition).

## 1. Compiler Tests

Compiler tests validate the TypeScript compiler's behavior: diagnostics, JavaScript emit, source maps, type/symbol baselines, and more. Each test is a `.ts` or `.tsx` file that the test runner compiles, then compares output against stored baselines.

### 1.1 Where Test Files Live

| Path | Purpose |
|------|---------|
| `testdata/tests/cases/compiler/` | Regression tests (local to this repo) |
| `testdata/tests/cases/conformance/` | Conformance tests (local to this repo) |
| `_submodules/TypeScript/tests/cases/compiler/` | Submodule tests from upstream TypeScript |
| `_submodules/TypeScript/tests/cases/conformance/` | Submodule conformance tests from upstream |

### 1.2 Writing a New Compiler Test

A compiler test is just a `.ts` or `.tsx` file — no Go code needed. Place it in `testdata/tests/cases/compiler/` for regression tests or `testdata/tests/cases/conformance/<subdir>/` for conformance tests.

#### Simple single-file test

```typescript
// testdata/tests/cases/compiler/myNewTest.ts
const x: number = "hello"; // expect type error
```

#### Using compiler option directives

Set compiler options with `// @option: value` comment directives at the top of the file:

```typescript
// @target: es2020
// @strict: true
// @declaration: true
// @jsx: react
// @noEmit: true
const x: number = 42;
```

#### Multi-file test

Use `// @filename:` directives to define multiple files in one test:

```typescript
// @target: es2015
// @module: commonjs

// @filename: /src/utils.ts
export function greet(name: string): string {
    return `Hello, ${name}`;
}

// @filename: /src/main.ts
import { greet } from "./utils";
const msg: number = greet("world"); // type error
```

#### Generating test variations

Options can specify multiple comma-separated values to generate separate sub-test configurations:

```typescript
// @target: es2015, esnext
// @module: commonjs, esnext
// @strict: true, false
export const x = 1;
```

This generates a sub-test for each combination, with names like `myTest.ts (target=es2015,module=commonjs,strict=true)`.

Note: `// @lib:` is **not** variant — commas add additional lib files rather than creating separate test configurations:

```typescript
// @lib: es2020,dom
```

#### Symlink tests

Use `// @symlink:` to create symlinks in the virtual filesystem:

```typescript
// @symlink: /src -> /node_modules/mylib
```

#### Other directives

- `// @currentDirectory: /custom/path` — Set the working directory
- `// @noImplicitReferences` — Don't auto-include referenced files

### 1.3 Running Compiler Tests

#### Via hereby (recommended)

Always use `npx hereby test` to run tests. It ensures a clean state by clearing stale baselines before running, so results are always trustworthy. Trust the results — if `hereby test` passes, the tests pass.

**It's generally best to run all tests** — the full suite is very quick and will find issues you didn't realize you were introducing:

```bash
npx hereby test    # Run ALL tests — recommended, fast, and catches unexpected breakage
```

If a test fails, the output will include the full test name and package, which you can use to re-run it directly with `go test` for debugging (see below).

#### Via Go directly (for print-debugging a single test)

Use `go test` directly only when you need verbose output for a specific test to debug with print statements. The test output from `hereby test` will tell you the exact package and test name to use:

```bash
go test ./internal/testrunner/ -run 'TestLocal/myNewTest' -v
```

The test entry points are:
- `TestLocal` — runs tests from `testdata/tests/cases/` (both `compiler/` and `conformance/`)
- `TestSubmodule` — runs tests from `_submodules/TypeScript/tests/cases/` and generates diff baselines

#### What happens during a test run

For each test file, the runner:
1. Parses directives (`// @option:`, `// @filename:`, etc.)
2. Generates configurations for each option variation
3. For each configuration, runs these parallel sub-tests:
   - `error` — Verifies diagnostics against `.errors.txt` baseline
   - `output` — Verifies JavaScript emit against `.js` baseline
   - `sourcemap` — Verifies source map output
   - `sourcemap record` — Verifies source map record
   - `union ordering` — Validates AST union type ordering
   - `source file parent pointers` — Validates AST structure integrity

### 1.4 Baseline System

Baselines are the expected output files that test results are compared against.

| Directory | Purpose |
|-----------|---------|
| `testdata/baselines/reference/` | Golden/expected baselines (committed to repo) |
| `testdata/baselines/local/` | Generated during test runs (not committed) |

#### Baseline file types

| Extension | Content |
|-----------|---------|
| `.errors.txt` | Diagnostic error messages |
| `.js` | Emitted JavaScript |
| `.d.ts` | Declaration output |
| `.symbols` | Symbol information |
| `.types` | Type information |
| `.sourcemap.txt` | Source map output |
| `.trace.json` | Trace output |

#### Viewing baseline diffs

```bash
git diff --diff-filter=AM --no-index ./testdata/baselines/reference ./testdata/baselines/local
```

#### Accepting baselines

**Important**: Only accept baselines immediately after a successful `npx hereby test` run. The `hereby test` command clears stale baselines before running, so accepting after it guarantees you're only accepting baselines from the current test run. If you accept without running `hereby test` first, you risk accepting old/stale baselines from previous runs.

```bash
npx hereby test              # MUST run this first — clears stale state
npx hereby baseline-accept   # Then accept the baselines
```

The `baseline-accept` task:
1. Copies all files from `local/` to `reference/` (excluding `.delete` files)
2. Deletes reference files that have corresponding `.delete` markers in `local/`

---

## 2. Fourslash Tests

Fourslash tests validate language server (LSP) features: completions, hover/quick info, go-to-definition, find references, rename, code fixes, formatting, and more. They're Go test files that set up TypeScript source with position markers, then verify LSP responses.

### 2.1 Where Test Files Live

| Path | Purpose |
|------|---------|
| `internal/fourslash/tests/*.go` | Hand-written fourslash tests |
| `internal/fourslash/tests/gen/*.go` | Auto-generated from upstream TypeScript fourslash tests |
| `internal/fourslash/tests/manual/*.go` | `gen` tests migrated to manual with `npm run makemanual` |
| `internal/fourslash/` | Test harness and utilities |
| `internal/fourslash/tests/util/` | Shared test constants (`DefaultCommitCharacters`, etc.) |

**Key difference**: Generated tests in `gen/` use `fourslash.SkipIfFailing(t)` for tests that are known to not yet work. Hand-written tests should always pass. Tests in `manual/` are generated tests that have been migrated and possibly modified — they should not be created from scratch.

### 2.2 Writing a New Fourslash Test

Create a Go test file in `internal/fourslash/tests/`. The file uses the `fourslash_test` package.

#### Minimal template

```go
package fourslash_test

import (
    "testing"

    "github.com/microsoft/typescript-go/internal/fourslash"
    "github.com/microsoft/typescript-go/internal/testutil"
)

func TestMyFeature(t *testing.T) {
    t.Parallel()
    defer testutil.RecoverAndFail(t, "Panic on fourslash test")
    const content = `
var x/*marker1*/ = 42;
`
    f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
    defer done()
    f.VerifyQuickInfoAt(t, "marker1", "var x: number", "")
}
```

#### Real-world example: Quick Info

```go
func TestBasicQuickInfo(t *testing.T) {
    t.Parallel()
    defer testutil.RecoverAndFail(t, "Panic on fourslash test")
    const content = `
/**
 * Some var
 */
var someVar/*1*/ = 123;

/**
 * Other var
 * See {@link someVar}
 */
var otherVar/*2*/ = someVar;
`
    f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
    defer done()
    f.VerifyQuickInfoAt(t, "1", "var someVar: number", "Some var")
    f.VerifyQuickInfoAt(t, "2", "var otherVar: number",
        "Other var\nSee [someVar](file:///basicQuickInfo.ts#4,5-4,12)")
}
```

#### Real-world example: Editing and Completions

```go
func TestBasicEdit(t *testing.T) {
    t.Parallel()
    defer testutil.RecoverAndFail(t, "Panic on fourslash test")
    const content = `export {};
interface Point {
    x: number;
    y: number;
}
declare const p: Point;
p/*a*/`
    f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
    defer done()
    f.GoToMarker(t, "a")
    f.Insert(t, ".")
    f.GoToEOF(t)
    f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
        IsIncomplete: false,
        ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
            CommitCharacters: &DefaultCommitCharacters,
        },
        Items: &fourslash.CompletionsExpectedItems{
            Exact: []fourslash.CompletionsExpectedItem{
                &lsproto.CompletionItem{
                    Label:    "x",
                    Kind:     new(lsproto.CompletionItemKindField),
                    SortText: new(string(ls.SortTextLocationPriority)),
                },
                "y",
            },
        },
    })
}
```

#### Marker syntax

Markers define cursor positions and text ranges in the test content:

| Syntax | Description | Example |
|--------|-------------|---------|
| `/*name*/` | Named position marker | `var x/*pos*/ = 1;` |
| `/*1*/`, `/*2*/` | Numbered markers | `foo(/*1*/, /*2*/)` |
| `[|text|]` | Range marker (selects text) | `[|let x: number|]` |

#### Multi-file tests

Use `// @Filename:` (capital F) to define multiple files:

```go
const content = `
// @Filename: /src/utils.ts
export function greet(name: string) { return name; }

// @Filename: /src/main.ts
import { greet } from "./utils";
greet(/*marker*/"world");
`
```

#### Setting compiler options

Embed a `tsconfig.json` file or use directive comments:

```go
const content = `
// @Filename: /tsconfig.json
{ "compilerOptions": { "strict": true, "target": "es2020" } }

// @Filename: /src/test.ts
const x/*1*/ = 42;
`
```

### 2.3 Verification Methods (Common API)

The `fourslash.FourslashTest` type (variable `f`) provides these verification methods:

#### Quick Info / Hover
```go
f.VerifyQuickInfoAt(t, "marker", "var x: number", "documentation text")
f.VerifyBaselineHover(t)  // generates baseline file
```

#### Completions
```go
f.VerifyCompletions(t, "marker", &fourslash.CompletionsExpectedList{
    IsIncomplete: false,
    ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
        CommitCharacters: &DefaultCommitCharacters,
        EditRange:        Ignored,
    },
    Items: &fourslash.CompletionsExpectedItems{
        Includes: []fourslash.CompletionsExpectedItem{
            &lsproto.CompletionItem{Label: "myVar"},
        },
        // Or use Exact for exact match:
        // Exact: []fourslash.CompletionsExpectedItem{"x", "y"},
    },
})
```

Import the test utilities for shared constants:
```go
import . "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
// Provides: DefaultCommitCharacters, Ignored, CompletionGlobalThisItem, etc.
```

#### Navigation
```go
f.VerifyBaselineGoToDefinition(t)           // baseline-based
f.VerifyBaselineGoToTypeDefinition(t)
f.VerifyBaselineGoToImplementation(t)
```

#### References and Rename
```go
f.VerifyBaselineFindAllReferences(t)
f.VerifyBaselineRename(t)
```

#### Diagnostics
```go
f.VerifyNoErrors(t)
f.VerifyErrorExistsBetweenMarkers(t, "start", "end")
f.VerifyBaselineNonSuggestionDiagnostics(t)
```

#### Signature Help
```go
f.VerifyBaselineSignatureHelp(t)
f.VerifyNoSignatureHelp(t)
```

#### Editing (simulating user actions)
```go
f.GoToMarker(t, "marker")    // move cursor to marker position
f.Insert(t, ".")             // type text at cursor
f.Backspace(t, 3)            // delete 3 characters before cursor
f.DeleteAtCaret(t, 5)        // delete 5 characters after cursor
f.Paste(t, "new text")       // paste text
f.Replace(t, start, len, "replacement")
f.GoToEOF(t)                 // move to end of file
f.GoToFile(t, "/src/main.ts") // switch to another file
```

#### Other LSP Features
```go
f.VerifyBaselineDocumentHighlights(t)
f.VerifyBaselineDocumentSymbol(t)
f.VerifyBaselineCallHierarchy(t)
f.VerifyBaselineInlayHints(t)
f.VerifyBaselineSelectionRanges(t)
f.VerifyBaselineClosingTags(t)
f.FormatDocument(t, "/test.ts")
f.VerifyOrganizeImports(t, expectedContent, actionKind, prefs)
```

### 2.4 Running Fourslash Tests

```bash
# Run ALL tests (recommended — fast, ensures clean state, catches unexpected breakage)
npx hereby test

# For print-debugging a specific test with verbose output
go test ./internal/fourslash/tests -run TestBasicQuickInfo -v
```

### 2.5 Fourslash Baselines

Fourslash tests that use `VerifyBaseline*` methods generate baselines under:

```
testdata/baselines/reference/fourslash/<command>/
```

Where `<command>` is one of: `quickInfo`, `signatureHelp`, `goToDefinition`, `goToType`, `goToImplementation`, `findAllReferences`, `documentHighlights`, `findRenameLocations`, `callHierarchy`, `Code Lenses`, `Document Symbols`, `Inlay Hints`, etc.

File extensions vary by command:
- `.baseline` — quickInfo, signatureHelp, diagnostics, etc.
- `.baseline.jsonc` — most other features
- `.baseline.md` — auto imports
- `.callHierarchy.txt` — call hierarchy

Accept baselines the same way as compiler tests — but only after running `npx hereby test`:
```bash
npx hereby test              # MUST run first to clear stale baselines
npx hereby baseline-accept
```

### 2.6 Generated vs. Hand-Written Tests

Generated tests (in `gen/`) are auto-converted from the upstream TypeScript fourslash test suite using the script at `internal/fourslash/_scripts/convertFourslash.mts`. They:
- Use `fourslash.SkipIfFailing(t)` for tests that don't pass yet
- Should not be manually edited (they'll be overwritten on regeneration)
- Provide coverage for ported TypeScript behavior

Tests in `manual/` are `gen` tests that have been migrated with `npm run makemanual`. They should not be created from scratch — only use `makemanual` to move a generated test that needs modification.

Hand-written tests (directly in `internal/fourslash/tests/`):
- Must always pass (no `SkipIfFailing`)
- Test specific behaviors, edge cases, or new features
- Are the right place for custom regression tests

---

## 3. General Testing Practices

### 3.1 Key hereby Commands

| Command | Description |
|---------|-------------|
| `npx hereby test` | Run all tests (recommended — fast, clears stale state) |
| `npx hereby baseline-accept` | Accept local baselines as new reference |
| `npx hereby format` | Format code (uses dprint) |
| `npx hereby lint` | Run linters (uses golangci-lint) |

### 3.2 Typical Workflow

#### Adding a new compiler test
1. Create `testdata/tests/cases/compiler/myTest.ts` with test code and directives
2. Run all tests: `npx hereby test`
3. Review generated baselines: `git diff --diff-filter=AM --no-index ./testdata/baselines/reference ./testdata/baselines/local`
4. Accept (only after `hereby test`): `npx hereby baseline-accept`

#### Adding a new fourslash test
1. Create `internal/fourslash/tests/myTest_test.go` with the test function
2. Run all tests: `npx hereby test`
3. Review any generated baselines: `git diff --diff-filter=AM --no-index ./testdata/baselines/reference ./testdata/baselines/local`
4. Accept (only after `hereby test`): `npx hereby baseline-accept`

#### Investigating a test failure
1. Run all tests: `npx hereby test`
2. If a test fails, use the package and test name from the output to re-run with verbose output: `go test ./internal/testrunner/ -run 'TestLocal/failingTest' -v`
3. Check baseline diffs: `git diff --diff-filter=AM --no-index ./testdata/baselines/reference ./testdata/baselines/local`
4. If the new output is correct, run `npx hereby test` again, then accept: `npx hereby baseline-accept`
5. If not, fix the code and re-run

#### Debugging an unrecovered panic
If a test panics without a clear stack trace, run all tests in the package sequentially with verbose mode to identify which test caused the panic:
```bash
go test ./internal/testrunner/ -parallel=1 -v
```
The last test that shows as running before the panic output is the one that caused it.
