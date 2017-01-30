/// <reference path='fourslash.ts'/>

////export default function /*1*/[|DefaultExportedFunction|]() {
////    return /*2*/[|DefaultExportedFunction|]
////}
/////**
//// *  Commenting [|DefaultExportedFunction|]
//// */
////
////var x: typeof /*3*/[|DefaultExportedFunction|];
////
////var y = /*4*/[|DefaultExportedFunction|]();

goTo.eachMarker(() => verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true));