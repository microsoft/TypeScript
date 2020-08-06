/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: test.js
//// /// Adds one
//// /// @param {number} n - this is a long,
//// /// multiline comment
//// ///
//// /// @return {number}
//// function add1(/*2*/n) {
////     return n + 1
//// }
//// add1/*1*/(12)

verify.quickInfoAt('1', 'function add1(n: number): number', ' Adds one ')
verify.quickInfoAt('2', '(parameter) n: number', '- this is a long, multiline comment ')
