/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /foo.ts
////export const foo = { };
////export interface Foo { };

// @Filename: /bar.ts
//// [|import type * as f/**/|]

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
