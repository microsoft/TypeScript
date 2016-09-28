/// <reference path='fourslash.ts' />

// Exercises completions for hidden files (ie: those beginning with '.')

// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.ts
//// /*f2*/
// @Filename: .hidden.ts
//// /*hidden*/

// @Filename: test.ts
//// /// <reference path="/*0*/
//// /// <reference path="./*1*/
//// /// <reference path=".//*2*/
//// /// <reference path=".\/*3*/

for(let m of ["0", "2", "3"]) {
    goTo.marker(m);
    verify.completionListContains("f1.ts");
    verify.completionListContains("f2.ts");
    verify.completionListContains(".hidden.ts");
    verify.not.completionListItemsCountIsGreaterThan(3);
}

goTo.marker("1");
verify.completionListContains(".hidden.ts");
verify.not.completionListItemsCountIsGreaterThan(1);