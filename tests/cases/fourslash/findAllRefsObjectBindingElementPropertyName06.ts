/// <reference path='fourslash.ts'/>

////interface I {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property1|]: number;
////    property2: string;
////}
////
////var elems: I[];
////for (let { [|property1|]: p } of elems) {
////}
////for (let { [|{| "isWriteAccess": true, "isDefinition": true |}property1|] } of elems) {
////}
////for (var { [|property1|]: p1 } of elems) {
////}
////var p2;
////for ({ [|{| "isWriteAccess": true, "isDefinition": true |}property1|] : p2 } of elems) {
////}

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.referenceGroups([r0, r1, r3], [{ definition: "(property) I.property1: number", ranges }]);
verify.referenceGroups(r2, [
    { definition: "(property) I.property1: number", ranges: [r0, r1, r3, r4] },
    { definition: "let property1: number", ranges: [r2] }
]);
verify.referenceGroups(r4, [
    { definition: "(property) I.property1: number", ranges: [r0, r1, r2, r3] },
    { definition: "(property) property1: I", ranges: [r4] }
]);
