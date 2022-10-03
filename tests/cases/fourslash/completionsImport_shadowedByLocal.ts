/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const foo = 1;
////fo/**/

verify.completions({
    marker: "",
    exact: completion.globalsPlus([
        {
            name: "foo",
            text: "const foo: 1",
        },
    ], { noLib: true }),
    preferences: { includeCompletionsForModuleExports: true },
});
