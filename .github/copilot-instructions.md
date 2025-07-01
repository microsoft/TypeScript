# Guide for Copilot

This document provides a concise guide for writing TypeScript fourslash tests and compiler tests, along with build instructions.

## Build Instructions Summary

### Setup
1. Install Node.js (current or LTS)
2. Clone the repository: `git clone --depth=1 https://github.com/microsoft/TypeScript`
3. Install dependencies: `npm ci`

### Common Build Tasks
```bash
npx hereby local             # Build the compiler into built/local
npx hereby clean             # Delete the built compiler  
npx hereby tests             # Build the test infrastructure
npx hereby runtests          # Run all tests
npx hereby runtests-parallel # Run tests in parallel 🚨 MANDATORY BEFORE FINISHING!
npx hereby runtests --runner=fourslash # Run only fourslash tests
npx hereby runtests --runner=compiler # Run only compiler tests
npx hereby runtests --tests=<testPath> # Run specific test
npx hereby baseline-accept   # Accept new test baselines
npx hereby lint              # Run eslint 🚨 MANDATORY BEFORE FINISHING!
npx hereby format            # Run code formatting 🚨 MANDATORY BEFORE FINISHING!
```

## Fourslash Test Syntax Guide

Fourslash tests are interactive TypeScript language service tests. They validate IDE features like completions, quick info, navigation, and refactoring.

### Basic Structure
```typescript
/// <reference path='fourslash.ts'/>

////code goes here with /*markers*/

// Test assertions go here
```

### Key Syntax Elements

#### 1. Source Code Definition
Use `////` to define source code lines:
```typescript
////function foo(x: number) {
////    return x + 1;
////}
////let result = foo(/*marker*/42);
```

#### 2. Markers for Positioning
Use `/**/` for anonymous markers or `/*name*/` for named markers:
```typescript
////let x = /*1*/someValue;
////let y = /*cursor*/anotherValue;
```

#### 3. Multi-file Tests
Use `// @Filename:` to define multiple files:
```typescript
// @Filename: /a.ts
////export const value = 42;

// @Filename: /b.ts  
////import { value } from './a';
////console.log(/*marker*/value);
```

#### 4. Ranges
Use `[|text|]` to define text ranges:
```typescript
////function test() {
////    [|return 42;|]
////}
```

### Common API Patterns

#### Navigation & Positioning
```typescript
goTo.marker("markerName");         // Navigate to marker
goTo.marker();                     // Navigate to anonymous marker /**/
```

#### Verification (Prefer these over baselines)
```typescript
verify.currentLineContentIs("expected content");
verify.completions({ includes: "itemName" });
verify.completions({ excludes: "itemName" });
verify.quickInfoIs("expected info");
verify.codeFix({
    description: "Fix description",
    newFileContent: "expected content after fix"
});
```

#### Completions Testing
```typescript
verify.completions({ 
    marker: "1",
    includes: { name: "foo", source: "/a", hasAction: true },
    isNewIdentifierLocation: true,
    preferences: { includeCompletionsForModuleExports: true }
});
```

#### Code Fixes Testing
```typescript
verify.codeFix({
    description: "Add missing property",
    index: 0,
    newFileContent: `class C {
    property: string;
    method() { this.property = "value"; }
}`
});
```

#### Formatting
```typescript
format.document();
verify.currentLineContentIs("formatted content");
```

### Simple Example
```typescript
/// <reference path='fourslash.ts'/>

////interface User {
////    name: string;
////}
////
////const user: User = {
////    /*completion*/
////};

verify.completions({
    marker: "completion",
    includes: { name: "name", sortText: "0" }
});
```

## Compiler Test Syntax Guide

Compiler tests validate TypeScript compilation behavior, type checking, and error reporting.

### Basic Structure
- Simple `.ts` files in `tests/cases/compiler/`
- Use comments to indicate expected behavior
- No special test harness - just TypeScript code

### Compiler Directives
Use `// @directive: value` for compiler options:
```typescript
// @strict: true
// @target: ES2015
// @lib: ES2015,DOM

let x: string = 42; // Error expected
```

### Common Directives
```typescript
// @strict: true/false
// @noImplicitAny: true/false  
// @target: ES5/ES2015/ES2020/ESNext
// @module: commonjs/amd/es6/esnext
// @lib: ES5,DOM/ES2015/ES2020
// @declaration: true/false
// @skipLibCheck: true/false
```

### Multi-file Tests
```typescript
// @Filename: helper.ts
export function helper(x: number): string {
    return x.toString();
}

// @Filename: main.ts  
import { helper } from "./helper";
const result = helper(42);
```

### Error Expectations
Use comments to document expected behavior:
```typescript
abstract class Base {
    abstract method(): void;
}

class Derived extends Base {
    // Missing implementation - should error
}

new Base(); // Should error - cannot instantiate abstract class
```

### Type Testing Patterns
```typescript
// Test type inference
let inferred = [1, 2, 3]; // Should infer number[]

// Test type compatibility  
type A = { x: number };
type B = { x: number; y: string };
let a: A = { x: 1 };
let b: B = { x: 1, y: "hello" };
a = b; // Should work - B is assignable to A
b = a; // Should error - A missing property y
```

