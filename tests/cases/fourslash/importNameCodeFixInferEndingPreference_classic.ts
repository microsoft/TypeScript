/// <reference path="fourslash.ts" />

// @module: esnext
// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: /a.js
//// export const a = 0;

// @Filename: /b.js
//// export const b = 0;

// @Filename: /c.js
//// import { a } from "./a.js";
////
//// b/**/;

verify.importFixModuleSpecifiers("", ["./b.js"]);
