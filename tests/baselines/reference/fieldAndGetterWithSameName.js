//// [fieldAndGetterWithSameName.ts]
export class C {
    x: number;
  get x(): number { return 1; }
}

//// [fieldAndGetterWithSameName.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.C = void 0;
    var C = /** @class */ (function () {
        function C() {
        }
        Object.defineProperty(C.prototype, "x", {
            get: function () { return 1; },
            enumerable: false,
            configurable: true
        });
        return C;
    }());
    exports.C = C;
});
