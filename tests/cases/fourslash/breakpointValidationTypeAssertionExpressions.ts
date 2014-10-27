/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_typeAssertionExpressions.baseline
// @Filename: bpSpan_typeAssertionExpressions.ts
////class Greeter {
////}
////var a = <Greeter>new Greeter();
////a = (<Greeter> new Greeter());
////a = <Greeter>(function foo() {
////    return new Greeter();
////})();

verify.baselineCurrentFileBreakpointLocations();