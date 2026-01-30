//// [tests/cases/conformance/es7/trailingCommasInGetter.ts] ////

//// [trailingCommasInGetter.ts]
class X {
    get x(,) { return 0; }
}


//// [trailingCommasInGetter.js]
"use strict";
var X = /** @class */ (function () {
    function X() {
    }
    Object.defineProperty(X.prototype, "x", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    return X;
}());
