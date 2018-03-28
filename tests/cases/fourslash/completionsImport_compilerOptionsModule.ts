/// <reference path="fourslash.ts" />

// @allowJs: true
// @module: commonjs

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.js
////const a = require("./a");
////fo/*b*/

// @Filename: /c.js
////const x = 0;/*c*/

// @Filename: /d.js
////const a = import("./a"); // Does not make this an external module
////fo/*d*/

goTo.marker("b");
verify.completionListContains("x");
verify.not.completionListContains({ name: "foo", source: "/a" });

for (const marker of ["c", "d"]) {
    goTo.marker(marker);
    verify.completionListContains({ name: "foo", source: "/a" }, "const foo: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
        includeCompletionsForModuleExports: true,
        sourceDisplay: "./a",
    });
}
