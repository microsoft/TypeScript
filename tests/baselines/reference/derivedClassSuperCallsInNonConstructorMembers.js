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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a = _this = _super.call(this) || this;
        return _this;
    }
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
        enumerable: true,
        configurable: true
    });
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
        enumerable: true,
        configurable: true
    });
    Derived.a = _this = _super.call(this) || this;
    return Derived;
}(Base));
