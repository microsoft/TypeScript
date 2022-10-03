/// <reference path='fourslash.ts'/>

////export default class DefaultExportedClass {
////}
////
////var x: DefaultExportedClass;
////
////var y = new DefaultExportedClass;
////
////namespace /*1*/DefaultExportedClass {
////}

verify.noErrors();

// The namespace and class do not merge,
// so the namespace should be all alone.
verify.baselineFindAllReferences('1');
