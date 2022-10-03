/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f(/*1*/x) {
////    x;
////}
////f(

goTo.marker('1');
verify.codeFixAvailable([
    { "description": "Infer parameter types from usage" }
]);
