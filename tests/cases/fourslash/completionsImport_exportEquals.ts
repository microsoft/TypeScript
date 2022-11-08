/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /a.d.ts
////declare function a(): void;
////declare namespace a {
////    export interface b {}
////}
////export = a;

// @Filename: /b.ts
////a/*0*/;
////let x: b/*1*/;

const preferences: FourSlashInterface.UserPreferences = { includeCompletionsForModuleExports: true };
verify.completions(
    {
        marker: "0",
        includes: {
            name: "a",
            source: "/a",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        preferences,
    },
    {
        marker: "1",
        includes: {
            name: "b",
            source: "/a",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        preferences,
    }
);

// Import { b } first, or it will just add a qualified name from 'a' (which isn't what we're trying to test)
verify.applyCodeActionFromCompletion("1", {
    name: "b",
    source: "/a",
    description: `Add import from "./a"`,
    newFileContent:
`import { b } from "./a";

a;
let x: b;`,
});

verify.applyCodeActionFromCompletion("0", {
    name: "a",
    source: "/a",
    description: `Add import from "./a"`,
    newFileContent:
`import { b } from "./a";
import a = require("./a");

a;
let x: b;`,
});

