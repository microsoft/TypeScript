/// <reference path="fourslash.ts" />

// @Filename: a.ts
////function [|decorator|](target) {
////    return target;
////}
////[|decorator|]();

// @Filename: b.ts
////@[|decorator|] @[|decorator|]("again")
////class C {
////    @[|decorator|]
////    method() {}
////}

verify.rangesReferenceEachOther();
