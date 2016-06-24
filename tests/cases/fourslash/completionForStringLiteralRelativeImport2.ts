/// <reference path='fourslash.ts' />
// @allowJs: true

// @Filename: test0.ts
//// import * as foo from ".//*0*/

// @Filename: test1.ts
//// import * as foo from "./f/*1*/

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

goTo.marker("0");
verify.completionListContains("f1");
verify.completionListContains("f2");
verify.completionListContains("f3");
verify.completionListContains("f4");
verify.completionListContains("e1");
verify.completionListContains("e2");
verify.completionListContains("test0");
verify.completionListContains("test1");
verify.not.completionListItemsCountIsGreaterThan(8);

goTo.marker("1");
verify.completionListContains("f1");
verify.completionListContains("f2");
verify.completionListContains("f3");
verify.completionListContains("f4");
verify.not.completionListItemsCountIsGreaterThan(4);