/// <reference path='fourslash.ts'/>

////interface I {
////    [[|{| "isDefinition": true |}42|]](): void;
////}
////
////class C implements I {
////    [[|{| "isDefinition": true |}42|]]: any;
////}
////
////var x: I = {
////    ["[|{| "isWriteAccess": true, "isDefinition": true |}42|]"]: function () { }
////}

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: { text: '(method) I[42](): void', range: r0 }, ranges: [r0, r2] },
    { definition: { text: '(property) C[42]: any', range: r1 }, ranges: [r1] },
]);
