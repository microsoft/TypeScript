/// <reference path='fourslash.ts'/>

/////*1*/interface /*2*/Foo {
////}
////
/////*3*/module /*4*/Foo {
////    export interface Bar { }
////}
////
/////*5*/function /*6*/Foo(): void {
////}
////
////var f1: /*7*/Foo.Bar;
////var f2: /*8*/Foo;
/////*9*/Foo.bind(this);

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9');
