//// [superPropertyElementNoUnusedLexicalThisCapture.ts]
class A { x() {} }

class B extends A {
    constructor() {
        super();
    }
    foo() {
        return () => {
            super.x;
        }
    }
    bar() {
        return () => {
            super["x"];
        }
    }
}

//// [superPropertyElementNoUnusedLexicalThisCapture.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.x = function () { };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super.call(this) || this;
    }
    B.prototype.foo = function () {
        return function () {
            _super.prototype.x;
        };
    };
    B.prototype.bar = function () {
        return function () {
            _super.prototype["x"];
        };
    };
    return B;
}(A));
