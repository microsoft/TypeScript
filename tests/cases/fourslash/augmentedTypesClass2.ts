/// <reference path='fourslash.ts'/>

////class c5b { public foo(){ } }
////module c5b { var y = 2; } // should be ok
////c5b./*1*/
////var r = new c5b();
////r./*2*/

goTo.marker('1');
verify.not.completionListContains('y', 'var y: number');
edit.backspace(4);
goTo.marker('2');
verify.completionListContains('foo', '(method) c5b.foo(): void');