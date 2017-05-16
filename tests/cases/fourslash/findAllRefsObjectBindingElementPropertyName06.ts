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
const [, , r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) I.property1: number", ranges },
    { definition: "let property1: number", ranges: [r2] }
]);