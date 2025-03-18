//// [tests/cases/compiler/constEnumMergingWithValues2.ts] ////

//// [m1.ts]
class foo {}
module foo {
    const enum E { X }
}

export = foo

//// [m1.js]
"use strict";
class foo {
}
module.exports = foo;
