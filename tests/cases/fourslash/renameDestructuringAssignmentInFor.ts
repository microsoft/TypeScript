/// <reference path='fourslash.ts' />

////interface I {
////    /*1*/[|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////var p2: number, property1: number;
////for ({ [|property1|] } = elems[0]; p2 < 100; p2++) {
////   p2 = property1++;
////}
////for ({ /*2*/[|property1|]: p2 } = elems[0]; p2 < 100; p2++) {
////}

goTo.marker("1");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);

goTo.marker("2");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
