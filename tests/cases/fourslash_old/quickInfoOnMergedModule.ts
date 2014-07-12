/// <reference path='fourslash.ts'/>

////module M2 {
////    export interface A {
////        foo: string;
////    }
////    var a: A;
////    var r = a.foo + a.bar;
////}
////module M2 {
////    export interface A {
////        bar: number;
////    }
////    var a: A;
////    var r = a.fo/*1*/o + a.bar;
////}

diagnostics.setEditValidation(IncrementalEditValidation.None);

goTo.marker('1');
verify.quickInfoIs("string", undefined, "M2.A.foo", "property");
verify.numberOfErrorsInCurrentFile(0);