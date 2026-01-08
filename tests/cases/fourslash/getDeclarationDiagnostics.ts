/// <reference path="fourslash.ts" />

// @declaration: true
// @outFile: true

// @Filename: inputFile1.ts
//// namespace m {
////    export function foo() {
////        class C implements I { private a; }
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
