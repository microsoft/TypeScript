/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param {Object} options
//// * @param {string} options.foo
//// * @param {number} options.bar
//// */
////function foo(/**/options) {}

goTo.file("/a.js");
verify.baselineRename("", { });
