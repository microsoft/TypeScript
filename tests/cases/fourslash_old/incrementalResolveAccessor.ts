/// <reference path="fourslash.ts" />

////class c1 {
////    get p1(): string {
////        return "30";
////    }
////    set p1(a: number) {
////        a = "30";
////    }
////}
////var val = new c1();
////var b = val.p1;
/////*1*/b;

diagnostics.setEditValidation(IncrementalEditValidation.None);

// Resolve without typeCheck
goTo.marker('1');
verify.quickInfoIs("any");

// TypeCheck
verify.numberOfErrorsInCurrentFile(3);