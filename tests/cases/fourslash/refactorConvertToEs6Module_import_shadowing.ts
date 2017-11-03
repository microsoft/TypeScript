/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const mod = /*a*/require/*b*/("mod");
////const x = 0;
////mod.x(x);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `import { x as _x } from "mod";
const x = 0;
_x(x);`
});
