/// <reference path='fourslash.ts' />

/////*1*/foo(() => 1);
/////*2*/foo(1);
/////*3*/if((true)){}

format.setOption("InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis", true);
format.document();
goTo.marker("1");
verify.currentLineContentIs("foo( () => 1 );");
goTo.marker("2");
verify.currentLineContentIs("foo( 1 );");
goTo.marker("3");
verify.currentLineContentIs("if ( ( true ) ) { }");
