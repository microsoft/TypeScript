//// [tests/cases/compiler/fieldAndGetterWithSameName.ts] ////

//// [fieldAndGetterWithSameName.ts]
export class C {
    x: number;
  get x(): number { return 1; }
}

//// [fieldAndGetterWithSameName.js]
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C = void 0;
    class C {
        get x() { return 1; }
    }
    exports.C = C;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
