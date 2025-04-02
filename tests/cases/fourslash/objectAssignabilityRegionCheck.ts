/// <reference path="fourslash.ts" />

// @strict: true
// @Filename: index.ts

//// interface Foo {
////     a: number;
//// }
//// interface Bar {
////     b: string;
//// }
//// declare let b: Bar;
//// [|function f(): Foo {
////     [|return|] b;
//// }|]
//// /*e*/

const [r0, r1] = test.ranges();
// Baseline
const expected = test.getSemanticDiagnostics();

// Reset checker
goTo.marker("e");
edit.insert("  ");

verify.getRegionSemanticDiagnostics([r0], [expected[0]]);
verify.getSemanticDiagnostics(expected);