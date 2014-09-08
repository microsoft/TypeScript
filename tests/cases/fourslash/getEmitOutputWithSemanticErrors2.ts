/// <reference path="fourslash.ts" />

// @declaration: true
// @Filename: semanticErrorsResult2.ts
//// var x:number = "hello world";

// Fail to generate .d.ts file due to semantic error but succeeded in generate javascript file
verify.emitOutput(EmitReturnStatus.DeclarationGenerationSkipped,"tests/cases/fourslash/semanticErrorsResult2.js"); 