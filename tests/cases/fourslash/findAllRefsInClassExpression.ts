/// <reference path='fourslash.ts'/>

////interface I { [|{| "isDefinition": true |}boom|](): void; }
////new class C implements I {
////   [|{| "isWriteAccess": true, "isDefinition": true |}boom|](){}
////}

const [r0, r1] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: "(method) I.boom(): void", ranges: [r0] },
    { definition: "(method) C.boom(): void", ranges: [r1] }
]);
