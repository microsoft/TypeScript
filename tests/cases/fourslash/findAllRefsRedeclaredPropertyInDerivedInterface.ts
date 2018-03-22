/// <reference path='fourslash.ts' />

// @noLib: true

////interface A {
////    readonly [|{| "isWriteAccess": true, "isDefinition": true |}x|]: number | string;
////}
////interface B extends A {
////    readonly [|{| "isWriteAccess": true, "isDefinition": true |}x|]: number;
////}
////const a: A = { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 0 };
////const b: B = { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 0 };

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: "(property) A.x: string | number", ranges: [r0, r2] },
    { definition: "(property) B.x: number", ranges: [r1, r3] },
]);
verify.referenceGroups(r2, [
    { definition: "(property) A.x: string | number", ranges: [r0] },
    { definition: "(property) B.x: number", ranges: [r1, r3] },
    { definition: "(property) x: number", ranges: [r2] },
]);
verify.referenceGroups(r3, [
    { definition: "(property) A.x: string | number", ranges: [r0, r2] },
    { definition: "(property) B.x: number", ranges: [r1] },
    { definition: "(property) x: number", ranges: [r3] },
]);
