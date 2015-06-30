/// <reference path='fourslash.ts'/>

////namespace A {
////    function foo() {
////        if (true) {
////            B./**/
////        namespace B {
////            export function baz() { }
////}

goTo.marker();
verify.completionListContains("baz", "function B.baz(): void");