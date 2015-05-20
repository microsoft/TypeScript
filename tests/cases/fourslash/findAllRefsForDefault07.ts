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

// The namespace and function do not merge,
// so the namespace should be all alone.

goTo.marker();
verify.referencesCountIs(1);
