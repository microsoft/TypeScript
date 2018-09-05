/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////export class C {}
/////** @typedef {number} T */

// @Filename: /b.js
////C;
/////** @type {T} */
////const x = 0;

goTo.file("/b.js");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import { C } from "./a";

C;
/** @type {import("./a").T} */
const x = 0;`,
});
