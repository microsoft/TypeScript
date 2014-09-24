/// <reference path='fourslash.ts' />

////interface I {
////    x: number;
////}
////class Foo<T> {
////    y: T;
////}
////class A {
////    foo() { }
////}
////class B extends A {
////    constructor(a: Foo<I>, b: number) {
////        super();
////    }
////}
////var x = new /*2*/B(/*1*/

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker("1");
verify.currentSignatureHelpIs("B(a: Foo<I>, b: number): B");
edit.insert("null,");
verify.currentSignatureHelpIs("B(a: Foo<I>, b: number): B");
edit.insert("10);");

//goTo.marker("2");
//verify.quickInfoIs("(a: Foo<I>, b: number): B", undefined, "B", "constructor");