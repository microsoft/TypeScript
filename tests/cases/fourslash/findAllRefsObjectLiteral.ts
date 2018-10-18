/// <reference path="fourslash.ts" />

// @noLib: true

////interface I { [|{| "isDefinition": true |}x|]: number; }
////function f(b: boolean) {
////    const o = b ? { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 0 } : { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 1 };
////    o.[|x|];
////}

const [r0, r1, r2, r3] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "(property) I.x: number", ranges: [r0] },
    ...[r1, r2, r3].map(range => ({ definition: "(property) x: number", ranges: [range] })),
]);
verify.referenceGroups([r1, r2, r3], [
    { definition: "(property) I.x: number", ranges: [r0] },
    { definition: "(property) x: number", ranges: [r1, r2, r3] },
]);
