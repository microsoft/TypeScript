/// <reference path='fourslash.ts' />

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////var p2: number, property1: number;
////for (let { [|property1|]: p2 } = elems[0]; p2 < 100; p2++) {
////}
////for (let { [|property1|] } = elems[0]; p2 < 100; p2++) {
////    [|property1|] = p2;
////}

verify.rangesAreRenameLocations();
