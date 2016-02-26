/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: mod.js
//// function foo() { return {a: "hello, world"}; }
//// module.exports = foo();

// @Filename: app.js
//// import {a} from "./mod"
//// a./**/

goTo.marker();
verify.completionListContains('toString');
