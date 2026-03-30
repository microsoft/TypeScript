/// <reference path="fourslash.ts" />

// Regression test for GH#45436

// @allowNonTsExtensions: true
// @Filename: file.js
//// const abc = {};
//// ({./*1*/});

goTo.marker('1');
edit.insert('.');
verify.completions({ exact: undefined });
