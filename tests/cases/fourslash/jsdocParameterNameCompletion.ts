///<reference path="fourslash.ts" />

/////**
//// * @param /*0*/
//// */
////function f(foo, bar) {}

/////**
//// * @param foo
//// * @param /*1*/
//// */
////function g(foo, bar) {}

/////**
//// * @param can/*2*/
//// * @param cantaloupe
//// */
////function h(cat, canary, canoodle, cantaloupe, zebra) {}

/////**
//// * @param /*3*/ {string} /*4*/
//// */
////function i(foo, bar) {}

verify.completionsAt("0", ["foo", "bar"]);
verify.completionsAt("1", ["bar"]);
verify.completionsAt("2", ["canary", "canoodle"]);
verify.completionsAt("3", ["foo", "bar"]);
verify.completionsAt("4", ["foo", "bar"]);
