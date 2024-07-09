/// <reference path="fourslash.ts" />

// @target: es2020
// @module: esnext

// @Filename: /foo.d.ts
//// declare namespace Foo {}
//// export = Foo;

// @Filename: /test.ts
//// [|import F/**/|]

goTo.file("/test.ts")
verify.completions({
    marker: "",
    exact: [{
        name: "Foo",
        sourceDisplay: "./foo",
        source: "./foo",
        insertText: "import * as Foo from \"./foo\";",
        replacementSpan: test.ranges()[0]
    }, {
        name: "type",
        sortText: completion.SortText.GlobalsOrKeywords,
    }],
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsForModuleExports: true,
        includeCompletionsForImportStatements: true,
        includeCompletionsWithInsertText: true
    }
});
