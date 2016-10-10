/// <reference path='fourslash.ts' />

// Exercises relative path completions going up and down 2 directories
// and the use of forward- and back-slashes and combinations thereof.

// @Filename: f.ts
//// /*f1*/
// @Filename: d1/g.ts
//// /*g1*/
// @Filename: d1/d2/h.ts
//// /*h1*/
// @Filename: d1/d2/d3/i.ts
//// /*i1*/
// @Filename: d1/d2/d3/d4/j.ts
//// /*j1*/

// @Filename: d1/d2/test.ts
//// /// <reference path="/*0*/
//// /// <reference path=".//*1*/
//// /// <reference path="./*2*/
//// /// <reference path="../*3*/
//// /// <reference path="d3/*4*/

//// /// <reference path="..//*5*/
//// /// <reference path="..\/*6*/

//// /// <reference path="../..//*7*/

//// /// <reference path="d3//*8*/
//// /// <reference path="./d3//*9*/

//// /// <reference path="d3/d4//*10*/
//// /// <reference path="./d3/d4//*11*/

workingDirCompletions();
parentDirCompletions();
childDirCompletions();

function workingDirCompletions() {
    for (let m = 0; m < 5; ++m) {
        goTo.marker("" + m);
        verify.completionListContains("h.ts");
        verify.completionListContains("d3");
        verify.not.completionListItemsCountIsGreaterThan(2);
    }
}

function parentDirCompletions() {

    for (let m of ["5", "6"]) {
        goTo.marker(m);
        verify.completionListContains("g.ts");
        verify.completionListContains("d2");
        verify.not.completionListItemsCountIsGreaterThan(2);
    }

    goTo.marker("7");
    verify.completionListContains("f.ts");
    verify.completionListContains("d1");
    verify.not.completionListItemsCountIsGreaterThan(2);
}

function childDirCompletions() {

    for (let m of ["8", "9"]) {
        goTo.marker(m);
        verify.completionListContains("i.ts");
        verify.completionListContains("d4");
        verify.not.completionListItemsCountIsGreaterThan(2);
    }

    for (let m of ["10", "11"]) {
        goTo.marker(m);
        verify.completionListContains("j.ts");
        verify.not.completionListItemsCountIsGreaterThan(1);
    }
}