/// <reference path='fourslash.ts' />

// @Filename: test0.ts
//// import * as foo from "./*0*/

// @Filename: test1.ts
//// import * as foo from ".//*1*/

// @Filename: test2.ts
//// import * as foo from "./f/*2*/

// @Filename: test3.ts
//// import * as foo from "./folder//*3*/

// @Filename: test4.ts
//// import * as foo from "./folder/h/*4*/

// @Filename: parentTest/sub/test5.ts
//// import * as foo from "../g/*5*/

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
verify.completionListContains("f1");
verify.completionListContains("f2");
verify.completionListContains("e1");
verify.completionListContains("test0");
verify.completionListContains("test1");
verify.completionListContains("test2");
verify.completionListContains("test3");
verify.completionListContains("test4");
verify.completionListContains("folder/");
verify.completionListContains("parentTest/");
verify.not.completionListItemsCountIsGreaterThan(10);

goTo.marker("2");
verify.completionListContains("f1");
verify.completionListContains("f2");
verify.completionListContains("folder/");
verify.not.completionListItemsCountIsGreaterThan(3);

goTo.marker("3");
verify.completionListContains("f1");
verify.completionListContains("h1");
verify.not.completionListItemsCountIsGreaterThan(2);

goTo.marker("4");
verify.completionListContains("h1");
verify.not.completionListItemsCountIsGreaterThan(1);

goTo.marker("5");
verify.completionListContains("g1");
verify.not.completionListItemsCountIsGreaterThan(1);