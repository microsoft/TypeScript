/// <reference path='fourslash.ts'/>

////interface A {
/////*1*/    foo?     ();
/////*2*/    foo?             <T>();
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("    foo?();");
goTo.marker("2");
verify.currentLineContentIs("    foo?<T>();");