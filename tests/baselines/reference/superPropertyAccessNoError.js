//// [tests/cases/conformance/expressions/superPropertyAccess/superPropertyAccessNoError.ts] ////

//// [superPropertyAccessNoError.ts]
//super.publicInstanceMemberFunction in constructor of derived class
//super.publicInstanceMemberFunction in instance member function of derived class
//super.publicInstanceMemberFunction in instance member accessor(get and set) of derived class
//super.publicInstanceMemberFunction in lambda in member function
//super.publicStaticMemberFunction in static member function of derived class
//super.publicStaticMemberFunction in static member accessor(get and set) of derived class


class SomeBaseClass {
    public func() {
        return '';
    }

    static func() {
        return 3;
    }

    returnThis() {
        return this;
    }
}

class SomeDerivedClass extends SomeBaseClass {
    constructor() {
        super();
        var x = super.func();
        var x: string;
    }

    fn() {
        var x = super.func();
        var x: string;
        var y = () => super.func();
    }

    get a() {
        var x = super.func();
        var x: string;
        return null;
    }

    set a(n) {
        var x = super.func();
        var x: string;
    }

    static fn() {
        var x = super.func();
        var x: number;
    }

    static get a() {
        var x = super.func();
        var x: number;
        return null;
    }

    static set a(n) {
        var x = super.func();
        var x: number;
    }

    returnThis() {
        return super.returnThis();
    }
}

let instance = new SomeDerivedClass();
instance.returnThis().fn();


//// [superPropertyAccessNoError.js]
//super.publicInstanceMemberFunction in constructor of derived class
//super.publicInstanceMemberFunction in instance member function of derived class
//super.publicInstanceMemberFunction in instance member accessor(get and set) of derived class
//super.publicInstanceMemberFunction in lambda in member function
//super.publicStaticMemberFunction in static member function of derived class
//super.publicStaticMemberFunction in static member accessor(get and set) of derived class
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
var SomeBaseClass = /** @class */ (function () {
    function SomeBaseClass() {
    }
    SomeBaseClass.prototype.func = function () {
        return '';
    };
    SomeBaseClass.func = function () {
        return 3;
    };
    SomeBaseClass.prototype.returnThis = function () {
        return this;
    };
    return SomeBaseClass;
}());
var SomeDerivedClass = /** @class */ (function (_super) {
    __extends(SomeDerivedClass, _super);
    function SomeDerivedClass() {
        var _this = _super.call(this) || this;
        var x = _super.prototype.func.call(_this);
        var x;
        return _this;
    }
    SomeDerivedClass.prototype.fn = function () {
        var _this = this;
        var x = _super.prototype.func.call(this);
        var x;
        var y = function () { return _super.prototype.func.call(_this); };
    };
    Object.defineProperty(SomeDerivedClass.prototype, "a", {
        get: function () {
            var x = _super.prototype.func.call(this);
            var x;
            return null;
        },
        set: function (n) {
            var x = _super.prototype.func.call(this);
            var x;
        },
        enumerable: false,
        configurable: true
    });
    SomeDerivedClass.fn = function () {
        var x = _super.func.call(this);
        var x;
    };
    Object.defineProperty(SomeDerivedClass, "a", {
        get: function () {
            var x = _super.func.call(this);
            var x;
            return null;
        },
        set: function (n) {
            var x = _super.func.call(this);
            var x;
        },
        enumerable: false,
        configurable: true
    });
    SomeDerivedClass.prototype.returnThis = function () {
        return _super.prototype.returnThis.call(this);
    };
    return SomeDerivedClass;
}(SomeBaseClass));
var instance = new SomeDerivedClass();
instance.returnThis().fn();
