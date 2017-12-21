/// <reference path="fourslash.ts" />

////interface A { a?: number; };
////function f(x: A) {
////x./**/;
////}

goTo.marker();
verify.completionListContains("a", /* text */ undefined, /* documentation */ undefined, { kindModifiers: "optional" });
