/// <reference path='fourslash.ts' />

// Exercises whether completions are supplied, conditional on the caret position in the ref comment.

// @Filename: f.ts
//// /*f*/

// @Filename: test.ts
//// /// <reference path/*0*/=/*1*/"/*8*/
//// /// <reference path/*2*/=/*3*/"/*9*/"/*4*/ /*5*///*6*/>/*7*/

verify.completions(
    { marker: ["0", "1", "2", "3", "4", "5", "6", "7"], exact: undefined, isNewIdentifierLocation: true },
    { marker: ["8", "9"], exact: "f.ts", isNewIdentifierLocation: true },
);
