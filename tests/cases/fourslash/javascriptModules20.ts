/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: mod.js
//// function foo() { return {a: true}; }
//// module.exports = foo();

// @Filename: app.js
//// import * as mod from "./mod"
//// mod./**/

verify.completions({ marker: "", exact: [{ name: "a", kind: "property" }, { name: "mod", kind: "warning" }] });
