/// <reference path='fourslash.ts'/>

////interface I {
////    [|["[|{| "isDefinition": true |}prop1|]"]|]: () => void;
////}
////
////class C implements I {
////    [|["[|{| "isDefinition": true |}prop1|]"]|]: any;
////}
////
////var x: I = {
////    [|["[|{| "isDefinition": true |}prop1|]"]|]: function () { },
////}

// TODO: GH#22690
const [r0Big, r0, r1Big, r1, r2Big, r2] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: { text: '(property) I["prop1"]: () => void', range: r0Big }, ranges: [r0, r2] },
    { definition: { text: '(property) C["prop1"]: any', range: r1Big }, ranges: [r1] },
]);
verify.referenceGroups(r2, [
    { definition: { text: '(property) I["prop1"]: () => void', range: r0Big }, ranges: [r0] },
    { definition: { text: '(property) C["prop1"]: any', range: r1Big }, ranges: [r1] },
    { definition: { text: '(property) ["prop1"]: () => void', range: r2Big }, ranges: [r2] },
]);
