/// <reference path='fourslash.ts'/>

////class c5b { public foo() { } }
////module c5b { export var y = 2; } // should be ok
////c5b./*1*/
////var r = new c5b();
////r./*2*/

verify.completions({ marker: "1", includes: { name: "prototype", text: '(property) c5b.prototype: c5b' } });
edit.insert('y;');
verify.completions({ marker: "2", includes: { name: "foo", text: '(method) c5b.foo(): void' } });
