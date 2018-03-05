/// <reference path='fourslash.ts' />
////interface [|{| "isWriteAccess": true, "isDefinition": true |}Numbers|] {
////    p: number;
////}
////interface [|{| "isWriteAccess": true, "isDefinition": true |}Numbers|] {
////    m: number;
////}
////class [|{| "isWriteAccess": true, "isDefinition": true |}Numbers|] {
////    f(n: number) {
////        return this.p + this.m + n;
////    }
////}
////let i: [|Numbers|] = new [|Numbers|]();
////let x = i.f(i.p + i.m);

verify.singleReferenceGroup("class Numbers\ninterface Numbers");
