//// [tests/cases/compiler/constEnumMergingWithValues1.ts] ////

//// [m1.ts]
function foo() {}
namespace foo {
    const enum E { X }
}

export = foo

//// [m1.js]
"use strict";
function foo() { }
module.exports = foo;
