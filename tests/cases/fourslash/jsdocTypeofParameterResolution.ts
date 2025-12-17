/// <reference path="fourslash.ts" />

/////**
//// * @template T
//// * @param {T} /*1*/a
//// * @return {typeof /*2*/a}
//// */
////function f(a) {
////    return a;
////}
////
////let a = 123;
////
/////**
//// * @template T
//// * @param {T} /*3*/a
//// * @return {typeof /*4*/a}
//// */
////function g(a) {
////    return a;
////}

// Test that typeof a in JSDoc resolves to parameter consistently
verify.baselineFindAllReferences("1", "2", "3", "4");