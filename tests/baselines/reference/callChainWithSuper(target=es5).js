//// [tests/cases/conformance/expressions/optionalChaining/callChain/callChainWithSuper.ts] ////

//// [callChainWithSuper.ts]
// GH#34952
class Base { method?() {} }
class Derived extends Base {
    method1() { return super.method?.(); }
    method2() { return super["method"]?.(); }
}

//// [callChainWithSuper.js]
"use strict";
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
// GH#34952
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.method = function () { };
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.method1 = function () { var _a; return (_a = _super.prototype.method) === null || _a === void 0 ? void 0 : _a.call(this); };
    Derived.prototype.method2 = function () { var _a; return (_a = _super.prototype["method"]) === null || _a === void 0 ? void 0 : _a.call(this); };
    return Derived;
}(Base));
