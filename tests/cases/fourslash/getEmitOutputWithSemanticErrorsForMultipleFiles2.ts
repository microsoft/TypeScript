/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithSemanticErrorsForMultipleFiles2.baseline
// @declaration: true
// @outFile: out.js

// @Filename: inputFile1.ts
// @emitThisFile: true
//// // File to emit, does not contain semantic errors, but --out is passed
//// // expected to not generate declarations because of the semantic errors in the other file
//// var noErrors = true;

// @Filename: inputFile2.ts
//// // File not emitted, and contains semantic errors
//// var semanticError: boolean = "string";

verify.baselineGetEmitOutput();
