/// <reference path="fourslash.ts" />

//// function f() {
////    try { } catch (/**/e) { }
//// }

goTo.marker();
verify.quickInfoExists();
verify.quickInfoIs("(var) e: any");
