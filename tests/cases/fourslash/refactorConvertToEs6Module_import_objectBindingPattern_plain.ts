/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const { x, y: z } = require("x");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: 'import { x, y as z } from "x";',
});
