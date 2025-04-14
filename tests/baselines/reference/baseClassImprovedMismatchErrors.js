//// [tests/cases/compiler/baseClassImprovedMismatchErrors.ts] ////

//// [baseClassImprovedMismatchErrors.ts]
class Base {
    n: Base | string;
    fn() {
        return 10;
    }
}
class Derived extends Base {
    n: Derived | string;
    fn() {
        return 10 as number | string;
    }
}
class DerivedInterface implements Base {
    n: DerivedInterface | string;
    fn() {
        return 10 as number | string;
    }
}

//// [baseClassImprovedMismatchErrors.js]
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
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.fn = function () {
        return 10;
    };
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.fn = function () {
        return 10;
    };
    return Derived;
}(Base));
var DerivedInterface = /** @class */ (function () {
    function DerivedInterface() {
    }
    DerivedInterface.prototype.fn = function () {
        return 10;
    };
    return DerivedInterface;
}());
