//// [tests/cases/compiler/umdNamedAmdMode.ts] ////

//// [main.ts]
/// <amd-module name="a"/>
export const a = 1;

//// [main.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("a", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    /// <amd-module name="a"/>
    exports.a = 1;
});
