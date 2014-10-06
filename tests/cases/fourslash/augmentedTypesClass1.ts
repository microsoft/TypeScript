/// <reference path='fourslash.ts'/>

////class c5b { public foo() { } }
////module c5b { export var y = 2; } // should be ok
////c5b./*1*/
////var r = new c5b();
////r./*2*/

goTo.marker('1');
verify.completionListContains('prototype', '(property) c5b.prototype: c5b');
edit.insert('y;');
goTo.marker('2');
verify.completionListContains('foo', '(method) c5b.foo(): void');