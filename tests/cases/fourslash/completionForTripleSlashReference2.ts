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
    verify.completionListContains("f1.ts");
    verify.completionListContains("f1.js");
    verify.completionListContains("f1.d.ts");
    verify.completionListContains("f2.tsx");
    verify.completionListContains("f4.jsx");
    verify.not.completionListItemsCountIsGreaterThan(5);
}