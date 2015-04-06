/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithSyntacticErrorsForMultipleFiles.baseline

// @Filename: inputFile1.ts
// @emitThisFile: true
//// // File to emit, does not contain syntactic errors
//// // expected to be emitted correctelly regardless of the syntactic errors in the other file
//// var noErrors = true;

// @Filename: inputFile2.ts
//// // File not emitted, and contains syntactic errors
//// var syntactic Error;

verify.baselineGetEmitOutput();