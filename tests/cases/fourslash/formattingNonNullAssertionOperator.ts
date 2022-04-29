/// <reference path='fourslash.ts' />

/////*1*/ 'bar' ! ;
/////*2*/ ( 'bar' ) ! ;
/////*3*/ 'bar' [ 1 ] ! ;
/////*4*/ var  bar  =  'bar' . foo ! ;
/////*5*/ var  foo  =  bar ! ;

format.document();
goTo.marker("1");
verify.currentLineContentIs("'bar'!;");
goTo.marker("2");
verify.currentLineContentIs("('bar')!;");
goTo.marker("3");
verify.currentLineContentIs("'bar'[1]!;");
goTo.marker("4");
verify.currentLineContentIs("var bar = 'bar'.foo!;");
goTo.marker("5");
verify.currentLineContentIs("var foo = bar!;");