/// <reference path='fourslash.ts'/>

////namespace A {
////    export namespace B {
////        export interface C {}
////    }
////}
////
////interface T1 extends A/*1*/
////
////declare const t2: A/*2*/
////
////const t3 = (x: A/*3*/) => {}
////
////interface T4 {
////   c: A/*4*/
////}

for (const marker of test.markers()) {
    goTo.marker(marker);
    edit.insert(".");
    verify.completions({ exact: ["B"] });
    edit.insert("B.");
    verify.completions({ exact: ["C"] });
    edit.insert("C.");
    verify.completions({ exact: undefined });
}
