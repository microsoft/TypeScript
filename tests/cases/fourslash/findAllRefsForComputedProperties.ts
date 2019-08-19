/// <reference path='fourslash.ts'/>

////interface I {
////    [|["[|{| "isDefinition": true, "contextRangeIndex": 0 |}prop1|]"]: () => void;|]
////}
////
////class C implements I {
////    [|["[|{| "isDefinition": true, "contextRangeIndex": 2 |}prop1|]"]: any;|]
////}
////
////var x: I = {
////    [|["[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}prop1|]"]: function () { }|],
////}

const [r0Def, r0, r1Def, r1, r2Def, r2] = test.ranges();
verify.referenceGroups([r0, r1, r2], [
    { definition: { text: '(property) I["prop1"]: () => void', range: r0 }, ranges: [r0, r2] },
    { definition: { text: '(property) C["prop1"]: any', range: r1 }, ranges: [r1] },
]);
