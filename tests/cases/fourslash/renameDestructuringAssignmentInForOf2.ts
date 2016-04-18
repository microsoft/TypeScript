/// <reference path='fourslash.ts' />

////interface I {
////    property1: number;
////    property2: string;
////}
////var elems: I[];
////
////var [|property1|]: number, p2: number;
////for ({ [|property1|] } of elems) {
////    [|property1|]++;
////}
////for ({ property1: p2 } of elems) {
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
