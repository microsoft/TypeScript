///<reference path="fourslash.ts" />

////class E extends Error {}
////
/////**
//// * @throws {E}
//// */
////function f1() {}
////
/////**
//// * @throws {E} description
//// */
////function f2() {}
////
/////**
//// * @throws description
//// */
////function f3() {}

////f1/*1*/()
////f2/*2*/()
////f3/*3*/()

verify.noErrors()
verify.baselineQuickInfo();