### Simple Example
```typescript
// Test that optional properties work correctly
interface Config {
    required: string;
    optional?: number;
}

const config1: Config = { required: "test" }; // Should work
const config2: Config = { required: "test", optional: 42 }; // Should work  
const config3: Config = { optional: 42 }; // Should error - missing required
```

## Test Writing Best Practices

### For Fourslash Tests
1. **Prefer validation over baselines** - Use `verify.currentLineContentIs()` instead of `verify.baseline*()`
2. **Use simple, focused examples** - Test one feature at a time
3. **Name markers clearly** - Use descriptive marker names like `/*completion*/`
4. **Test the simplest form first** - Start with basic cases before complex scenarios

### For Compiler Tests  
1. **Use clear file names** - Name tests after the feature being tested
2. **Add explanatory comments** - Document expected behavior with comments
3. **Test error cases** - Include both valid and invalid code examples
4. **Keep tests focused** - One primary feature per test file

### General Guidelines
1. **Make tests deterministic** - Avoid random or environment-dependent behavior
2. **Use realistic examples** - Test scenarios developers actually encounter  
3. **Start simple** - Begin with the most basic case of a feature
4. **Test edge cases** - Include boundary conditions and error scenarios

## Running Specific Tests

```bash
# Run a specific fourslash test
npx hereby runtests --tests=tests/cases/fourslash/completionForObjectProperty.ts

# Run a specific compiler test  
npx hereby runtests --tests=tests/cases/compiler/abstractClassUnionInstantiation.ts

# Run tests matching a pattern
npx hereby runtests --tests=tests/cases/fourslash/completion*.ts
```

## Important Guidelines

### 🚨 CRITICAL: Before Finishing Your Work 🚨

**THESE STEPS ARE MANDATORY BEFORE COMMITTING/PUSHING ANY CHANGES:**

1. **MUST RUN:** `npx hereby runtests-parallel` (even though it takes 10-15 minutes)
2. **MUST RUN:** `npx hereby lint` and fix ALL lint issues
3. **MUST RUN:** `npx hereby format` as the final step

**❌ PRs that fail these checks will be rejected without review.**

### Keeping Things Tidy

- You can assume lint, tests, and formatting are clean on a fresh clone
- Only run these verification steps AFTER making changes to code
- Run `npx hereby lint` and fix ALL issues after making changes
- Run `npx hereby format` as your final step after making changes

### Test Locations

- Only add testcases in `tests/cases/compiler` or `tests/cases/fourslash`
- Filenames in `tests/cases/compiler` must always end with `.ts`, not `.d.ts`
- Do not write direct unit tests as they are almost never the correct test format for our repo

### Performance Expectations

- Running a set of tests may take up to 4 minutes
- A full test run may take up to 15 minutes

### Working with Issues

- Maintainer comments in the issue should generally take priority over OP's comments
- Maintainers might give you hints on where to start. They are not always right, but a good place to start

### Debugging Tips

printf debugging is going to be very useful as you are figuring things out.
To do this, use `console.log`, but you'll need to `ts-ignore` it.
Write something like this:
```ts,diff
function checkSomething(n: Node) {
    doSomething(n);
+   // @ts-ignore DEBUG CODE ONLY, REMOVE ME WHEN DONE
+   console.log(`Got node with pos = ${n.pos}`);
    doSomethingElse(n);
}
```
We have a lot of enums so you might want to print back their symbolic name, to do this, index back into the name of the enum
```ts
   // @ts-ignore DEBUG CODE ONLY, REMOVE ME WHEN DONE
   console.log(`Got node with kind = ${SyntaxKind[n.kind]}`);
```

## Recommended Workflow

When fixing bugs or implementing features, follow this workflow:

1. **Make a testcase that demonstrates the behavior**
   - Run it (by itself) and review the baselines it generates to ensure it demonstrates the bug
   - Add the test and its baselines in one commit

2. **Fix the bug by changing code as appropriate**
   - Put this fix in another commit

3. **Run the test you wrote again**
   - Ensure the baselines change in a way that demonstrates that the bug is fixed
   - Put this baseline diff in its own commit

4. **Add more testing**
   - Once you've got the basics figured out, enhance your test to cover edge cases and other variations
   - Run the test again and commit the baseline diff along with the test edit

5. **🚨 MANDATORY: Run all other tests to ensure you didn't break anything**
   - **REQUIRED:** Run `npx hereby runtests-parallel` and wait for it to finish (10-15 minutes is normal!)
   - **THIS STEP CANNOT BE SKIPPED** - patience is essential!
   - Some collateral baseline changes are normal, but review for correctness
   - Put these diffs in another commit

6. **🚨 MANDATORY: Lint and format your changes**
   - **REQUIRED:** Run `npx hereby lint` and fix ALL issues
   - **REQUIRED:** Run `npx hereby format` before you're done
   - **YOU CANNOT FINISH WITHOUT THESE STEPS**
   - Double-check your line endings. Source files in this repo typically use CRLF line endings. Fix all line endings to be consistent before you wrap up
