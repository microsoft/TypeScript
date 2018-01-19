/// <reference path='fourslash.ts' />

/////*2*/do{
/////*3*/do/*1*/{
/////*4*/do{
/////*5*/}while(a!==b)
/////*6*/}while(a!==b)
/////*7*/}while(a!==b)
goTo.marker("1");
edit.insert("\n");
verify.currentLineContentIs("    {");
goTo.marker("2");
verify.currentLineContentIs("do{");
goTo.marker("3");
verify.currentLineContentIs("    do");
goTo.marker("4");
verify.currentLineContentIs("do{");
goTo.marker("5");
verify.currentLineContentIs("}while(a!==b)");
goTo.marker("6");
verify.currentLineContentIs("}while(a!==b)");
goTo.marker("7");
verify.currentLineContentIs("}while(a!==b)");