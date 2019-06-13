/// <reference path='fourslash.ts'/>

////interface I {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////
////var elems: I[];
////for ([|let { [|{| "contextRangeIndex": 2 |}property1|]: p } of elems|]) {
////}
////for ([|let { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}property1|] } of elems|]) {
////}
////for ([|var { [|{| "contextRangeIndex": 6 |}property1|]: p1 } of elems|]) {
////}
////var p2;
////for ([|{ [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}property1|] : p2 } of elems|]) {
////}

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4Def, r4] = test.ranges();
verify.referenceGroups([r0, r1, r3, r4], [{
    definition: "(property) I.property1: number",
    ranges: [r0, r1, r2, r3, r4]
}]);
verify.referenceGroups(r2, [
    { definition: "(property) I.property1: number", ranges: [r0, r1, r3, r4] },
    { definition: "let property1: number", ranges: [r2] }
]);
