/// <reference path='fourslash.ts' />

////foo(a,(b))/*1*/
////foo(a,(<b>c).d)/*2*/

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("foo(a, (b));");

goTo.marker("2");
edit.insert(";");
verify.currentLineContentIs("foo(a, (<b>c).d);");