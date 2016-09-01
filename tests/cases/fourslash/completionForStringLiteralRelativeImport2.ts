/// <reference path='fourslash.ts' />

// Should give completions for ts and js files when allowJs is true

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
// @Filename: f1.js
//// /*f1j*/
// @Filename: f1.d.ts
//// /*f1d*/
// @Filename: f2.tsx
//// /*f2*/
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
    verify.completionListContains("f1");
    verify.completionListContains("f2");
    verify.completionListContains("f3");
    verify.completionListContains("f4");
    verify.completionListContains("e1");
    verify.completionListContains("e2");
    verify.not.completionListItemsCountIsGreaterThan(6);

    goTo.marker(kind + "1");
    verify.completionListContains("f1");
    verify.completionListContains("f2");
    verify.completionListContains("f3");
    verify.completionListContains("f4");
    verify.completionListContains("e1");
    verify.completionListContains("e2");
    verify.not.completionListItemsCountIsGreaterThan(6);
}