/// <reference path='fourslash.ts'/>

////class c5b { public foo(){ } }
////module c5b { var y = 2; } // should be ok
////c5b./*1*/
////var r = new c5b();
////r./*2*/

verify.completions({ marker: "1", excludes: ["y"] });
edit.backspace(4);
verify.completions({ marker: "2", exact: { name: "foo", text: "(method) c5b.foo(): void" } });
