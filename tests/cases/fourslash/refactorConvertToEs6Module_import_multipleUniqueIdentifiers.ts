/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const x = require("x");
////const [a, b] = /*a*/require/*b*/("x");
////const {c, ...d} = require("x");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `import x from "x";
import _x from "x";
const [a, b] = _x;
import __x from "x";
const { c, ...d } = __x;`
});
