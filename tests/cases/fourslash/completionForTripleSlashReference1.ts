/// <reference path='fourslash.ts' />

// Should give completions for relative references to ts files when allowJs is false

// @Filename: test0.ts
//// /// <reference path="/*0*/
//// /// <reference path="./*1*/
//// /// <reference path="../*2*/
//// /// <reference path=".//*3*/
//// /// <reference path="./f/*4*/" />
//// /// <reference path="./parentTest//*5*/

// @Filename: parentTest/sub/test1.ts
//// /// <reference path="../g/*6*/

// @Filename: f1.ts
//// /*f1*/
// @Filename: f1.js
//// /*f1j*/
// @Filename: f1.d.ts
//// /*f1d*/
// @Filename: f2.tsx
//// /f2*/
// @Filename: f3.js
//// /*f3*/
// @Filename: f4.jsx
//// /*f4*/
// @Filename: e1.ts
//// /*e1*/
// @Filename: parentTest/g1.ts
//// /*parentg1*/

for (let i = 0; i < 5; i++) {
    goTo.marker("" + i);
    verify.completionListContains("f1.ts");
    verify.completionListContains("f1.d.ts");
    verify.completionListContains("f2.tsx");
    verify.completionListContains("e1.ts");
    verify.completionListContains("parentTest");
    verify.not.completionListItemsCountIsGreaterThan(5);
}

goTo.marker("5");
verify.completionListContains("g1.ts");
verify.completionListContains("sub");
verify.not.completionListItemsCountIsGreaterThan(2);

goTo.marker("6");
verify.completionListContains("g1.ts");
verify.completionListContains("sub");
verify.not.completionListItemsCountIsGreaterThan(2);