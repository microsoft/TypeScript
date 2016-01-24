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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
        this.a = _super.call(this);
    }
    Derived.prototype.b = function () {
        _super.call(this);
    };
    Object.defineProperty(Derived.prototype, "C", {
        get: function () {
            _super.call(this);
            return 1;
        },
        set: function (v) {
            _super.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Derived.b = function () {
        _super.call(this);
    };
    Object.defineProperty(Derived, "C", {
        get: function () {
            _super.call(this);
            return 1;
        },
        set: function (v) {
            _super.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Derived.a = _super.call(this);
    return Derived;
}(Base));
