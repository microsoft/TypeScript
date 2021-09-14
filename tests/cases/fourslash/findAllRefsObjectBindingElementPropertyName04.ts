/// <reference path='fourslash.ts'/>

////interface I {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////
////function f([|{ [|{| "contextRangeIndex": 2 |}property1|]: p1 }: I|],
////           [|{ [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}property1|] }: I|],
////           { property1: p2 }) {
////
////    return [|property1|] + 1;
////}

const [r0Def, r0, r1Def, r1, r2Def, r2, r3] = test.ranges();
verify.referenceGroups([r0, r1], [{ definition: "(property) I.property1: number", ranges: [r0, r1, r2] }]);
verify.referenceGroups(r2, [
    { definition: "(property) I.property1: number", ranges: [r0, r1] },
    { definition: "(parameter) property1: number", ranges: [r2, r3] },
]);
verify.referenceGroups(r3, [{ definition: "(parameter) property1: number", ranges: [r2, r3] }]);
