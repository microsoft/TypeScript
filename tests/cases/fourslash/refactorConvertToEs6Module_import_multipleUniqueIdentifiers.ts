/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const x = require("x");
////const [a, b] = require("x");
////const {c, ...d} = require("x");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import x from "x";
import _x from "x";
const [a, b] = _x;
import __x from "x";
const { c, ...d } = __x;`,
});
