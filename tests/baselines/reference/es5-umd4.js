//// [es5-umd4.ts]
class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

export = A;


//// [es5-umd4.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var A = /** @class */ (function () {
        function A() {
        }
        A.prototype.B = function () {
            return 42;
        };
        return A;
    }());
    return A;
});
