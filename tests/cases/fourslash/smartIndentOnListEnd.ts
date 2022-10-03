/// <reference path='fourslash.ts'/>

////var a = []
/////*1*/
////| {}
/////*2*/
////| "";

goTo.marker("1");
verify.indentationIs(4)
goTo.marker("2");
verify.indentationIs(4)