//// [tests/cases/compiler/typeValueConflict2.ts] ////

//// [typeValueConflict2.ts]
module M1 {
    export class A<T> {
        constructor(a: T) {
        }
    }
}
module M2 {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    class B extends M1.A<string> {
    }
}
module M3 {
    // Shouldn't error
    class B extends M1.A<string> {
    }
}


//// [typeValueConflict2.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var M1;
(function (M1) {
    var A = /** @class */ (function () {
        function A(a) {
        }
        return A;
    }());
    M1.A = A;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(M1.A));
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    // Shouldn't error
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(M1.A));
})(M3 || (M3 = {}));
