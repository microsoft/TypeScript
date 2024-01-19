/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: types.js
//// /**
////  * @typedef {Object} Pet
////  * @prop {string} name
////  */
//// module.exports = { a: 1 };

// @Filename: app.js
//// import { /**/ } from "./types"

verify.completions({ marker: "", excludes: "Pet" });
