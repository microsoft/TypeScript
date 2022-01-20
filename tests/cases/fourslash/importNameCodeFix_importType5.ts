/// <reference path="fourslash.ts" />

// @module: es2015

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomeInterface, SomePig } from "./exports.js";
//// new SomePig/**/

goTo.marker("");
verify.importFixAtPosition([
`import { SomeInterface, SomePig } from "./exports.js";
new SomePig`]);

// verify.applyCodeActionFromCompletion("", {
//   name: "SomePig",
//   source: "./exports.js",
//   description: `Add 'SomePig' to existing import declaration from "./exports.js"`,
//   newFileContent:
// `import { SomeInterface, SomePig } from "./exports.js";
// new SomePig`,
//   data: {
//     exportName: "SomePig",
//     fileName: "/exports.ts",
//   },
//   preferences: {
//     includeCompletionsForModuleExports: true,
//     allowIncompleteCompletions: true,
//     includeInsertTextCompletions: true,
//   },
// });