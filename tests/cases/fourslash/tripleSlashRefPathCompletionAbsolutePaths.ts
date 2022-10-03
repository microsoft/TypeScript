/// <reference path='fourslash.ts' />

// Exercises completions for absolute paths.

// @Filename: tests/test0.ts
//// /// <reference path="/tests/cases/f/*0*/

// @Filename: tests/test1.ts
//// /// <reference path="/tests/cases/fourslash/*1*/

// @Filename: tests/test2.ts
//// /// <reference path="/tests/cases/fourslash//*2*/

// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.tsx
//// /*f2*/
// @Filename: folder/f1.ts
//// /*subf1*/
// @Filename: f3.js
//// /*f3*/
// @Filename: f4.jsx
//// /*f4*/
// @Filename: e1.ts
//// /*e1*/
// @Filename: e2.js
//// /*e2*/

verify.completions(
    { marker: ["0", "1"], exact: "fourslash", isNewIdentifierLocation: true },
    { marker: "2", exact: ["e1.ts", "f1.ts", "f2.tsx", "folder", "tests"], isNewIdentifierLocation: true },
);
