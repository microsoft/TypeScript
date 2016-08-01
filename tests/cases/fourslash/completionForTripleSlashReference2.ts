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
verify.importModuleCompletionListContains("f1.ts");
verify.importModuleCompletionListContains("f1.js");
verify.importModuleCompletionListContains("f1.d.ts");
verify.importModuleCompletionListContains("f2.tsx");
verify.importModuleCompletionListContains("f3.js");
verify.importModuleCompletionListContains("f4.jsx");
verify.importModuleCompletionListContains("e1.ts");
verify.importModuleCompletionListContains("e2.js");
verify.importModuleCompletionListContains("test0.ts");
verify.importModuleCompletionListContains("test1.ts");
verify.not.importModuleCompletionListItemsCountIsGreaterThan(10);

goTo.marker("1");
verify.importModuleCompletionListContains("f1.ts");
verify.importModuleCompletionListContains("f1.js");
verify.importModuleCompletionListContains("f1.d.ts");
verify.importModuleCompletionListContains("f2.tsx");
verify.importModuleCompletionListContains("f3.js");
verify.importModuleCompletionListContains("f4.jsx");
verify.not.importModuleCompletionListItemsCountIsGreaterThan(6);