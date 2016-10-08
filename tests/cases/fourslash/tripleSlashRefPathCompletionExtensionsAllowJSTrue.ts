/// <reference path='fourslash.ts' />

// Should give completions for relative references to ts and js files when allowJs is true.

// @allowJs: true

// @Filename: test0.ts
//// /// <reference path="/*0*/
//// /// <reference path=".//*1*/
//// /// <reference path="./f/*2*/

// @Filename: f1.ts
//// /*f1*/
// @Filename: f1.js
//// /*f1j*/
// @Filename: f1.d.ts
//// /*f1d*/
// @Filename: f1.tsx
//// /f2*/
// @Filename: f1.js
//// /*f3*/
// @Filename: f1.jsx
//// /*f4*/
// @Filename: f1.cs
//// /*f5*/

for (let i = 0; i < 3; i++) {
    goTo.marker("" + i);
    verify.completionListContains("f1.ts");
    verify.completionListContains("f1.d.ts");
    verify.completionListContains("f1.tsx");
    verify.completionListContains("f1.js");
    verify.completionListContains("f1.jsx");
    verify.not.completionListItemsCountIsGreaterThan(5);
}