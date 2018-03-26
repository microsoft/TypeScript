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

// working dir completions
verify.completionsAt(["0", "1", "4"], ["h.ts", "d3"], { isNewIdentifierLocation: true });
verify.completionsAt("2", ["h.ts", "d3"].map(name => ({ name, replacementSpan: test.ranges()[0] })), { isNewIdentifierLocation: true });
verify.completionsAt("3", ["h.ts", "d3"].map(name => ({ name, replacementSpan: test.ranges()[1] })), { isNewIdentifierLocation: true });

// parent dir completions
verify.completionsAt(["5", "6"], ["g.ts", "d2"], { isNewIdentifierLocation: true });
verify.completionsAt("7", ["f.ts", "d1"], { isNewIdentifierLocation: true });

// child dir completions
verify.completionsAt(["8", "9"], ["i.ts", "d4"], { isNewIdentifierLocation: true });
verify.completionsAt(["10", "11"], ["j.ts"], { isNewIdentifierLocation: true });
