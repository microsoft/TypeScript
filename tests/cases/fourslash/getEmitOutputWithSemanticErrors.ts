/// <reference path="fourslash.ts" />

// @Filename: semanticErrorsResult.ts
//// var x:number = "hello world";

// Only generate javscript file. The semantic error should not affect it
verify.emitOutput(EmitReturnStatus.JSGeneratedWithSemanticErrors,"tests/cases/fourslash/semanticErrorsResult.js"); 