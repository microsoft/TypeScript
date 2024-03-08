/// <reference path="fourslash.ts" />

// @Filename: ./$foo.ts
////export function foo() {}

// @Filename: ./bar.ts
////import f/**/

verify.baselineCompletions({
    includeCompletionsForImportStatements: true,
    includeCompletionsForModuleExports: true,
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithInsertText: true
});
