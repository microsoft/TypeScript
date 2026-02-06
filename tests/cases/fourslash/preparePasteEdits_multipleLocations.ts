/// <reference path='fourslash.ts' />

// @module: commonjs
// @allowJs: true

// @Filename: /file1.js
//// import { aa, bb } = require("./other");
//// [|const r = 10;|]
//// export const s = 12;
//// [|export const t = aa + bb + r + s;
//// const u = 1;|]

// @Filename: /other.js
//// export const aa = 1;
//// export const bb = 2;
//// module.exports = { aa, bb };

verify.preparePasteEdits({
    copiedFromFile: "/file1.js",
    copiedTextRange: test.ranges(),
    providePasteEdits: true,
})