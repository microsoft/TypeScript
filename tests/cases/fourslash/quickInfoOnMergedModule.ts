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

verify.quickInfoAt("1", "(property) M2.A.foo: string", undefined);
verify.noErrors();
