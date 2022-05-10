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

verify.completions({ marker: "1", includes: "C", isNewIdentifierLocation: true });
edit.insert('C.x);');

verify.quickInfoAt("2", "var r: void");

verify.completions({ marker: "3", includes: "C", isNewIdentifierLocation: true });
edit.insert('C.x);');

verify.quickInfoAt("4", "var r2: any");

verify.completions({ marker: "5", includes: ["x", "foo"] });
edit.insert('x;');

verify.noErrors();