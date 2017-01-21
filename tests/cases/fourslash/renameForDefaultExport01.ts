/// <reference path='fourslash.ts'/>

////export default class /*1*/[|DefaultExportedClass|] {
////}
/////*
//// *  Commenting [|DefaultExportedClass|]
//// */
////
////var x: /*2*/[|DefaultExportedClass|];
////
////var y = new /*3*/[|DefaultExportedClass|];

goTo.eachMarker(() => verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true));