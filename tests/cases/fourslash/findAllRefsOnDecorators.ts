/// <reference path="fourslash.ts" />

// @Filename: a.ts
////function decorator(target) {
////    return target;
////}
////decorator();

// @Filename: b.ts
////@deco/*1*/rator @decorator("again")
////class C {
////    @decorator
////    method() {}
////}

goTo.file("b.ts");
goTo.marker("1");

verify.referencesCountIs(5);