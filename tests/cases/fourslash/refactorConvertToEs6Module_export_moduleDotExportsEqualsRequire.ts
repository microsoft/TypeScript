/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.d.ts
////export const x: number;

// @Filename: /b.d.ts
////export default function f() {}

// @Filename: /c.d.ts
////export default function f(): void;
////export function g(): void;

// @Filename: /d.ts
////declare const x: number;
////export = x;

// @Filename: /z.js
// Normally -- just `export *`
/////*a*/module/*b*/.exports = require("./a");
// If just a default is exported, just `export { default }`
////module.exports = require("./b");
// May need both
////module.exports = require("./c");
// For `export =` re-export the "default" since that's what it will be converted to.
////module.exports = require("./d");
// In untyped case just go with `export *`
////module.exports = require("./unknown");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent:
`export * from "./a";
export { default } from "./b";
export * from "./c";
export { default } from "./c";
export { default } from "./d";
export * from "./unknown";`,
});
