/// <reference path="fourslash.ts" />

// @strict: true

////function f(x: { [K in "m"]: number; }) {
////    x./*1*/m;
////    x./*2*/m
////}

verify.baselineFindAllReferences('1', '2');
