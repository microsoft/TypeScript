/// <reference path="fourslash.ts" />

// @Filename: syntaxErrorsResult2.ts
//// var x;
//// class M {
////    x : string;
////    y : numer

edit.enableDeclaration();
verify.emitOutput(EmitOutputResult.FailedBecauseOfSyntaxErrors);