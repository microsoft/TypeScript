///<reference path="fourslash.ts" />
// @allowNonTsExtensions: true
// @checkJs: true
// @Filename: Foo.js
/////**
//// * @param {never | {x: string}} p1
//// * @param {undefined | {y: number}} p2
//// * @param {null | {z: boolean}} p3
//// * @returns {void} nothing
//// */
////function f(p1, p2, p3) {
////    p1./*1*/;
////    p2./*2*/;
////    p3./*3*/;
////}

verify.completions(
    { marker: "1", exact: "x" },
    { marker: "2", exact: "y" },
    { marker: "3", exact: "z" },
);
