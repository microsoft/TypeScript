/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_forIn.baseline
// @Filename: bpSpan_forIn.ts
////for (var x in String) {
////    WScript.Echo(x);
////}
////for (x in String) {
////    WScript.Echo(x);
////}
////for (var x2 in String)
////{
////    WScript.Echo(x2);
////}
////for (x in String)
////{
////    WScript.Echo(x);
////}
////var z = 10;
////for (x in function foo() {
////    return new String();
////}) {
////    z++;
////}

verify.baselineCurrentFileBreakpointLocations();