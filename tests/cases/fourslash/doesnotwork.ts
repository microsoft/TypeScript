/// <reference path='fourslash.ts' />

/////** This is my variable*/
////var myVariable = 10;
////
/////** d variable*/
////var d = 10;
////myVariable = d;
////
/////** foos comment*/
////function foo() {
////}
/////** fooVar comment*/
////var fooVar: () => void;
/////*4*/
////foo();
////fooVar();
////fooVar = foo;
////
////foo();
////fooVar();
////var fooVarVar = fooVar;
/////**class comment*/
////class c {
////    /** constructor comment*/
////    constructor() {
////    }
////}
/////**instance comment*/
////var i = new c();
////
/////** interface comments*/
////interface i1 {
////}
/////**interface instance comments*/
////var i1_i: i1;
////
////function foo2(a: number): void;
////function foo2(b: string): void;
////function foo2(aOrb) {
////}
////var x = foo2;

goTo.marker('4');
verify.completionListContains("fooVar", "var fooVar: () => void", "fooVar comment");
