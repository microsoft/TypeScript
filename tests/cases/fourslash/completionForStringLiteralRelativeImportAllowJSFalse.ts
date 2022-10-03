/// <reference path='fourslash.ts' />

// Should give completions for ts files only when allowJs is false.

// @Filename: test0.ts
//// import * as foo1 from "./*import_as0*/
//// import * as foo2 from ".//*import_as1*/
//// import * as foo4 from "./d1//*import_as2*/

//// import foo6 = require("./*import_equals0*/
//// import foo7 = require(".//*import_equals1*/
//// import foo9 = require("./d1//*import_equals2*/

//// var foo11 = require("./*require0*/
//// var foo12 = require(".//*require1*/
//// var foo14 = require("./d1//*require2*/

// @Filename: d2/d3/test1.ts
//// import * as foo16 from "..//*import_as3*/
//// import foo17 = require("..//*import_equals3*/
//// var foo18 = require("..//*require3*/


// @Filename: f1.ts
////
// @Filename: f2.js
////
// @Filename: f3.d.ts
////
// @Filename: f4.tsx
////
// @Filename: f5.js
////
// @Filename: f6.jsx
////
// @Filename: f7.ts
////
// @Filename: d1/f8.ts
////
// @Filename: d1/f9.ts
////
// @Filename: d2/f10.ts
////
// @Filename: d2/f11.ts
////

const kinds = ["import_as", "import_equals", "require"];
verify.completions(
    { marker: kinds.map(k => k + "0"), exact: [], isNewIdentifierLocation: true },
    { marker: kinds.map(k => k + "1"), exact: ["f1", "f3", "f4", "f7", "d1", "d2"], isNewIdentifierLocation: true },
    { marker: kinds.map(k => k + "2"), exact: ["f8", "f9"], isNewIdentifierLocation: true },
    { marker: kinds.map(k => k + "3"), exact: ["f10", "f11", "d3"], isNewIdentifierLocation: true },
);
