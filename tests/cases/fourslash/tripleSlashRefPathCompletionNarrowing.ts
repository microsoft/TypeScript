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

//// /// <reference path="./d/*2*/

//// /// <reference path="f1/*3*/
//// /// <reference path="f1./*4*/
//// /// <reference path="f1.t/*5*/
//// /// <reference path="f1.ts/*6*/
//// /// <reference path="./f1/*7*/
//// /// <reference path="./f1./*8*/
//// /// <reference path="./f1.t/*9*/
//// /// <reference path="./f1.ts/*10*/

for (let m of ["0", "1"]) {
    goTo.marker(m);
    verify.completionListContains("f1.ts");
    verify.completionListContains("f2.ts");
    verify.not.completionListItemsCountIsGreaterThan(2);
}

goTo.marker("2");
verify.completionListContains("d");
verify.not.completionListItemsCountIsGreaterThan(1);



for (let m = 3; m < 11; ++m) {
    goTo.marker("" + m);
    verify.completionListContains("f1.ts");
    verify.not.completionListItemsCountIsGreaterThan(1);
}