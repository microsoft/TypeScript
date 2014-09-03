/// <reference path="fourslash.ts" />

// @Filename: semanticErrorsResult2.ts
//// var x:number = "hello world";

edit.enableDeclaration();
// Fail to generate .d.ts file due to semantic error but succeeded in generate javascript file
verify.emitOutput(EmitOutputResult.FailedToGenerateDeclarationsBecauseOfSemanticErrors,"tests/cases/fourslash/semanticErrorsResult2.js"); 