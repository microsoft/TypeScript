//// [tests/cases/conformance/es6/modules/multipleDefaultExports05.ts] ////

//// [multipleDefaultExports05.ts]
export default class AA1 {}

export default class BB1 {}

export default class CC1 {}


//// [multipleDefaultExports05.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AA1 = /** @class */ (function () {
    function AA1() {
    }
    return AA1;
}());
exports.default = AA1;
var BB1 = /** @class */ (function () {
    function BB1() {
    }
    return BB1;
}());
exports.default = BB1;
var CC1 = /** @class */ (function () {
    function CC1() {
    }
    return CC1;
}());
exports.default = CC1;
