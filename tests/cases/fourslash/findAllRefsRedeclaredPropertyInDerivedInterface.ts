/// <reference path='fourslash.ts' />

// @noLib: true

////interface A {
////    readonly [|{| "isDefinition": true |}x|]: number | string;
////}
////interface B extends A {
////    readonly [|{| "isDefinition": true |}x|]: number;
////}
////const a: A = { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 0 };
////const b: B = { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 0 };

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) A.x: string | number", ranges: [r0, r2] },
    { definition: "(property) B.x: number", ranges: [r1, r3] },
]);
