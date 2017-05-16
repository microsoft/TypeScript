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
////{
////    let [|{| "isWriteAccess": true, "isDefinition": true |}property1|]: number;
////    for ({ [|{| "isWriteAccess": true, "isDefinition": true |}property1|] } of elems) {
////    }
////}

const ranges = test.ranges();
const [r0, r1, r2, r3, r4, r5, r6] = ranges;
const rangesForProperty = [r0, r1, r2, r3, r4, r6];
const rangesForLetInFor = [r2];
const rangesForBlockLet = [r5, r6];
verify.referenceGroups([r0, r1, r2, r3, r4], [
    { definition: "(property) I.property1: number", ranges: rangesForProperty },
    { definition: "let property1: number", ranges: rangesForLetInFor }
]);
verify.referenceGroups(r5, [
    { definition: "let property1: number", ranges: rangesForBlockLet }
]);
verify.referenceGroups(r6, [
    { definition: "(property) I.property1: number", ranges: rangesForProperty },
    { definition: "let property1: number", ranges: rangesForLetInFor },
    { definition: "let property1: number", ranges: rangesForBlockLet }
]);