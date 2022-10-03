/// <reference path='fourslash.ts' />

// Should give completions for directories that are merged via the rootDirs compiler option

// @rootDirs: /sub/src1,/src2

// @Filename: /src2/test0.ts
//// import * as foo1 from "./mo/*import_as0*/
//// import foo2 = require("./mo/*import_equals0*/
//// var foo3 = require("./mo/*require0*/

// @Filename: /src2/inner/inner0.ts
////import * as s from ".//*inner*/";

// @Filename: /src2/inner/inner1.ts
////export const x = 0;

// @Filename: /src2/module0.ts
//// export var w = 0;

// @Filename: /sub/src1/module1.ts
//// export var x = 0;

// @Filename: /sub/src1/module2.ts
//// export var y = 0;

// @Filename: /sub/src1/more/module3.ts
//// export var z = 0;


// @Filename: f1.ts
////
// @Filename: f2.tsx
////
// @Filename: folder/f1.ts
////
// @Filename: f3.js
////
// @Filename: f4.jsx
////
// @Filename: e1.ts
////
// @Filename: e2.js
////

verify.completions(
    {
        marker: ["import_as0", "import_equals0", "require0"],
        exact: ["module1", "module2", "more", "module0", "inner"],
        isNewIdentifierLocation: true,
    },
    {
        marker: "inner",
        exact: "inner1",
        isNewIdentifierLocation: true,
    }
);
