/// <reference path="fourslash.ts" />

// @allowJs: true
// @module: commonjs

// @Filename: /node_modules/a/index.d.ts
////export const foo = 0;

// @Filename: /b.js
////const a = require("./a");
////fo/*b*/

// @Filename: /c.js
////const x = 0;/*c*/ // Off for JS files (unless a non-declaration external module exists in the project)

// @Filename: /c2.ts
////const x = 0;/*c2*/

// @Filename: /d.js
////const a = import("./a"); // Does not make this an external module
////fo/*d*/

// @Filename: /d2.ts
////const a = import("./a"); // Does not make this an external module
////fo/*d2*/

for (const marker of ["b", "c", "d"]) {
    goTo.marker(marker);
    verify.not.completionListContains({ name: "foo", source: "/node_modules/a/index" }, undefined, undefined, undefined, undefined, undefined, {
        includeCompletionsForModuleExports: true
    });
}

for (const marker of ["c2", "d2"]) {
    goTo.marker(marker);
    verify.completionListContains({ name: "foo", source: "/node_modules/a/index" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
        includeCompletionsForModuleExports: true,
        sourceDisplay: "a",
    });
}
