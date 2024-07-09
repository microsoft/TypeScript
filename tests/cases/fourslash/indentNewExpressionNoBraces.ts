/// <reference path='fourslash.ts'/>

////new Foo/*1*/

goTo.marker("1");
edit.insert("\n");
verify.indentationIs(0);