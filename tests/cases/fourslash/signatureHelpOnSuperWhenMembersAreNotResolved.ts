/// <reference path="fourslash.ts" />

////class A { }
////class B extends A { constructor(public x: string) { } }
////class C extends B {
////    constructor() {
////        /*1*/
////     }
////}

diagnostics.setEditValidation(IncrementalEditValidation.None);
goTo.marker("1");
edit.insert("super(");
verify.currentSignatureHelpIs("B(x: string): B");