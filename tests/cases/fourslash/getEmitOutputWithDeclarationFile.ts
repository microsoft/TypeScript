/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithDeclarationFile.baseline

// @Filename: decl.d.ts
// @emitThisFile: true
//// interface I { a: string; }

// @Filename: inputFile2.ts
// @emitThisFile: true
//// var x1: string = "hello world";
//// class Foo{
////    x : string;
////    y : number;
//// }

verify.baselineGetEmitOutput();