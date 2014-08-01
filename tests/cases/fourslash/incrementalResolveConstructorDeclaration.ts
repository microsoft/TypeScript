/// <reference path="fourslash.ts" />

////class c1 {
////    private b: number;
////    constructor(a: string) {
////        this.b = a;
////    }
////}
////var val = new c1("hello");
/////*1*/val;

diagnostics.setEditValidation(IncrementalEditValidation.None);

// Do resolve without typeCheck
goTo.marker('1');
verify.quickInfoIs("c1");

// TypeCheck
verify.numberOfErrorsInCurrentFile(1);
