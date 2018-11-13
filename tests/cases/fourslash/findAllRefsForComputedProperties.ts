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
////    ["[|{| "isWriteAccess": true, "isDefinition": true |}prop1|]"]: function () { },
////}

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: { text: '(property) I["prop1"]: () => void', range: r0 }, ranges: [r0, r2] },
    { definition: { text: '(property) C["prop1"]: any', range: r1 }, ranges: [r1] },
]);
