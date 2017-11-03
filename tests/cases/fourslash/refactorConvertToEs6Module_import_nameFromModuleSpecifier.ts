/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const [] = /*a0*/require/*b0*/("a-b");
////const [] = /*a1*/require/*b1*/("0a");
////const [] = /*a2*/require/*b2*/("1a");

goTo.select("a0", "b0");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `import aB from "a-b";
const [] = aB;
import A from "0a";
const [] = A;
import _A from "1a";
const [] = _A;`
});
