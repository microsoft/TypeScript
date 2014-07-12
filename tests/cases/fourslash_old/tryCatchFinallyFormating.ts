/// <reference path='fourslash.ts' />

////try {
/////*tryInTryCatchFinally*/    // comment
////}
////catch (e) {
/////*catchInTryCatchFinally*/    // comment
////}
////finally {
/////*finalyInTryCatchFinally*/    // comment
////}
////
////try {
/////*tryInTryFinally*/    // comment
////}
////finally {
/////*finalyInTryFinally*/    // comment
////}
////
////try {
/////*tryInTryCatch*/    // comment
////}
////catch (e) {
/////*catchInTryCatch*/    // comment
////}

format.document();

var markers = [
    "tryInTryCatchFinally",
    "catchInTryCatchFinally",
    "finalyInTryCatchFinally",
    "tryInTryFinally",
    "finalyInTryFinally",
    "tryInTryCatch",
    "catchInTryCatch"
];

markers.forEach((marker) => {
    // Comments should be indented
    goTo.marker(marker);
    verify.currentLineContentIs('    // comment');
});
