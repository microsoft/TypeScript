/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////function f()1{
////    /*1a*/return a && a.b && a.b.c;/*1b*/
////}
////function f()2{
////    return /*2a*/a && a.b && a.b.c;/*2b*/
////}
////function f()3{
////    return /*3a*/a && a.b && a.b.c/*3b*/;
////}
////function f()4{
////    return /*4a*/a.b ? a.b.c : "whenFalse";/*4b*/
////}

// valid spans for return statement
goTo.select("1a", "1b");
verify.refactorAvailable("Convert to optional chain expression");

goTo.select("2a", "2b");
verify.refactorAvailable("Convert to optional chain expression");

goTo.select("3a", "3b");
verify.refactorAvailable("Convert to optional chain expression");

goTo.select("4a", "4b");
verify.refactorAvailable("Convert to optional chain expression");
