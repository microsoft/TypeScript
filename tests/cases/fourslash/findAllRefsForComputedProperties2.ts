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
////    ["[|{| "isDefinition": true |}42|]"]: function () { }
////}

const [r0, r1, r2] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: { text: '(method) I[42](): void', range: r0 }, ranges: [r0, r2] },
    { definition: { text: '(property) C[42]: any', range: r1 }, ranges: [r1] },
]);
verify.referenceGroups(r2, [
    { definition: { text: '(method) I[42](): void', range: r0 }, ranges: [r0] },
    { definition: { text: '(property) C[42]: any', range: r1 }, ranges: [r1] },
    { definition: { text: '(property) ["42"]: () => void', range: r2 }, ranges: [r2] },
]);
