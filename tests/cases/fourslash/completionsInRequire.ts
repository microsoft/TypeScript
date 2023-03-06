/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: foo.js
////var foo = require("/**/"
////
////foo();
////
/////**
//// * @return {void}
//// */
////function foo() {
////}

// @Filename: package.json
//// { "dependencies": { "fake-module": "latest" } }

// @Filename: node_modules/fake-module/index.js
/////* fake-module */

verify.completions({
    marker: "",
    exact: ["fake-module"],
    isNewIdentifierLocation: true
})
