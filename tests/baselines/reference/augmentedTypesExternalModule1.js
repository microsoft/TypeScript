//// [augmentedTypesExternalModule1.ts]
export var a = 1;
class c5 { public foo() { } }
module c5 { } // should be ok everywhere

//// [augmentedTypesExternalModule1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 1;
    var c5 = /** @class */ (function () {
        function c5() {
        }
        c5.prototype.foo = function () { };
        return c5;
    }());
});
