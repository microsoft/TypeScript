//// [tests/cases/conformance/es6/modules/multipleDefaultExports03.ts] ////

//// [multipleDefaultExports03.ts]
export default class C {
}

export default class C {
}

//// [multipleDefaultExports03.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.default = C;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.default = C;
