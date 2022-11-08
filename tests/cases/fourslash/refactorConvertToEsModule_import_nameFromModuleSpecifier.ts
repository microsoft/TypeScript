/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const [] = require("a-b");
////const [] = require("0a");
////const [] = require("1a");

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import aB from "a-b";
const [] = aB;
import A from "0a";
const [] = A;
import _A from "1a";
const [] = _A;`,
});
