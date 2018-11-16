/// <reference path='fourslash.ts'/>
// @allowJs: true
// @module: system

// @Filename: mod.js
//// function foo() { return {a: true}; }
//// module.exports = foo();

// @Filename: app.js
//// import mod from "./mod"
//// mod./**/

verify.completions({ marker: "", exact: [{ name: "a", kind: "property" }, { name: "mod", kind: "warning" }] });
