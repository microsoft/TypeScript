/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: types.js
//// /**
////  * @typedef {Object} Pet
////  * @prop {string} name
////  */
//// module.exports = { a: 1 };

// @Filename: app.js
//// /**
////  * @param { import("./types")./**/ } p
////  */
//// function walk(p) {
////  console.log(`Walking ${p.name}...`);
//// }

verify.completions({ marker: "", includes: "Pet" });
