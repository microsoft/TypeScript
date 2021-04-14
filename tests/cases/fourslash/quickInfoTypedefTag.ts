/// <reference path='fourslash.ts' />
// @allowJs: true
// @Filename: a.js
//// /**
////  * The typedef tag should not appear in the quickinfo.
////  * @typedef {{ foo: 'foo' }} Foo
////  */
//// function f() { }
//// f/*1*/()
//// /**
////  * A sandwiched comment
////  * @tag comment 1
////  * @typedef {{ nope: any }} Nope not here
////  * @tag comment 2
////  */
//// function g() { }
//// g/*2*/()

verify.baselineQuickInfo()
