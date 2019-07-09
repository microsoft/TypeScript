/// <reference path="fourslash.ts" />

// @allowJs: true
// @module: commonjs

// @Filename: /node_modules/a/index.d.ts
////export const foo = 0;

// @Filename: /b.js
////const a = require("./a");
////fo/*b*/

// @Filename: /c.js
////const x = 0;/*c*/

// @Filename: /c1.js
////// @ts-check
////const x = 0;/*ccheck*/

// @Filename: /c2.ts
////const x = 0;/*cts*/

// @Filename: /d.js
////const a = import("./a"); // Does not make this an external module
////fo/*d*/

// @Filename: /d1.js
////// @ts-check
////const a = import("./a"); // Does not make this an external module
////fo/*dcheck*/

// @Filename: /d2.ts
////const a = import("./a"); // Does not make this an external module
////fo/*dts*/

verify.completions({
    marker: ["b"],
    excludes: "foo",
    preferences: { includeCompletionsForModuleExports: true }
});
verify.completions({
    marker: ["c", "ccheck", "cts", "d", "dcheck", "dts"],
    includes: [{
        name: "foo",
        source: "/node_modules/a/index",
        text: "const foo: 0",
        kind: "const",
        kindModifiers: "export,declare",
        hasAction: true,
        sourceDisplay: "a",
        sortText: completion.SortText.AutoImportSuggestions
    }],
    preferences: { includeCompletionsForModuleExports: true },
});
