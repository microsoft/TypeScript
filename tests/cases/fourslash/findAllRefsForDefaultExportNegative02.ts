/// <reference path='fourslash.ts'/>

////export default function DefaultExportedFunction() {
////    return DefaultExportedFunction
////}
////
////var x: typeof DefaultExportedFunction;
////
////var y = DefaultExportedFunction();
////
////namespace /**/DefaultExportedFunction {
////}

goTo.marker();
verify.referencesCountIs(1);
