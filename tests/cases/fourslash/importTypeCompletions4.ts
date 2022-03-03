/// <reference path="fourslash.ts" />
// @esModuleInterop: true

// @Filename: /foo.ts
////interface Foo { };
////export = Foo;

// @Filename: /bar.ts
//// [|import type f/**/|]

goTo.file("/bar.ts")
verify.completions({
    marker: "",
    exact: [{
        name: "Foo",
        sourceDisplay: "./foo",
        source: "./foo",
        insertText: "import type Foo from \"./foo\";",
        replacementSpan: test.ranges()[0]
    }],
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsForModuleExports: true,
        includeCompletionsForImportStatements: true,
        includeCompletionsWithInsertText: true
    }
});
