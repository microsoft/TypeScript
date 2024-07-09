///<reference path="fourslash.ts" />
// @allowNonTsExtensions: true
// @Filename: Foo.js

/////**
//// * @param {T[]} arr
//// * @param {(function(T):T)} valuator
//// * @template T
//// */
////function SortFilter(arr,valuator)
////{
////    return arr;
////}
////var a/*1*/ = SortFilter([0, 1, 2], q/*2*/ => q);
////var b/*3*/ = SortFilter([0, 1, 2], undefined);

verify.quickInfoAt('1', "var a: number[]");
verify.quickInfoAt('2', '(parameter) q: number');
verify.quickInfoAt('3', "var b: number[]");
