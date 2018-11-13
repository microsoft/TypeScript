/// <reference path='fourslash.ts' />

/////*1*/function foo() { }
/////*2*/function boo  () { }
/////*3*/var bar = function foo() { };
/////*4*/var foo = { bar() { } };
/////*5*/function tmpl <T> () { }

format.setOption("InsertSpaceBeforeFunctionParenthesis", true);

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
