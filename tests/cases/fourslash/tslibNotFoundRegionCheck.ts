/// <reference path="fourslash.ts" />

// @strict: true
// @target: ES2016
// @importHelpers: true
// @Filename: index.ts

//// export {};
//// async function foo(): Promise<void> {}
//// [|async function bar(): Promise<void> {}|]
//// /*e*/

const [r0] = test.ranges();
// Baseline
const expected = test.getSemanticDiagnostics();

// Reset checker
goTo.marker("e");
edit.insert("  ");

verify.getRegionSemanticDiagnostics([r0], expected);
verify.getSemanticDiagnostics(expected);