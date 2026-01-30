//// [tests/cases/compiler/classIndexer.ts] ////

//// [classIndexer.ts]
class C123 {
    [s: string]: number;
    constructor() {
    }
}

//// [classIndexer.js]
"use strict";
var C123 = /** @class */ (function () {
    function C123() {
    }
    return C123;
}());
