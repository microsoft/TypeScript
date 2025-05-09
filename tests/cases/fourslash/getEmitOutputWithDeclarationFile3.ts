/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithDeclarationFile3.baseline
// @outFile: declSingle.js

// @Filename: decl.d.ts
//// interface I { a: string; }

// @Filename: inputFile2.ts
//// export class Foo { }

// @Filename: inputFile3.ts
// @emitThisFile: true
//// var x:string = "hello";

// @Filename: inputFile4.ts
//// var x1:number = 1000;

// @Filename: inputFile5.js
//// var x2 = 1000;
verify.baselineGetEmitOutput();
