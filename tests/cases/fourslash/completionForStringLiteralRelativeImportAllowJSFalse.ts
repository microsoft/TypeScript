/// <reference path='fourslash.ts' />

// Should give completions for ts files only when allowJs is false.

// @Filename: test0.ts
//// import * as foo1 from "./*import_as0*/
//// import * as foo2 from ".//*import_as1*/
//// import * as foo4 from "./d1//*import_as2*/

//// import foo6 = require("./*import_equals0*/
//// import foo7 = require(".//*import_equals1*/
//// import foo9 = require("./d1//*import_equals2*/

//// var foo11 = require("./*require0*/
//// var foo12 = require(".//*require1*/
//// var foo14 = require("./d1//*require2*/

// @Filename: d2/d3/test1.ts
//// import * as foo16 from "..//*import_as3*/
//// import foo17 = require("..//*import_equals3*/
//// var foo18 = require("..//*require3*/


// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.js
//// /*f2*/
// @Filename: f3.d.ts
//// /*f3*/
// @Filename: f4.tsx
//// /f4*/
// @Filename: f5.js
//// /*f5*/
// @Filename: f6.jsx
//// /*f6*/
// @Filename: f7.ts
//// /*f7*/
// @Filename: d1/f8.ts
//// /*d1f1*/
// @Filename: d1/f9.ts
//// /*d1f9*/
// @Filename: d2/f10.ts
//// /*d2f1*/
// @Filename: d2/f11.ts
//// /*d2f11*/

const kinds = ["import_as", "import_equals", "require"];

for (const kind of kinds) {
    goTo.marker(kind + "0");
    verify.completionListIsEmpty();

    goTo.marker(kind + "1");
    verify.completionListContains("f1");
    verify.completionListContains("f3");
    verify.completionListContains("f4");
    verify.completionListContains("f7");
    verify.completionListContains("d1");
    verify.completionListContains("d2");
    verify.not.completionListItemsCountIsGreaterThan(6);

    goTo.marker(kind + "2");
    verify.completionListContains("f8");
    verify.completionListContains("f9");
    verify.not.completionListItemsCountIsGreaterThan(2);

    goTo.marker(kind + "3");
    verify.completionListContains("f10");
    verify.completionListContains("f11");
    verify.completionListContains("d3");
    verify.not.completionListItemsCountIsGreaterThan(3);
}