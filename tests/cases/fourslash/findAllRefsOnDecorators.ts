/// <reference path="fourslash.ts" />

// @Filename: a.ts
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}decorator|](target) {
////    return target;
////}|]
////[|decorator|]();

// @Filename: b.ts
////@[|decorator|] @[|decorator|]("again")
////class C {
////    @[|decorator|]
////    method() {}
////}

verify.singleReferenceGroup("function decorator(target: any): any", "decorator");
