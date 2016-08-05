/// <reference path='fourslash.ts' />

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
    verify.importModuleCompletionListContains("f1.ts");
    verify.importModuleCompletionListContains("f1.d.ts");
    verify.importModuleCompletionListContains("f2.tsx");
    verify.importModuleCompletionListContains("e1.ts");
    verify.importModuleCompletionListContains("parentTest");
    verify.not.importModuleCompletionListItemsCountIsGreaterThan(5);
}

goTo.marker("5");
verify.importModuleCompletionListContains("g1.ts");
verify.importModuleCompletionListContains("sub");
verify.not.importModuleCompletionListItemsCountIsGreaterThan(2);

goTo.marker("6");
verify.importModuleCompletionListContains("g1.ts");
verify.importModuleCompletionListContains("sub");
verify.not.importModuleCompletionListItemsCountIsGreaterThan(2);