/// <reference path="fourslash.ts" />

// @declaration: true
// @out: true

// @Filename: inputFile1.ts
//// module m {
////    export function foo() {
////        class C implements I { }
////        interface I { }
////        return C;
////    }
//// } /*1*/

// @Filename: input2.ts
//// var x = "hello world"; /*2*/

goTo.marker("1");
verify.numberOfErrorsInCurrentFile(1);

goTo.marker("2");
verify.numberOfErrorsInCurrentFile(0);
