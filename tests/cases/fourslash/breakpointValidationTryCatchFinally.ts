/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_tryCatchFinally.baseline
// @Filename: bpSpan_tryCatchFinally.ts

////var x = 10;
////try {
////    x = x + 1;
////} catch (e) {
////    x = x - 1;
////} finally {
////    x = x * 10;
////}
////try
////{
////    x = x + 1;
////    throw new Error();
////}
////catch (e)
////{
////    x = x - 1;
////}
////finally
////{
////    x = x * 10;
////}
////try {
////    throw (function foo() {
////        new Error(x.toString());
////    })();
////}
////finally {
////    x++;
////}

verify.baselineCurrentFileBreakpointLocations();