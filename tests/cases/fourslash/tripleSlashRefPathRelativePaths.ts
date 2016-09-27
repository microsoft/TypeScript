/// <reference path='fourslash.ts' />

// Exercises relative path completions going up and down 2 directories
// and the use of forward- and back-slashes and combinations thereof.

// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.ts
//// /*f2*/
// @Filename: dir1/g1.ts
//// /*g1*/
// @Filename: dir1/g2.ts
//// /*g2*/
// @Filename: dir1/dir2/h1.ts
//// /*h1*/
// @Filename: dir1/dir2/h2.ts
//// /*h2*/
// @Filename: dir1/dir2/.hidden.ts
//// /*hidden*/
// @Filename: dir1/dir2/dir3/i1.ts
//// /*i1*/
// @Filename: dir1/dir2/dir3/i2.ts
//// /*i2*/
// @Filename: dir1/dir2/dir3/dir4/j1.ts
//// /*j1*/
// @Filename: dir1/dir2/dir3/dir4/j2.ts
//// /*j2*/


// @Filename: dir1/dir2/test.ts
//// /// <reference path="/*0*/
//// /// <reference path="./*1*/
//// /// <reference path="../*2*/

//// /// <reference path="..//*3*/
//// /// <reference path="..\/*4*/
//// /// <reference path="../..//*5*/
//// /// <reference path="../..\/*6*/
//// /// <reference path="..\..//*7*/
//// /// <reference path="..\..\/*8*/

//// /// <reference path=".//*9*/
//// /// <reference path=".\/*10*/
//// /// <reference path="./h/*11*/
//// /// <reference path=".\h/*12*/
//// /// <reference path="./h1/*13*/
//// /// <reference path=".\h1/*14*/
//// /// <reference path="./h1./*15*/
//// /// <reference path=".\h1./*16*/
//// /// <reference path="./h1.t/*17*/
//// /// <reference path=".\h1.t/*18*/

//// /// <reference path="dir3/*19*/
//// /// <reference path="dir3//*20*/
//// /// <reference path="dir3\/*21*/
//// /// <reference path="./dir3//*22*/
//// /// <reference path=".\dir3\/*23*/
//// /// <reference path="dir3/dir4//*24*/
//// /// <reference path="dir3\dir4\/*25*/
//// /// <reference path="./dir3/dir4//*26*/
//// /// <reference path=".\dir3\dir4\/*27*/

function workingDirCompletions() {
    for (let m of ["0", "9", "10"]) {
        goTo.marker(m);
        verify.completionListContains("h1.ts");
        verify.completionListContains("h2.ts");
        verify.completionListContains(".hidden.ts");
        verify.completionListContains("dir3");
        verify.not.completionListItemsCountIsGreaterThan(4);
    }

    goTo.marker("1");
    verify.completionListContains(".hidden.ts");
    verify.not.completionListItemsCountIsGreaterThan(1);

    goTo.marker("2");
    verify.not.completionListItemsCountIsGreaterThan(0);

    for (let m of ["11", "12"]) {
        goTo.marker(m);
        verify.completionListContains("h1.ts");
        verify.completionListContains("h2.ts");
        verify.not.completionListItemsCountIsGreaterThan(2);
    }

    for (let m of ["13", "14", "15", "16", "17", "18"]) {
        goTo.marker(m);
        verify.completionListContains("h1.ts");
        verify.not.completionListItemsCountIsGreaterThan(1);
    }

    goTo.marker("19");
    verify.completionListContains("dir3");
    verify.not.completionListItemsCountIsGreaterThan(1);

}

function parentDirCompletions() {

    for (let m of ["3", "4"]) {
        goTo.marker(m);
        verify.completionListContains("g1.ts");
        verify.completionListContains("g2.ts");
        verify.completionListContains("dir2");
        verify.not.completionListItemsCountIsGreaterThan(3);
    }

    for (let m of ["5", "6", "7", "8"]) {
        goTo.marker(m);
        verify.completionListContains("f1.ts");
        verify.completionListContains("f2.ts");
        verify.completionListContains("dir1");
        verify.not.completionListItemsCountIsGreaterThan(3);
    }
}

function childDirCompletions() {
    for (let m of ["20", "21", "22", "23"]) {
        goTo.marker(m);
        verify.completionListContains("i1.ts");
        verify.completionListContains("i2.ts");
        verify.completionListContains("dir4");
        verify.not.completionListItemsCountIsGreaterThan(3);
    }

     for (let m of ["24", "25", "26", "27"]) {
        goTo.marker(m);
        verify.completionListContains("j1.ts");
        verify.completionListContains("j2.ts");
        verify.not.completionListItemsCountIsGreaterThan(2);
    }
}

workingDirCompletions();
parentDirCompletions();
childDirCompletions();