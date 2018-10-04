/// <reference path='fourslash.ts'/>
////foo(function () {
////}).then(function () {/*1*/
////})

goTo.marker("1");
edit.insert("\n");
verify.indentationIs(4);