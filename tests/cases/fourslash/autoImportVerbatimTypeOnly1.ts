/// <reference path="fourslash.ts" />

// @module: node18
// @verbatimModuleSyntax: true

// @Filename: /mod.ts
//// export const value = 0;
//// export class C { constructor(v: any) {} }
//// export interface I {}

// @Filename: /a.mts
//// const x: /**/

verify.applyCodeActionFromCompletion("", {
    name: "I",
    source: "./mod",
    description: `Add import from "./mod.js"`,
    data: {
        exportName: "I",
        fileName: "/mod.ts",
        moduleSpecifier: "./mod.js",
    },
    newFileContent: `import type { I } from "./mod.js";

const x: `,
});

edit.insert("I = new C");

verify.applyCodeActionFromCompletion(/*markerName*/ undefined, {
    name: "C",
    source: "./mod",
    description: `Update import from "./mod.js"`,
    data: {
        exportName: "C",
        fileName: "/mod.ts",
        moduleSpecifier: "./mod.js",
    },
    newFileContent: `import { C, type I } from "./mod.js";

const x: I = new C`,
});
