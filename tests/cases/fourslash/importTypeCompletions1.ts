/// <reference path="fourslash.ts" />
// @target: esnext

// @filename: /foo.ts
////export interface Foo {}

// @filename: /bar.ts
////[|import type F/**/|]

goTo.file("/bar.ts")
verify.completions({
    marker: "",
    exact: [{
        name: "Foo",
        sourceDisplay: "./foo",
        source: "./foo",
        insertText: "import type { Foo } from \"./foo\";",
        replacementSpan: test.ranges()[0]
    }],
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsForModuleExports: true,
        includeCompletionsForImportStatements: true,
        includeCompletionsWithInsertText: true
    }
});
