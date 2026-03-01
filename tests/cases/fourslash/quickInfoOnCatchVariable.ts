/// <reference path="fourslash.ts" />

// @strict: false
//// function f() {
////    try { } catch (/**/e) { }
//// }

verify.quickInfoAt("", "(local var) e: any");
