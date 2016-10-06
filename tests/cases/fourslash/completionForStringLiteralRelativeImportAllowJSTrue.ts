/// <reference path='fourslash.ts' />

// Should give completions for ts and js files when allowJs is true.

// @allowJs: true

// @Filename: test0.ts
//// import * as foo1 from ".//*import_as0*/
//// import * as foo2 from "./f/*import_as1*/

//// import foo3 = require(".//*import_equals0*/
//// import foo4 = require("./f/*import_equals1*/

//// var foo5 = require(".//*require0*/
//// var foo6 = require("./f/*require1*/

// @Filename: f1.ts
//// /f1*/
// @Filename: f2.js
//// /*f2*/
// @Filename: f3.d.ts
//// /*f3*/
// @Filename: f4.tsx
//// /*f4*/
// @Filename: f5.js
//// /*f5*/
// @Filename: f6.jsx
//// /*f6*/
// @Filename: g1.ts
//// /*g1*/
// @Filename: g2.js
//// /*g2*/
const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    for(let i = 0; i < 2; ++i) {
    goTo.marker(kind + i);
    verify.completionListContains("f1");
    verify.completionListContains("f2");
    verify.completionListContains("f3");
    verify.completionListContains("f4");
    verify.completionListContains("f5");
    verify.completionListContains("f6");
    verify.completionListContains("g1");
    verify.completionListContains("g2");
    verify.not.completionListItemsCountIsGreaterThan(8);
    }
}