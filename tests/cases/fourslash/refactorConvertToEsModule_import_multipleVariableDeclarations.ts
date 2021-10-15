/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const x = require("x"), y = 0, { z } = require("z");
////x; y; z;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import x from "x";
const y = 0;
import { z } from "z";
x; y; z;`,
});
