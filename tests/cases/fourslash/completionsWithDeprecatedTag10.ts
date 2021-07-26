/// <reference path="fourslash.ts" />

// @Filename: /foo.ts
/////** @deprecated foo */
////export const foo = 0;

// @Filename: /index.ts
/////**/

verify.completions({
    marker: "",
    includes: [{
        name: "foo",
        source: "/foo",
        sourceDisplay: "./foo",
        hasAction: true,
        kind: "const",
        kindModifiers: "export,deprecated",
        sortText: completion.SortText.DeprecatedAutoImportSuggestions
    }],
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});
