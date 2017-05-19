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


goTo.marker("1");
verify.completionListContains("charCodeAt", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
goTo.marker("2");
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
goTo.marker("3");
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
goTo.marker("4");
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
goTo.marker("5");
verify.completionListContains("test1", /*displayText:*/ undefined, /*documentation*/ undefined, "warning");