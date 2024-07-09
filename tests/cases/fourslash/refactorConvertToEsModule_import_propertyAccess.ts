/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const x = require("x").default;
////const a = require("b").c;
////const a = require("a").a;
////const [a, b] = require("c").d;
////const [a, b] = require("c").a; // Test that we avoid shadowing the earlier local variable 'a' from 'const [a,b] = d;'.
////x; a; b;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import x from "x";
import { c as a } from "b";
import { a } from "a";
import { d } from "c";
const [a, b] = d;
import { a as _a } from "c";
const [a, b] = _a; // Test that we avoid shadowing the earlier local variable 'a' from 'const [a,b] = d;'.
x; a; b;`,
});
