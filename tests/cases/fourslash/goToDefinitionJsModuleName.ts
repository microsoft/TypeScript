/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: foo.js
/////*2*/module.exports = {};

// @Filename: bar.js
////var x = require(/*1*/"./foo");

goTo.marker("1");
goTo.definition();
verify.caretAtMarker("2");