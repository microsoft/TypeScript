/// <reference path='fourslash.ts'/>

/////*1*/const { 
/////*2*/    a,
/////*3*/    b,
/////*4*/} = parseInt(
/////*5*/    '12'
/////*6*/);

format.document();

goTo.marker("1");
verify.currentLineContentIs("const {");
goTo.marker("2");
verify.currentLineContentIs("    a,");
goTo.marker("3");
verify.currentLineContentIs("    b,");
goTo.marker("4");
verify.currentLineContentIs("} = parseInt(");
goTo.marker("5");
verify.currentLineContentIs("    '12'");
goTo.marker("6");
verify.currentLineContentIs(");");
