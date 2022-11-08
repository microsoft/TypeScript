/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
//// export const x = 0;
//// export class C {}
//// /** @typedef {number} T */

// @Filename: /b.js
//// export const m = 0;
//// /** @type {/*0*/} */
//// /** @type {/*1*/} */

verify.completions({
    marker: ["0", "1"],
    includes: [
        {
            name: "C",
            source: "/a",
            sourceDisplay: "./a",
            text: "class C",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        {
            name: "T",
            source: "/a",
            sourceDisplay: "./a",
            text: "type T = number",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
    ],
    excludes: "x",
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});

// Something with a value-side will get a normal import.
verify.applyCodeActionFromCompletion("0", {
    name: "C",
    source: "/a",
    description: `Add import from "./a"`,
    newFileContent:
`import { C } from "./a";

export const m = 0;
/** @type {} */
/** @type {} */`,
});

// A pure type will get `import().T`
verify.applyCodeActionFromCompletion("1", {
    name: "T",
    source: "/a",
    description: `Change 'T' to 'import("./a").T'`,
    newFileContent:
`import { C } from "./a";

export const m = 0;
/** @type {} */
/** @type {import("./a").} */`,
});
