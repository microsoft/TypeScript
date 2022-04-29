/// <reference path="fourslash.ts" />

////interface I {
////    /** Doc */
////    m: () => void;
////}
////function f(x: I): void {
////    x./**/m();
////}

verify.quickInfoAt("", "(property) I.m: () => void", "Doc");
