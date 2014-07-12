/// <reference path='fourslash.ts'/>

////function C(x: number) { }
////
////module C {
////    export var x = 1;
////}
////module C {
////    export function foo() { }
////}
////
////var r/*2*/ = C(/*1*/
////var r2/*4*/ = new C(/*3*/ // using void returning function as constructor
////var r3 = C./*5*/

goTo.marker('1');
verify.completionListContains('C');
edit.insert('C.x);');

goTo.marker('2');
verify.quickInfoIs('void');

goTo.marker('3');
verify.completionListContains('C');
edit.insert('C.x);');

goTo.marker('4');
verify.quickInfoIs('any');

goTo.marker('5');
verify.completionListContains('x');
verify.completionListContains('foo');
edit.insert('x;');

verify.numberOfErrorsInCurrentFile(0);