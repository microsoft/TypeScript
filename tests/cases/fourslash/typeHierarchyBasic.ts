/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////interface Base {
////    method(): void;
////}
////
////interface Middle extends Base {
////    anotherMethod(): void;
////}
////
////class /**/Derived implements Middle {
////    method(): void {}
////    anotherMethod(): void {}
////}
////
////class SubDerived extends Derived {
////    additionalMethod(): void {}
////}

goTo.marker();
verify.baselineTypeHierarchy();
