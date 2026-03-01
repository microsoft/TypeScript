/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: foo.js
/////*2*/module.exports = {};

// @Filename: bar.js
////var x = require([|/*1*/"./foo"|]);

verify.baselineGoToDefinition("1");
