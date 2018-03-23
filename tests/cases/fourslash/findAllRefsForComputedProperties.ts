/// <reference path='fourslash.ts'/>

////interface I {
////    ["[|{| "isDefinition": true |}prop1|]"]: () => void;
////}
////
////class C implements I {
////    ["[|{| "isDefinition": true |}prop1|]"]: any;
////}
////
////var x: I = {
////    ["[|{| "isDefinition": true |}prop1|]"]: function () { },
////}

const [r0, r1, r2] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: { text: '(property) I["prop1"]: () => void', range: r0 }, ranges: [r0, r2] },
    { definition: { text: '(property) C["prop1"]: any', range: r1 }, ranges: [r1] },
]);
verify.referenceGroups(r2, [
    { definition: { text: '(property) I["prop1"]: () => void', range: r0 }, ranges: [r0] },
    { definition: { text: '(property) C["prop1"]: any', range: r1 }, ranges: [r1] },
    { definition: { text: '(property) ["prop1"]: () => void', range: r2 }, ranges: [r2] },
]);
