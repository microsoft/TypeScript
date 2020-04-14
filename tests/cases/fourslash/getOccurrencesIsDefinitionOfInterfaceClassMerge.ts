/// <reference path='fourslash.ts' />
////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Numbers|] {
////    p: number;
////}|]
////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}Numbers|] {
////    m: number;
////}|]
////[|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}Numbers|] {
////    f(n: number) {
////        return this.p + this.m + n;
////    }
////}|]
////let i: [|Numbers|] = new [|Numbers|]();
////let x = i.f(i.p + i.m);

verify.singleReferenceGroup("class Numbers\ninterface Numbers", "Numbers");
