//// [tests/cases/compiler/staticGetter1.ts] ////

//// [staticGetter1.ts]
// once caused stack overflow
class C {
    static get x() {
        return this;
    }
}


//// [staticGetter1.js]
"use strict";
// once caused stack overflow
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C, "x", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
