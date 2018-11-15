/// <reference path='fourslash.ts'/>

////declare class A {
////    static foo;
////}
////declare class B extends A {
////    static bar;
////}
////declare class C extends B {
////    static baz;
////}
////
////C./*1*/
////B./*2*/
////A./*3*/

goTo.eachMarker((_, i) => {
    const all = ["foo", "bar", "baz"];
    verify.completions({ includes: all.slice(0, 3 - i), excludes: all.slice(3 - i) });
    edit.insert("foo;");
});

verify.noErrors();
