/// <reference path='fourslash.ts'/>

/////*1*/export default class /*2*/DefaultExportedClass {
////}
////
////var x: /*3*/DefaultExportedClass;
////
////var y = new /*4*/DefaultExportedClass;

verify.baselineFindAllReferences('1', '2', '3', '4');
