/// <reference path="fourslash.ts" />

// @BaselineFile: getEmitOutputWithEarlySyntacticErrors.baseline

// @Filename: inputFile1.ts
// @emitThisFile: true
//// // File contains early errors. All outputs should be skipped.
//// const uninitialized_const_error;

verify.baselineGetEmitOutput();