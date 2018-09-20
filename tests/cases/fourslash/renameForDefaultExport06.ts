/// <reference path='fourslash.ts'/>

// @Filename: foo.ts
////export default class DefaultExportedClass {
////}
/////*
//// *  Commenting DefaultExportedClass
//// */
////
////var x: DefaultExportedClass;
////
////var y = new /**/[|DefaultExportedClass|];

goTo.marker();
verify.renameInfoSucceeded("DefaultExportedClass", '"/tests/cases/fourslash/foo".DefaultExportedClass');