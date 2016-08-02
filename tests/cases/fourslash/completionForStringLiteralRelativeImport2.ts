/// <reference path='fourslash.ts' />
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
    verify.importModuleCompletionListContains("f1");
    verify.importModuleCompletionListContains("f2");
    verify.importModuleCompletionListContains("f3");
    verify.importModuleCompletionListContains("f4");
    verify.importModuleCompletionListContains("e1");
    verify.importModuleCompletionListContains("e2");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(6);

    goTo.marker(kind + "1");
    verify.importModuleCompletionListContains("f1");
    verify.importModuleCompletionListContains("f2");
    verify.importModuleCompletionListContains("f3");
    verify.importModuleCompletionListContains("f4");
    verify.importModuleCompletionListContains("e1");
    verify.importModuleCompletionListContains("e2");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(6);
}