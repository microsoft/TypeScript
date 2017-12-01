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

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.referenceGroups([r0, r1, r2, r3], [{ definition: "class Numbers\ninterface Numbers", ranges }]);
verify.referenceGroups(r4, [{ definition: "constructor Numbers(): Numbers", ranges }]);
