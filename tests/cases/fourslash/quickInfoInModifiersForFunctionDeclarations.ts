/// <reference path='fourslash.ts' />

//// interface IFunction {
////     (g: (a: string, b: string) => void): any;
//// }
////
//// declare var f: IFunction;
////
//// f(/*1*/function(a, b) { });
////
//// /*2*/function functionName1() {}
////
//// /*3*/export /*4*/default /*5*/function(a: string, b: string) {}

goTo.marker("1");
verify.quickInfoIs("function (a: string, b: string): void");

goTo.marker("2");
verify.quickInfoIs("function functionName1(): void");

goTo.marker("3");
verify.quickInfoIs("function (a: string, b: string): void");

goTo.marker("4");
verify.quickInfoIs("function (a: string, b: string): void");

goTo.marker("5");
verify.quickInfoIs("function (a: string, b: string): void");