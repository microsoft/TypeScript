//// [fieldAndGetterWithSameName.ts]
export class C {
    x: number;
  get x(): number { return 1; }
}

//// [fieldAndGetterWithSameName.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var C = (function () {
        function C() {
        }
        Object.defineProperty(C.prototype, "x", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        return C;
    }());
    exports.C = C;
});
