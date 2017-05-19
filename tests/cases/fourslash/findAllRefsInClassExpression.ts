/// <reference path='fourslash.ts'/>

////interface I { [|{| "isWriteAccess": true, "isDefinition": true |}boom|](): void; }
////new class C implements I {
////   [|{| "isWriteAccess": true, "isDefinition": true |}boom|](){}
////}

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) I.boom(): void", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) I.boom(): void", ranges: [r0] },
    { definition: "(method) C.boom(): void", ranges: [r1] }
]);
