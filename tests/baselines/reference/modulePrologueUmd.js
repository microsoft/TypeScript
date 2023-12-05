//// [tests/cases/compiler/modulePrologueUmd.ts] ////

//// [modulePrologueUmd.ts]
"use strict";

export class Foo {}

//// [modulePrologueUmd.js]
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
    exports.Foo = void 0;
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    exports.Foo = Foo;
});
