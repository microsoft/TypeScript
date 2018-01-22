/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const { x, y: z } = /*a*/require/*b*/("x");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: 'import { x, y as z } from "x";',
});
