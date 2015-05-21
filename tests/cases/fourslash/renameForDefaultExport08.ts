/// <reference path='fourslash.ts'/>

////export default function DefaultExportedFunction() {
////    return /**/[|DefaultExportedFunction|]
////}
/////**
//// *  Commenting DefaultExportedFunction
//// */
////
////var x: typeof DefaultExportedFunction;
////
////var y = DefaultExportedFunction();

goTo.marker();
verify.renameInfoSucceeded("DefaultExportedFunction");