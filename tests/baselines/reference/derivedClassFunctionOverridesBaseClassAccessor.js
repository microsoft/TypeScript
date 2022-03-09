//// [derivedClassFunctionOverridesBaseClassAccessor.ts]
class Base {
    get x() {
        return 1;
    }
    set x(v) {
    }
}

// error
class Derived extends Base {
    x() {
        return 1;
    }
}

//// [derivedClassFunctionOverridesBaseClassAccessor.js]
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
    Object.defineProperty(Base.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return Base;
}());
// error
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.x = function () {
        return 1;
    };
    return Derived;
}(Base));
