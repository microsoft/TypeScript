/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /bar.ts
////export {};
////declare module "./a" {
////    export const bar = 0;
////}

// @Filename: /user.ts
/////**/

verify.completions({
    marker: "",
    includes: [
        {
            name: "foo",
            text: "const foo: 0",
            source: "/a",
            sourceDisplay: "./a",
            hasAction: true,
        },
        {
            name: "bar",
            text: "const bar: 0",
            source: "/a",
            sourceDisplay: "./a",
            hasAction: true,
        },
    ],
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});
