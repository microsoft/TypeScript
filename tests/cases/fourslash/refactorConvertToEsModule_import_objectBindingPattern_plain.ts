/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const { x, y: z } = require("x");
////x; z;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import { x, y as z } from "x";
x; z;`,
});
