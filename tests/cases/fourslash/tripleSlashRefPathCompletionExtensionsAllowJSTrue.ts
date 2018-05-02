/// <reference path='fourslash.ts' />

// Should give completions for relative references to ts and js files when allowJs is true.

// @allowJs: true

// @Filename: test0.ts
//// /// <reference path="/*0*/
//// /// <reference path=".//*1*/
//// /// <reference path="./f/*2*/

// @Filename: f1.ts
////
// @Filename: f1.js
////
// @Filename: f1.d.ts
////
// @Filename: f1.tsx
////
// @Filename: f1.js
////
// @Filename: f1.jsx
////
// @Filename: f1.cs
////

verify.completions({ at: test.markerNames(), are: ["f1.d.ts", "f1.js", "f1.jsx", "f1.ts", "f1.tsx"], isNewIdentifierLocation: true });
