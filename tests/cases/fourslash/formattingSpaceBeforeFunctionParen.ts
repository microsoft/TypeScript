/// <reference path='fourslash.ts' />

/////*1*/function foo() { }
/////*2*/function boo  () { }

format.setOption("InsertSpaceBeforeFunctionParenthesis", true);

format.document();

goTo.marker('1');
verify.currentLineContentIs('function foo () { }');
goTo.marker('2');
verify.currentLineContentIs('function boo () { }');