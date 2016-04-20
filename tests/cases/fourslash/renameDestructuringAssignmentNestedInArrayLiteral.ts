/// <reference path='fourslash.ts' />

////interface I {
////    /*1*/[|property1|]: number;
////    property2: string;
////}
////var elems: I[], p1: number, property1: number;
////[{ /*2*/[|property1|]: p1 }] = elems;
////[{ [|property1|] }] = elems;

goTo.marker("1");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);

goTo.marker("2");
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
