/// <reference path='fourslash.ts' />

// Should give completions for absolute paths

// @Filename: tests/test0.ts
//// import * as foo1 from "/tests/cases/f/*import_as0*/
//// import * as foo2 from "/tests/cases/fourslash/*import_as1*/
//// import * as foo3 from "/tests/cases/fourslash//*import_as2*/

//// import foo4 = require("/tests/cases/f/*import_equals0*/
//// import foo5 = require("/tests/cases/fourslash/*import_equals1*/
//// import foo6 = require("/tests/cases/fourslash//*import_equals2*/

//// var foo7 = require("/tests/cases/f/*require0*/
//// var foo8 = require("/tests/cases/fourslash/*require1*/
//// var foo9 = require("/tests/cases/fourslash//*require2*/

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

const kinds = ["import_as", "import_equals", "require"];
verify.completions(
    {
        at: [...kinds.map(k => `${k}0`), ...kinds.map(k => `${k}1`)],
        are: "fourslash",
        isNewIdentifierLocation: true,
    },
    {
        at: kinds.map(k => `${k}2`),
        are: ["e1", "f1", "f2", "tests", "folder"],
        isNewIdentifierLocation: true,
    });
