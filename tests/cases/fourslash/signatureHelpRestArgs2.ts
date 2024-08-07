/// <reference path="fourslash.ts" />

// @strict: true
// @allowJs: true
// @checkJs: true

// @filename: index.js

//// const promisify = function (thisArg, fnName) {
////     const fn = thisArg[fnName];
////     return function () {
////         return new Promise((resolve) => {
////             fn.call(thisArg, ...arguments, /*1*/);
////         });
////     };
//// };

verify.baselineSignatureHelp();
