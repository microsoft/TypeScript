/// <reference path='fourslash.ts' />

// Exercises completions for hidden files (ie: those beginning with '.')

// @Filename: f.ts
//// /*f*/
// @Filename: .hidden.ts
//// /*hidden*/

// @Filename: test.ts
//// /// <reference path="/*0*/
//// /// <reference path="./*1*/
//// /// <reference path=".//*2*/
//// /// <reference path=".\/*3*/

for(let m of ["0", "1", "2", "3"]) {
    goTo.marker(m);
    verify.completionListContains("f.ts");
    verify.not.completionListItemsCountIsGreaterThan(1);
}