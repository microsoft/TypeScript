/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithSyntacticErrorsForMultipleFiles2.baseline
// @outFile: out.js

// @Filename: inputFile1.ts
// @emitThisFile: true
//// // File to emit, does not contain syntactic errors, but --out is passed
//// // expected to not generate outputs because of the syntactic errors in the other file.
//// var noErrors = true;

// @Filename: inputFile2.ts
//// // File not emitted, and contains syntactic errors
//// var syntactic Error;

verify.baselineGetEmitOutput();
