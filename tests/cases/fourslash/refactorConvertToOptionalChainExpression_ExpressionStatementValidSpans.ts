/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
/////*1a*/let x1 = a && a.b && a.b.c;/*1b*/
////let x2 = /*2a*/a && a.b && a.b.c;/*2b*/
////let x3 = /*3a*/a && a.b && a.b.c/*3b*/;
////let x4 = /*4a*/a.b ? a.b.c : "whenFalse"/*4b*/;

goTo.select("1a", "1b");
verify.refactorAvailable("Convert to optional chain expression");

goTo.select("2a", "2b");
verify.refactorAvailable("Convert to optional chain expression");

goTo.select("3a", "3b");
verify.refactorAvailable("Convert to optional chain expression");

goTo.select("4a", "4b");
verify.refactorAvailable("Convert to optional chain expression");
