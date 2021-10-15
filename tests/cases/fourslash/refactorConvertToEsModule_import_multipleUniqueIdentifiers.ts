/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const x = require("x");
////const [a, b] = require("x");
////const {c, ...d} = require("x");
////x; a; b; c; d;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import x from "x";
import _x from "x";
const [a, b] = _x;
import __x from "x";
const { c, ...d } = __x;
x; a; b; c; d;`,
});
