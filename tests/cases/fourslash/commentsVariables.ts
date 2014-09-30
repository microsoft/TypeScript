/// <reference path='fourslash.ts' />

/////** This is my variable*/
////var myV/*1*/ariable = 10;
/////*2*/
/////** d variable*/
////var d = 10;
////myVariable = d;
/////*3*/
/////** foos comment*/
////function foo() {
////}
/////** fooVar comment*/
////var foo/*12*/Var: () => void;
/////*4*/
////f/*5q*/oo(/*5*/);
////fo/*6q*/oVar(/*6*/);
////fo/*13*/oVar = f/*14*/oo;
/////*7*/
////f/*8q*/oo(/*8*/);
////foo/*9q*/Var(/*9*/);
////var fooVarVar = /*9aq*/fooVar;
/////**class comment*/
////class c {
////    /** constructor comment*/
////    constructor() {
////    }
////}
/////**instance comment*/
////var i = new c();
/////*10*/
/////** interface comments*/
////interface i1 {
////}
/////**interface instance comments*/
////var i1_i: i1;
/////*11*/
////function foo2(a: number): void;
////function foo2(b: string): void;
////function foo2(aOrb) {
////}
////var x = fo/*15*/o2;

goTo.marker('1');
verify.quickInfoIs("(var) myVariable: number", "This is my variable");

goTo.marker('2');
verify.completionListContains("myVariable", "(var) myVariable: number", "This is my variable");

goTo.marker('3');
verify.completionListContains("myVariable", "(var) myVariable: number", "This is my variable");
verify.completionListContains("d", "(var) d: number", "d variable");

goTo.marker('4');
verify.completionListContains("foo", "(function) foo(): void", "foos comment");
verify.completionListContains("fooVar", "(var) fooVar: () => void", "fooVar comment");

goTo.marker('5');
verify.currentSignatureHelpDocCommentIs("foos comment");
goTo.marker('5q');
verify.quickInfoIs("(function) foo(): void", "foos comment");

goTo.marker('6');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('6q');
verify.quickInfoIs("(function) fooVar(): void", "");

goTo.marker('7');
verify.completionListContains("foo", "(function) foo(): void", "foos comment");
verify.completionListContains("fooVar", "(var) fooVar: () => void", "fooVar comment");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("foos comment");
goTo.marker('8q');
verify.quickInfoIs("(function) foo(): void", "foos comment");

goTo.marker('9');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('9q');
verify.quickInfoIs("(function) fooVar(): void", "");
goTo.marker('9aq');
verify.quickInfoIs("(var) fooVar: () => void", "fooVar comment");

goTo.marker('10');
verify.completionListContains("i", "(var) i: c", "instance comment");

goTo.marker('11');
verify.completionListContains("i1_i", "(var) i1_i: i1", "interface instance comments");

goTo.marker('12');
verify.quickInfoIs("(var) fooVar: () => void", "fooVar comment");

goTo.marker('13');
verify.quickInfoIs("(var) fooVar: () => void", "fooVar comment");

goTo.marker('14');
verify.quickInfoIs("(function) foo(): void", "foos comment");

goTo.marker('15');
verify.quickInfoIs("(function) foo2(a: number): void (+ 1 overload(s))", "");