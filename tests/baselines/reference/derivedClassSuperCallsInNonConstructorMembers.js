//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/derivedClassSuperCallsInNonConstructorMembers.ts] ////

//// [derivedClassSuperCallsInNonConstructorMembers.ts]
// error to use super calls outside a constructor

class Base {
    x: string;
}

class Derived extends Base {
    a: super();
    b() {
        super();
    }
    get C() {
        super();
        return 1;
    }
    set C(v) {
        super();
    }

    static a: super();
    static b() {
        super();
    }
    static get C() {
        super();
        return 1;
    }
    static set C(v) {
        super();
    }
}

//// [derivedClassSuperCallsInNonConstructorMembers.js]
// error to use super calls outside a constructor
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
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ;
    Derived.prototype.b = function () {
        _this = _super.call(this) || this;
    };
    Object.defineProperty(Derived.prototype, "C", {
        get: function () {
            _this = _super.call(this) || this;
            return 1;
        },
        set: function (v) {
            _this = _super.call(this) || this;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Derived.b = function () {
        _this = _super.call(this) || this;
    };
    Object.defineProperty(Derived, "C", {
        get: function () {
            _this = _super.call(this) || this;
            return 1;
        },
        set: function (v) {
            _this = _super.call(this) || this;
        },
        enumerable: false,
        configurable: true
    });
    return Derived;
}(Base));
