//// [tests/cases/compiler/noImplicitUseStrict_umd.ts] ////

//// [noImplicitUseStrict_umd.ts]
export var x = 0;

//// [noImplicitUseStrict_umd.js]
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
    exports.x = void 0;
    exports.x = 0;
});
