/// <reference path='fourslash.ts' />

// Exercises completions for absolute paths.

// @Filename: tests/test0.ts
//// /// <reference path="/tests/cases/f/*0*/

// @Filename: tests/test1.ts
//// /// <reference path="/tests/cases/fourslash/*1*/

// @Filename: tests/test2.ts
//// /// <reference path="/tests/cases/fourslash//*2*/

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

goTo.marker("0");
verify.completionListContains("fourslash");
verify.not.completionListItemsCountIsGreaterThan(1);

goTo.marker("1");
verify.completionListContains("fourslash");
verify.not.completionListItemsCountIsGreaterThan(1);

goTo.marker("2");
verify.completionListContains("f1.ts");
verify.completionListContains("f2.tsx");
verify.completionListContains("e1.ts");
verify.completionListContains("folder");
verify.completionListContains("tests");
verify.not.completionListItemsCountIsGreaterThan(5);