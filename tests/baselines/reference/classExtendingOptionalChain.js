//// [classExtendingOptionalChain.ts]
namespace A {
    export class B {}
}

// ok
class C1 extends A?.B {}

// error
class C2 implements A?.B {}


//// [classExtendingOptionalChain.js]
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
var A;
(function (A) {
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    A.B = B;
})(A || (A = {}));
// ok
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C1;
}((A === null || A === void 0 ? void 0 : A.B)));
// error
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
