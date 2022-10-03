/// <reference path='fourslash.ts'/>

////declare class A {
////    foo;
////}
////declare class B extends A {
////    bar;
////}
////declare class C extends B {
////    baz;
////}
////
////var c = new C();
////c./*1*/
////var b = new B();
////b./*2*/
////var a = new A();
////a./*3*/

goTo.eachMarker((_, i) => {
    const all = ["foo", "bar", "baz"];
    verify.completions({ includes: all.slice(0, 3 - i), excludes: all.slice(3 - i) });
    edit.insert("foo;");
});

verify.noErrors();