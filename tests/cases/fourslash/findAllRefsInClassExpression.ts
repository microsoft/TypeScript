/// <reference path='fourslash.ts'/>

////interface I { [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}boom|](): void;|] }
////new class C implements I {
////   [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}boom|](){}|]
////}

const [r0Def, r0, r1Def, r1] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: "(method) I.boom(): void", ranges: [r0] },
    { definition: "(method) C.boom(): void", ranges: [r1] }
]);
