/// <reference path='fourslash.ts' />

// @Filename: test0.ts
//// /// <reference path="./*0*/

// @Filename: test1.ts
//// /// <reference path=".//*1*/

// @Filename: test2.ts
//// /// <reference path="./f/*2*/" />

// @Filename: test3.ts
//// /// <reference path="./folder//*3*/

// @Filename: test4.ts
//// /// <reference path="./folder/h/*4*/

// @Filename: parentTest/sub/test5.ts
//// /// <reference path="../g/*5*/

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
// @Filename: folder/f1.ts
//// /*subf1*/
// @Filename: folder/h1.ts
//// /*subh1*/
// @Filename: parentTest/f1.ts
//// /*parentf1*/
// @Filename: parentTest/g1.ts
//// /*parentg1*/

goTo.marker("0");
verify.completionListIsEmpty();

goTo.marker("1");
verify.completionListContains("f1.ts");
verify.completionListContains("f1.d.ts");
verify.completionListContains("f2.tsx");
verify.completionListContains("e1.ts");
verify.completionListContains("test0.ts");
verify.completionListContains("test1.ts");
verify.completionListContains("test2.ts");
verify.completionListContains("test3.ts");
verify.completionListContains("test4.ts");
verify.completionListContains("folder/");
verify.completionListContains("parentTest/");
verify.not.completionListItemsCountIsGreaterThan(11);

goTo.marker("2");
verify.completionListContains("f1.ts");
verify.completionListContains("f1.d.ts");
verify.completionListContains("f2.tsx");
verify.completionListContains("folder/");
verify.not.completionListItemsCountIsGreaterThan(4);

goTo.marker("3");
verify.completionListContains("f1.ts");
verify.completionListContains("h1.ts");
verify.not.completionListItemsCountIsGreaterThan(2);

goTo.marker("4");
verify.completionListContains("h1.ts");
verify.not.completionListItemsCountIsGreaterThan(1);

goTo.marker("5");
verify.completionListContains("g1.ts");
verify.not.completionListItemsCountIsGreaterThan(1);