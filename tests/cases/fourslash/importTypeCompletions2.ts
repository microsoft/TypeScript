/// <reference path="fourslash.ts" />
// @target: esnext

// @filename: /foo.ts
////export const Foo = {};

// @filename: /bar.ts
////[|import type F/**/|]

goTo.file("/bar.ts")
verify.completions({
    marker: "",
    exact: [],
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsForModuleExports: true,
        includeCompletionsForImportStatements: true,
        includeCompletionsWithInsertText: true
    }
});
