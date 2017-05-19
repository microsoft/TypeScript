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

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) I[[42]](): void", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) I[[42]](): void", ranges: [r0, r2] },
    { definition:  "(property) C[[42]]: any", ranges: [r1] }
]);
verify.referenceGroups(r2, [
    { definition: "(method) I[[42]](): void", ranges: [r0, r1] },
    { definition: '(property) ["42"]: () => void', ranges: [r2] }
]);
