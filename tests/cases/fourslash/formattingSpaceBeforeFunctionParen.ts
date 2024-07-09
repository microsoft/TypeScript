/// <reference path='fourslash.ts' />

/////*1*/function foo() { }
/////*2*/function boo  () { }
/////*3*/var bar = function foo() { };
/////*4*/var foo = { bar() { } };
/////*5*/function tmpl <T> () { }
/////*6*/var f = function*() { };
/////*7*/function* g () { }

format.setOption("insertSpaceBeforeFunctionParenthesis", true);
format.setOption("insertSpaceAfterFunctionKeywordForAnonymousFunctions", false);
format.document();

goTo.marker('1');
verify.currentLineContentIs('function foo () { }');
goTo.marker('2');
verify.currentLineContentIs('function boo () { }');
goTo.marker('3');
verify.currentLineContentIs('var bar = function foo () { };');
goTo.marker('4');
verify.currentLineContentIs('var foo = { bar () { } };');
goTo.marker('5');
verify.currentLineContentIs('function tmpl<T> () { }');
goTo.marker('6');
verify.currentLineContentIs('var f = function*() { };');
goTo.marker('7');
verify.currentLineContentIs('function* g () { }');
