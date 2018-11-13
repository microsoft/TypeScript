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
//// /// <reference path="[|./*2*/|]
//// /// <reference path="[|../*3*/|]
//// /// <reference path="d3/*4*/

//// /// <reference path="..//*5*/
//// /// <reference path="..\/*6*/

//// /// <reference path="../..//*7*/

//// /// <reference path="d3//*8*/
//// /// <reference path="./d3//*9*/

//// /// <reference path="d3/d4//*10*/
//// /// <reference path="./d3/d4//*11*/

verify.completions(
    // working dir completions
    { marker: ["0", "1", "4"], exact: ["h.ts", "d3"], isNewIdentifierLocation: true },
    { marker: "2", exact: ["h.ts", "d3"].map(name => ({ name, replacementSpan: test.ranges()[0] })), isNewIdentifierLocation: true },
    { marker: "3", exact: ["h.ts", "d3"].map(name => ({ name, replacementSpan: test.ranges()[1] })), isNewIdentifierLocation: true },

    // parent dir completions
    { marker: ["5", "6"], exact: ["g.ts", "d2"], isNewIdentifierLocation: true },
    { marker: "7", exact: ["f.ts", "d1"], isNewIdentifierLocation: true },

    // child dir completions
    { marker: ["8", "9"], exact: ["i.ts", "d4"], isNewIdentifierLocation: true },
    { marker: ["10", "11"], exact: "j.ts", isNewIdentifierLocation: true },
);
