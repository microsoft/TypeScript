/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const x = /*a*/require/*b*/("x").default;
////const a = require("b").c;
////const a = require("a").a;
////const [a, b] = require("c").d;
////const [a, b] = require("c").a; // Test that we avoid shadowing the earlier local variable 'a' from 'const [a,b] = d;'.

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `import x from "x";
import { c as a } from "b";
import { a } from "a";
import { d } from "c";
const [a, b] = d;
import { a as _a } from "c";
const [a, b] = _a; // Test that we avoid shadowing the earlier local variable 'a' from 'const [a,b] = d;'.`,
});
