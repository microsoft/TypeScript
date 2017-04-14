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

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: '(property) I[["prop1"]]: () => void', ranges }]);
verify.referenceGroups(r1, [
    { definition: '(property) I[["prop1"]]: () => void', ranges: [r0, r2] },
    { definition: '(property) C[["prop1"]]: any', ranges: [r1] }
]);
verify.referenceGroups(r2, [
    { definition: '(property) I[["prop1"]]: () => void', ranges: [r0, r1] },
    { definition: '(property) ["prop1"]: () => void', ranges: [r2] }
]);

