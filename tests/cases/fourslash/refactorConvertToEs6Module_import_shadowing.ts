/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const mod = require("mod");
////const x = 0;
////mod.x(x);

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import { x as _x } from "mod";
const x = 0;
_x(x);`,
});
