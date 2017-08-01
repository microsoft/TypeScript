/// <reference path='fourslash.ts' />
////function f( f: function){/*1*/
goTo.marker("1");
edit.insert("}");
verify.currentLineContentIs("function f(f: function) { }")
