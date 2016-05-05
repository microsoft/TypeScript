/// <reference path='fourslash.ts'/>

////export default class DefaultExportedClass {
////}
////
////var x: DefaultExportedClass;
////
////var y = new DefaultExportedClass;
////
////namespace /**/DefaultExportedClass {
////}

// The namespace and class do not merge,
// so the namespace should be all alone.

goTo.marker();
verify.referencesCountIs(1);
