/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////for (let { [|property1|] } of elems) {
////    [|property1|]++;
////}
////for (let { [|property1|]: p2 } of elems) {
////}

verify.rangesAreRenameLocations();
