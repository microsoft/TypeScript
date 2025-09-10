//// [tests/cases/compiler/augmentedTypesExternalModule1.ts] ////

//// [augmentedTypesExternalModule1.ts]
export var a = 1;
class c5 { public foo() { } }
namespace c5 { } // should be ok everywhere

//// [augmentedTypesExternalModule1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 1;
    var c5 = /** @class */ (function () {
        function c5() {
        }
        c5.prototype.foo = function () { };
        return c5;
    }());
});
