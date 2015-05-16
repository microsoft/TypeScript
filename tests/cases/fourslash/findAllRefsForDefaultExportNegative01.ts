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

goTo.marker();
verify.referencesCountIs(1);
