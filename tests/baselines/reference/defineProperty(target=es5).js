//// [tests/cases/conformance/classes/propertyMemberDeclarations/defineProperty.ts] ////

//// [defineProperty.ts]
var x: "p" = "p"
class A {
    a = this.y
    b
    public c;
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    z = this.y
    declare notEmitted;
}
class B {
    public a;
}
class C extends B {
    declare public a;
    z = this.ka
    constructor(public ka: number) {
        super()
    }
    ki = this.ka
}


//// [defineProperty.js]
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
var _a;
var x = "p";
var A = /** @class */ (function () {
    function A(y) {
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: y
        });
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.y
        });
        Object.defineProperty(this, "b", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "c", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "computed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 13
        });
        Object.defineProperty(this, _a, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 14
        });
        Object.defineProperty(this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.y
        });
    }
    Object.defineProperty(A.prototype, "m", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    });
    return A;
}());
_a = x;
var B = /** @class */ (function () {
    function B() {
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    return B;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(ka) {
        var _this = _super.call(this) || this;
        Object.defineProperty(_this, "ka", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ka
        });
        Object.defineProperty(_this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _this.ka
        });
        Object.defineProperty(_this, "ki", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _this.ka
        });
        return _this;
    }
    return C;
}(B));
