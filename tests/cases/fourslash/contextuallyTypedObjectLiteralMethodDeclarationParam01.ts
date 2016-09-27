/// <reference path="fourslash.ts" />

// @noImplicitAny: true

////interface A {
////    numProp: number;
////}
////
////interface B  {
////    strProp: string;
////}
////
////interface Foo {
////    method1(arg: A): void;
////    method2(arg: B): void;
////}
////
////function getFoo1(): Foo {
////    return {
////        method1(/*param1*/arg) {
////            arg.numProp = 10;
////        },
////        method2(/*param2*/arg) {
////            arg.strProp = "hello";
////        }
////    }
////}

verify.quickInfos({
    param1: "(parameter) arg: A",
    param2: "(parameter) arg: B"
});
