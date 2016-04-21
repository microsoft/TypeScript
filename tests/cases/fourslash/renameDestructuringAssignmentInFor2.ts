/// <reference path='fourslash.ts' />

////interface I {
////    property1: number;
////    property2: string;
////}
////var elems: I[];
////
////var p2: number, [|property1|]: number;
////for ({ [|property1|] } = elems[0]; p2 < 100; p2++) {
////   p2 = [|property1|]++;
////}
////for ({ property1: p2 } = elems[0]; p2 < 100; p2++) {
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
