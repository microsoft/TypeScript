/// <reference path='fourslash.ts' />

////module Foo {/*1*/
////}/*2*/
////
////import bar  =    Foo;/*3*/
////
////import bar2=Foo;/*4*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("module Foo {");
goTo.marker("2");
verify.currentLineContentIs("}");
goTo.marker("3");
verify.currentLineContentIs("import bar = Foo;");
goTo.marker("4");
verify.currentLineContentIs("import bar2 = Foo;");