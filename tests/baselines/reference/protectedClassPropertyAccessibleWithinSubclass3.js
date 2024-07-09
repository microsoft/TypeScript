//// [tests/cases/conformance/classes/members/accessibility/protectedClassPropertyAccessibleWithinSubclass3.ts] ////

//// [protectedClassPropertyAccessibleWithinSubclass3.ts]
class Base {
    protected x: string;
    method() {
        this.x;            // OK, accessed within their declaring class
    }
}

class Derived extends Base {
    method1() {
        this.x;            // OK, accessed within a subclass of the declaring class
        super.x;           // Error, x is not public
    }
}

//// [protectedClassPropertyAccessibleWithinSubclass3.js]
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
    Base.prototype.method = function () {
        this.x; // OK, accessed within their declaring class
    };
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.method1 = function () {
        this.x; // OK, accessed within a subclass of the declaring class
        _super.prototype.x; // Error, x is not public
    };
    return Derived;
}(Base));
