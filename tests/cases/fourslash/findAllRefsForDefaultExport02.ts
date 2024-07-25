/// <reference path='fourslash.ts'/>

/////*1*/export default function /*2*/DefaultExportedFunction() {
////    return /*3*/DefaultExportedFunction;
////}
////
////var x: typeof /*4*/DefaultExportedFunction;
////
////var y = /*5*/DefaultExportedFunction();
////
/////*6*/namespace /*7*/DefaultExportedFunction {
////}


// The namespace and function do not merge,
// so the namespace should be all alone.
verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7');
