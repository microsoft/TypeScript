/// <reference path="fourslash.ts" />

////interface A { a?: number; method?(): number; };
////function f(x: A) {
////x./*a*/;
////}

goTo.marker("a");
verify.completionListContains("a", /* text */ undefined, /* documentation */ undefined, { kindModifiers: "optional" });
verify.completionListContains("method", /* text */ undefined, /* documentation */ undefined, { kindModifiers: "optional" });
