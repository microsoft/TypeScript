/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true

// @Filename: /a.js
////const x = require("x"), y = 0, { z } = require("z");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import x from "x";
const y = 0;
import { z } from "z";`,
});
