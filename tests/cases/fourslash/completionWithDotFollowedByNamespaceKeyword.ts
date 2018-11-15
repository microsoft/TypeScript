/// <reference path='fourslash.ts'/>

////namespace A {
////    function foo() {
////        if (true) {
////            B./**/
////        namespace B {
////            export function baz() { }
////}

verify.completions({ marker: "", exact: { name: "baz", text: "function B.baz(): void" } });
