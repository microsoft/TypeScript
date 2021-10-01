/// <reference path="fourslash.ts" />

// @allowJs: true
// @noEmit: true
// @checkJs: true

// @Filename: foo.js
//// module.exports = {
////     foo: '1'
//// };

// @Filename: bar.js
//// const { /*1*/foo: bar } = require('./foo');

verify.baselineFindAllReferences("1");