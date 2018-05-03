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

verify.completions({ marker: ["b", "c", "d"], excludes: "foo", preferences: { includeCompletionsForModuleExports: true } });
verify.completions({
    marker: ["c2", "d2"],
    includes: [{ name: "foo", source: "/node_modules/a/index", text: "const foo: 0", kind: "const", hasAction: true, sourceDisplay: "a" }],
    preferences: { includeCompletionsForModuleExports: true },
});
