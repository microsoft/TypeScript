//// [tests/cases/compiler/es6-umd2.ts] ////

//// [es6-umd2.ts]
export class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

//// [es6-umd2.js]
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    class A {
        constructor() {
        }
        B() {
            return 42;
        }
    }
    exports.A = A;
});
