/// <reference path='fourslash.ts' />

/////*1*/({});
/////*2*/(  {});
/////*3*/({foo:42});
/////*4*/(  {foo:42}  );
/////*5*/var bar = (function (a) { });

format.setOption("InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis", true);
format.document();
goTo.marker('1');
verify.currentLineContentIs('( {} );');
goTo.marker('2');
verify.currentLineContentIs('( {} );');
goTo.marker('3');
verify.currentLineContentIs('( { foo: 42 } );');
goTo.marker('4');
verify.currentLineContentIs('( { foo: 42 } );');
goTo.marker('5');
verify.currentLineContentIs('var bar = ( function( a ) { } );');

format.setOption("InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis", false);
format.document();
goTo.marker('1');
verify.currentLineContentIs('({});');
goTo.marker('2');
verify.currentLineContentIs('({});');
goTo.marker('3');
verify.currentLineContentIs('({ foo: 42 });');
goTo.marker('4');
verify.currentLineContentIs('({ foo: 42 });');
goTo.marker('5');
verify.currentLineContentIs('var bar = (function(a) { });');