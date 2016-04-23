/// <reference path='fourslash.ts' />

////interface I {
////    /*1*/[|property1|]: number;
////    property2: string;
////}
////var elems: I[];
////
////var property1: number, p2: number;
////for ({ [|property1|] } of elems) {
////    property1++;
////}
////for ({ /*2*/[|property1|]: p2 } of elems) {
////}

goTo.marker("1");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);

goTo.marker("2");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);