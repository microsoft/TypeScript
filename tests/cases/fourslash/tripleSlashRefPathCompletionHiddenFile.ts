/// <reference path='fourslash.ts' />

// Exercises completions for hidden files (ie: those beginning with '.')

// @Filename: f.ts
//// /*f*/
// @Filename: .hidden.ts
//// /*hidden*/

// @Filename: test.ts
//// /// <reference path="/*0*/
//// /// <reference path="[|./*1*/|]
//// /// <reference path=".//*2*/
//// /// <reference path=".\/*3*/

verify.completions(
    { marker: ["0", "2", "3"], exact: "f.ts", isNewIdentifierLocation: true },
    { marker: "1", exact: { name: "f.ts", replacementSpan: test.ranges()[0] }, isNewIdentifierLocation: true },
);
