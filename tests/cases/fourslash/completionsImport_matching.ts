/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
// Not included:
////export function abcde() {}
////export function dbf() {}
// Included:
////export function bdf() {}
////export function abcdef() {}
////export function BDF() {}

// @Filename: /b.ts
////bdf/**/

verify.completions({
    marker: "",
    includes: ["bdf", "abcdef", "BDF"].map(name =>
        ({ name, source: "/a", text: `function ${name}(): void`, hasAction: true, kind: "function", sourceDisplay: "./a" })),
    excludes: ["abcde", "dbf"],
    preferences: { includeCompletionsForModuleExports: true },
})
