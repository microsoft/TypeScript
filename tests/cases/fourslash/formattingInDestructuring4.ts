/// <reference path='fourslash.ts'/>

/////*1*/const { 
/////*2*/    a,
/////*3*/    b,
/////*4*/} = { a: 1, b: 2 };

format.setOption('InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces', false);

format.document();

goTo.marker("1");
verify.currentLineContentIs("const {");
goTo.marker("2");
verify.currentLineContentIs("    a,");
goTo.marker("3");
verify.currentLineContentIs("    b,");
goTo.marker("4");
verify.currentLineContentIs("} = {a: 1, b: 2};");