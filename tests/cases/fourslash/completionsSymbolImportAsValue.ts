/// <reference path="fourslash.ts" />

// Test the simplest case possible

// @Filename: /exports.ts
////export const VALUE = 42;
////export interface SomeType { }

// @Filename: /imports.ts
////import type { SomeType } from "./exports";
////function main() {
////    /*completion*/;
////}

verify.completions({
    marker: "completion",
    includes: [
        { name: "VALUE", source: "/exports", hasAction: true, sortText: "16" },
    ],
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});

verify.applyCodeActionFromCompletion("completion", {
    name: "VALUE",
    source: "/exports",
    description: `Update import from "./exports"`,
    newFileContent:
`import { VALUE, type SomeType } from "./exports";
function main() {
    VALUE;
}`
});