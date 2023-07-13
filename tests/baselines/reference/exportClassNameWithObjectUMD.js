//// [tests/cases/conformance/externalModules/exportClassNameWithObjectUMD.ts] ////

//// [exportClassNameWithObjectUMD.ts]
export class Object {}


//// [exportClassNameWithObjectUMD.js]
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
    exports.Object = void 0;
    var Object = /** @class */ (function () {
        function Object() {
        }
        return Object;
    }());
    exports.Object = Object;
});
