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

goTo.file("/b.js");
goTo.marker();
verify.not.completionListContains("fail", undefined, undefined, undefined, undefined, undefined, { includeCompletionsForModuleExports: true });
edit.insert("export const k = 10;\r\nf");
verify.completionListContains(
    { name: "fail", source: "/node_modules/foo/index" },
    "const fail: number",
    "",
    "const",
    undefined,
    true,
    {
        includeCompletionsForModuleExports: true,
        sourceDisplay: "./node_modules/foo/index"
    });
