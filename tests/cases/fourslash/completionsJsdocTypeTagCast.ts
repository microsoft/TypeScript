/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: /a.js
////const x = /** @type {{ s: string }} */ ({ /**/ });

verify.completions({ marker: "", exact: ["s", "x"] });
