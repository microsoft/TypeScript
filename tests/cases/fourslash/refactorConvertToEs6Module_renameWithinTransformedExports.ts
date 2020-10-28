/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @target: esnext

// @Filename: test.js
//// var Q = require("q");
//// 
//// module.exports = {
////     fn: function () {
////         var deferred = Q.defer();
////     },
////     method() {
////         Q.defer();
////     },
////     Klass: class {
////         prop = Q.defer();
////         method() {
////             Q.defer();
////         }
////     }
//// }

verify.codeFix({
  index: 2,
  description: "Convert to ES6 module",
  newFileContent:
`import { defer } from "q";

export function fn() {
    var deferred = defer();
}
export function method() {
    defer();
}
export class Klass {
    prop = defer();
    method() {
        defer();
    }
}`,
});
