/// <reference path='fourslash.ts' />

// @noLib: true

////interface A {
////    [|readonly [|{| "isDefinition": true, "contextRangeIndex": 0 |}x|]: number | string;|]
////}
////interface B extends A {
////    [|readonly [|{| "isDefinition": true, "contextRangeIndex": 2 |}x|]: number;|]
////}
////const a: A = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}x|]: 0|] };
////const b: B = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}x|]: 0|] };

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3] = test.ranges();
verify.referenceGroups([r0, r1, r2, r3], [
    { definition: "(property) A.x: string | number", ranges: [r0, r2] },
    { definition: "(property) B.x: number", ranges: [r1, r3] },
]);
