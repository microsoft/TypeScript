/// <reference path='fourslash.ts' />

// Exercises whether completions are supplied, conditional on the caret position in the ref comment.

// @Filename: f.ts
//// /*f*/

// @Filename: test.ts
//// /// <reference path/*0*/=/*1*/"/*8*/
//// /// <reference path/*2*/=/*3*/"/*9*/"/*4*/ /*5*///*6*/>/*7*/

for(let m = 0; m < 8; ++m) {
    goTo.marker("" + m);
    verify.not.completionListItemsCountIsGreaterThan(0);
}

for(let m of ["8", "9"]) {
    goTo.marker(m);
    verify.completionListContains("f.ts");
    verify.not.completionListItemsCountIsGreaterThan(1);
}