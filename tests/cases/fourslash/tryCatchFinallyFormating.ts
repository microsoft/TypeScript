/// <reference path='fourslash.ts' />

////try {
/////*tryInTryCatchFinally*/    // comment
////}
////catch (e) {
/////*catchInTryCatchFinally*/    // comment
////}
////finally {
/////*finallyInTryCatchFinally*/    // comment
////}
////
////try {
/////*tryInTryFinally*/    // comment
////}
////finally {
/////*finallyInTryFinally*/    // comment
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
    "finallyInTryCatchFinally",
    "tryInTryFinally",
    "finallyInTryFinally",
    "tryInTryCatch",
    "catchInTryCatch"
];

markers.forEach((marker) => {
    // Comments should be indented
    goTo.marker(marker);
    verify.currentLineContentIs('    // comment');
});
