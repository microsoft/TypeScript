/// <reference path='fourslash.ts'/>

// @Filename: foo.ts
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
verify.renameInfoSucceeded("DefaultExportedFunction", '"/tests/cases/fourslash/foo".DefaultExportedFunction');