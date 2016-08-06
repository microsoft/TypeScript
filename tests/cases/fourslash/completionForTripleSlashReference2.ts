/// <reference path='fourslash.ts' />

// Should give completions for relative references to js and ts files when allowJs is true

// @allowJs: true

// @Filename: test0.ts
//// /// <reference path="/*0*/
//// /// <reference path="./*1*/
//// /// <reference path="../*2*/
//// /// <reference path=".//*3*/
//// /// <reference path="./f/*4*/" />

// @Filename: f1.ts
//// /*f1*/
// @Filename: f1.js
//// /*f1j*/
// @Filename: f1.d.ts
//// /*f1d*/
// @Filename: f2.tsx
//// /f2*/
// @Filename: f4.jsx
//// /*f4*/

for (let i = 0; i < 5; i++) {
    goTo.marker("" + i);
    verify.importModuleCompletionListContains("f1.ts");
    verify.importModuleCompletionListContains("f1.js");
    verify.importModuleCompletionListContains("f1.d.ts");
    verify.importModuleCompletionListContains("f2.tsx");
    verify.importModuleCompletionListContains("f4.jsx");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(5);
}