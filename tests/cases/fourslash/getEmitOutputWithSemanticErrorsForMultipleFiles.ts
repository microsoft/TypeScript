/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithSemanticErrorsForMultipleFiles.baseline
// @declaration: true

// @Filename: inputFile1.ts
// @emitThisFile: true
//// // File to emit, does not contain semantic errors
//// // expected to be emitted correctelly regardless of the semantic errors in the other file
//// var noErrors = true;

// @Filename: inputFile2.ts
//// // File not emitted, and contains semantic errors
//// var semanticError: boolean = "string";
verify.baselineGetEmitOutput();