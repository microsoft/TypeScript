/// <reference path="fourslash.ts" />

////class A { }
////class B extends A { constructor(public x: string) { } }
////class C extends B {
////    constructor() {
////        /*1*/
////     }
////}

goTo.marker("1");
edit.insert("super(");
verify.signatureHelp({ text: "B(x: string): B" });