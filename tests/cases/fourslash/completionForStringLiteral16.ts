/// <reference path='fourslash.ts' />

////interface Foo {
////    a: string;
////    b: number;
////    c: string;
////}
////
////declare function f1<T>(key: keyof T): T;
////declare function f2<T>(a: keyof T, b: keyof T): T;
////
////f1<Foo>("/*1*/",);
////f1<Foo>("/*2*/");
////f1<Foo>("/*3*/",,,);

////f2<Foo>("/*4*/", "/*5*/",);
////f2<Foo>("/*6*/", "/*7*/");
////f2<Foo>("/*8*/", "/*9*/",,,);

verify.completions({ marker: test.markers(), exact: ["a", "b", "c"] });
