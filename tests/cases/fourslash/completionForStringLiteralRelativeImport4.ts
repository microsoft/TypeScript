/// <reference path='fourslash.ts' />

// Should give completions for directories that are merged via the rootDirs compiler option

// @rootDirs: tests/cases/fourslash/sub/src1,tests/cases/fourslash/src2

// @Filename: src2/test0.ts
//// import * as foo1 from "./mo/*import_as0*/
//// import foo2 = require("./mo/*import_equals0*/
//// var foo3 = require("./mo/*require0*/

// @Filename: src2/module0.ts
//// export var w = 0;

// @Filename: sub/src1/module1.ts
//// export var x = 0;

// @Filename: sub/src1/module2.ts
//// export var y = 0;

// @Filename: sub/src1/more/module3.ts
//// export var z = 0;


// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.tsx
//// /*f2*/
// @Filename: folder/f1.ts
//// /*subf1*/
// @Filename: f3.js
//// /*f3*/
// @Filename: f4.jsx
//// /*f4*/
// @Filename: e1.ts
//// /*e1*/
// @Filename: e2.js
//// /*e2*/

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");

    verify.completionListContains("module0");
    verify.completionListContains("module1");
    verify.completionListContains("module2");
    verify.completionListContains("more");

    // Should not contain itself
    verify.not.completionListItemsCountIsGreaterThan(4);
}