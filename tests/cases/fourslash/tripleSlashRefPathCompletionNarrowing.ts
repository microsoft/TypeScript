/// <reference path='fourslash.ts' />

// Exercises relative path completions going up and down 2 directories
// and the use of forward- and back-slashes and combinations thereof.

// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.ts
//// /*f2*/
// @Filename: d/g.ts
//// /*g*/

// @Filename: test.ts
//// /// <reference path="f/*0*/
//// /// <reference path="./f/*1*/

//// /// <reference path="f1/*2*/
//// /// <reference path="f1./*3*/
//// /// <reference path="f1.t/*4*/
//// /// <reference path="f1.ts/*5*/
//// /// <reference path="./f1/*6*/
//// /// <reference path="./f1./*7*/
//// /// <reference path="./f1.t/*8*/
//// /// <reference path="./f1.ts/*9*/

for (let m of ["0", "1"]) {
    goTo.marker(m);
    verify.completionListContains("f1.ts");
    verify.completionListContains("f2.ts");
    verify.not.completionListItemsCountIsGreaterThan(2);
}

for (let m = 2; m < 10; ++m) {
    goTo.marker("" + m);
    verify.completionListContains("f1.ts");
    verify.not.completionListItemsCountIsGreaterThan(1);
}