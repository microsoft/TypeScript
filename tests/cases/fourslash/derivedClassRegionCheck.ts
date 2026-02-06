/// <reference path="fourslash.ts" />

// @strict: true
// @Filename: index.ts

//// export {};
//// interface ComplicatedTypeBase {
////     [s: string]: ABase;
//// }
//// interface ComplicatedTypeDerived {
////     [s: string]: ADerived;
//// }
//// interface ABase {
////     a: string;
//// }
//// interface ADerived {
////     b: string;
//// }
//// class Base {
////     foo!: ComplicatedTypeBase;
//// }
//// [|class Derived extends Base {
////     foo!: ComplicatedTypeDerived;
//// }|]
//// /*e*/

const [r0] = test.ranges();
// Baseline
const expected = test.getSemanticDiagnostics();

// Reset checker
goTo.marker("e");
edit.insert("  ");

verify.getRegionSemanticDiagnostics([r0], expected);
verify.getSemanticDiagnostics(expected);