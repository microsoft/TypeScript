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

}

//// [superPropertyAccessNoError.js]
//super.publicInstanceMemberFunction in constructor of derived class
//super.publicInstanceMemberFunction in instance member function of derived class
//super.publicInstanceMemberFunction in instance member accessor(get and set) of derived class
//super.publicInstanceMemberFunction in lambda in member function
//super.publicStaticMemberFunction in static member function of derived class
//super.publicStaticMemberFunction in static member accessor(get and set) of derived class
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SomeBaseClass = (function () {
    function SomeBaseClass() {
    }
    SomeBaseClass.prototype.func = function () {
        return '';
    };
    SomeBaseClass.func = function () {
        return 3;
    };
    return SomeBaseClass;
}());
var SomeDerivedClass = (function (_super) {
    __extends(SomeDerivedClass, _super);
    function SomeDerivedClass() {
        _super.call(this);
        var x = _super.prototype.func.call(this);
        var x;
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
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    return SomeDerivedClass;
}(SomeBaseClass));
