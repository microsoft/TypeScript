/// <reference path="fourslash.ts" />

// @allowJs: true
// @module: esnext

// @Filename: /node_modules/foo/index.d.ts
//// export const fail: number;

// @Filename: /a.js
//// export const x = 0;
//// export class C {}
////

// @Filename: /b.js
//// /**/

verify.completions({ marker: "", excludes: "fail", preferences: { includeCompletionsForModuleExports: true } });
edit.insert("export const k = 10;\r\nf");
verify.completions({
    includes: {
        name: "fail",
        source: "/node_modules/foo/index",
        sourceDisplay: "./node_modules/foo/index",
        text: "const fail: number",
        kind: "const",
        kindModifiers: "export,declare",
        hasAction: true,
    },
    preferences: { includeCompletionsForModuleExports: true },
});
