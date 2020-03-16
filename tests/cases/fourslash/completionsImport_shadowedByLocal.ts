/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const foo = 1;
////fo/**/

verify.completions({
    marker: "",
    exact: [
        completion.globalThisEntry,
        {
            name: "foo",
            text: "const foo: 1",
        },
        completion.undefinedVarEntry,
        ...completion.statementKeywordsWithTypes
    ],
    preferences: { includeCompletionsForModuleExports: true },
});
