/// <reference path='fourslash.ts'/>

////interface I {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property1|]: number;
////    property2: string;
////}
////
////function f({ [|property1|]: p1 }: I,
////           { [|{| "isWriteAccess": true, "isDefinition": true |}property1|] }: I,
////           { property1: p2 }) {
////
////    return [|property1|] + 1;
////}

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups([r0, r1], [{ definition: "(property) I.property1: number", ranges }]);
verify.referenceGroups([r2, r3], [
    { definition: "(property) I.property1: number", ranges: [r0, r1] },
    { definition: "var property1: number", ranges: [r2, r3] }
]);

