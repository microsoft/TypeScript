/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
// Not included:
////export function abcde() {}
////export function dbf() {}
////export function bdf() {}
////export function abcdef() {}
// Included:
////export function aBcdef() {}
////export function a_bcdef() {}
////export function BDF() {}

// @Filename: /b.ts
////bdf/**/

verify.completions({
    marker: "",
    includes: ["aBcdef", "a_bcdef", "BDF"].map(name =>
        ({
            name,
            source: "/a",
            text: `function ${name}(): void`,
            hasAction: true,
            kind: "function",
            kindModifiers: "export",
            sourceDisplay: "./a",
            sortText: completion.SortText.AutoImportSuggestions
        })),
    excludes: ["abcde", "dbf"],
    preferences: { includeCompletionsForModuleExports: true },
})
