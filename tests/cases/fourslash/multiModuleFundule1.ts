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
////var /*2*/r = C(/*1*/
////var /*4*/r2 = new C(/*3*/ // using void returning function as constructor
////var r3 = C./*5*/

goTo.marker('1');
verify.completionListContains('C');
edit.insert('C.x);');

verify.quickInfoAt("2", "var r: void");

goTo.marker('3');
verify.completionListContains('C');
edit.insert('C.x);');

verify.quickInfoAt("4", "var r2: any");

goTo.marker('5');
verify.completionListContains('x');
verify.completionListContains('foo');
edit.insert('x;');

verify.noErrors();