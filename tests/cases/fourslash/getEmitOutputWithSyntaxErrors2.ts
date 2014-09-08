/// <reference path="fourslash.ts" />

// @declaration
// @Filename: syntaxErrorsResult2.ts
//// var x;
//// class M {
////    x : string;
////    y : numer

verify.emitOutput(EmitReturnStatus.AllOutputGenerationSkipped);