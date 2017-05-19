/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: mod.js
//// function foo() { return {a: true}; }
//// module.exports.a = foo;

// @Filename: app.js
//// import * as mod from "./mod"
//// mod./**/

goTo.marker();
verify.completionListContains('a');
