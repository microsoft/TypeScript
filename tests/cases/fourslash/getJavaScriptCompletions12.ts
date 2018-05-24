///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @param {number} input
//// * @param {string} currency
//// * @returns {number}
//// */
////var convert = function(input, currency) {
////    switch(currency./*1*/) {
////            case "USD":
////            input./*2*/;
////            case "EUR":
////                return "" + rateToUsd.EUR;
////            case "CNY":
////                return {} + rateToUsd.CNY;
////    }
////}
////convert(1, "")./*3*/
/////**
//// * @param {number} x
//// */
////var test1 = function(x) { return x./*4*/ }, test2 = function(a) { return a./*5*/ };

verify.completions(
    { marker: "1", includes: { name: "charCodeAt", kind: "method" }, isNewIdentifierLocation: true },
    { marker: ["2", "3", "4"], includes: { name: "toExponential", kind: "method" } },
    { marker: "5", includes: { name: "test1", kind: "warning" } },
);
