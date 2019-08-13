/// <reference path='fourslash.ts'/>

////interface I {
////    [|[[|{| "isDefinition": true, "contextRangeIndex": 0 |}42|]](): void;|]
////}
////
////class C implements I {
////    [|[[|{| "isDefinition": true, "contextRangeIndex": 2 |}42|]]: any;|]
////}
////
////var x: I = {
////    [|["[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}42|]"]: function () { }|]
////}

const [r0Def, r0, r1Def, r1, r2Def, r2] = test.ranges();
verify.referenceGroups([r0, r1, r2], [
    { definition: { text: '(method) I[42](): void', range: r0 }, ranges: [r0, r2] },
    { definition: { text: '(property) C[42]: any', range: r1 }, ranges: [r1] },
]);
