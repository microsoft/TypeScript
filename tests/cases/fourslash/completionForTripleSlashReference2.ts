/// <reference path='fourslash.ts' />
// @allowJs: true

// @Filename: test0.ts
//// /// <reference path=".//*0*/

// @Filename: test1.ts
//// /// <reference path="./f/*1*/

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
verify.completionListContains("f1.ts");
verify.completionListContains("f1.js");
verify.completionListContains("f1.d.ts");
verify.completionListContains("f2.tsx");
verify.completionListContains("f3.js");
verify.completionListContains("f4.jsx");
verify.completionListContains("e1.ts");
verify.completionListContains("e2.js");
verify.completionListContains("test0.ts");
verify.completionListContains("test1.ts");
verify.not.completionListItemsCountIsGreaterThan(10);

goTo.marker("1");
verify.completionListContains("f1.ts");
verify.completionListContains("f1.js");
verify.completionListContains("f1.d.ts");
verify.completionListContains("f2.tsx");
verify.completionListContains("f3.js");
verify.completionListContains("f4.jsx");
verify.not.completionListItemsCountIsGreaterThan(6);