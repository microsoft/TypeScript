/// <reference path='fourslash.ts' />

// Should give completions for ts and js files when allowJs is true.

// @allowJs: true

// @Filename: test0.ts
//// import * as foo1 from ".//*import_as0*/
//// import * as foo2 from "./f/*import_as1*/

//// import foo3 = require(".//*import_equals0*/
//// import foo4 = require("./f/*import_equals1*/

//// var foo5 = require(".//*require0*/
//// var foo6 = require("./f/*require1*/

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
// @Filename: g1.ts
////
// @Filename: g2.js
////

verify.completions({
    marker: test.markers(),
    exact: ["f1", "f2", "f3", "f4", "f5", "f6", "g1", "g2"],
    isNewIdentifierLocation: true,
});
