//// [tests/cases/conformance/expressions/superPropertyAccess/errorSuperPropertyAccess.ts] ////

//// [errorSuperPropertyAccess.ts]
//super property access in constructor of class with no base type
//super property access in instance member function of class with no base type
//super property access in instance member accessor(get and set) of class with no base type
class NoBase {
    constructor() {
        var a = super.prototype;
        var b = super.hasOwnProperty('');
    }

    fn() {
        var a = super.prototype;
        var b = super.hasOwnProperty('');
    }

    m = super.prototype;
    n = super.hasOwnProperty('');

    //super static property access in static member function of class with no base type
    //super static property access in static member accessor(get and set) of class with no base type
    public static static1() {
        super.hasOwnProperty('');
    }

    public static get static2() {
        super.hasOwnProperty('');
        return '';
    }

    public static set static2(n) {
        super.hasOwnProperty('');
    }
}

class SomeBase {
    private privateFunc() { }
    private privateMember = 0;

    public publicFunc() { }
    public publicMember = 0;

    private static privateStaticFunc() { }
    private static privateStaticMember = 0;

    public static publicStaticFunc() { }
    public static publicStaticMember = 0;

}


//super.publicInstanceMemberNotFunction in constructor of derived class
//super.publicInstanceMemberNotFunction in instance member function of derived class
//super.publicInstanceMemberNotFunction in instance member accessor(get and set) of derived class
//super property access only available with typed this
class SomeDerived1 extends SomeBase {
    constructor() {
        super();
        super.publicMember = 1;
    }

    fn() {
        var x = super.publicMember;
    }

    get a() {
        var x = super.publicMember;
        return undefined;
    }
    set a(n) {
        n = super.publicMember;
    }
    fn2() {
        function inner() {
            super.publicFunc();
        }
        var x = {
            test: function () { return super.publicFunc(); }
        }
    }
}

//super.privateProperty in constructor of derived class
//super.privateProperty in instance member function of derived class
//super.privateProperty in instance member accessor(get and set) of derived class
class SomeDerived2 extends SomeBase {
    constructor() {
        super();
        super.privateMember = 1;
    }

    fn() {
        var x = super.privateMember;
    }

    get a() {
        var x = super.privateMember;
        return undefined;
    }
    set a(n) {
        n = super.privateMember;
    }
}

//super.publicStaticMemberNotFunction in static member function of derived class
//super.publicStaticMemberNotFunction in static member accessor(get and set) of derived class
//super.privateStaticProperty in static member function of derived class
//super.privateStaticProperty in static member accessor(get and set) of derived class
class SomeDerived3 extends SomeBase {
    static fn() {
        super.publicStaticMember = 3;
        super.privateStaticMember = 3;
        super.privateStaticFunc();
    }
    static get a() {
        super.publicStaticMember = 3;
        super.privateStaticMember = 3;
        super.privateStaticFunc();
        return '';
    }
    static set a(n) {
        super.publicStaticMember = 3;
        super.privateStaticMember = 3;
        super.privateStaticFunc();
    }
}

// In object literal
var obj = { n: super.wat, p: super.foo() };


//// [errorSuperPropertyAccess.js]
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
//super property access in constructor of class with no base type
//super property access in instance member function of class with no base type
//super property access in instance member accessor(get and set) of class with no base type
var NoBase = /** @class */ (function () {
    function NoBase() {
        this.m = _super.prototype.prototype;
        this.n = _super.prototype.hasOwnProperty.call(this, '');
        var a = _super.prototype.prototype;
        var b = _super.prototype.hasOwnProperty.call(this, '');
    }
    NoBase.prototype.fn = function () {
        var a = _super.prototype.prototype;
        var b = _super.prototype.hasOwnProperty.call(this, '');
    };
    //super static property access in static member function of class with no base type
    //super static property access in static member accessor(get and set) of class with no base type
    NoBase.static1 = function () {
        _super.hasOwnProperty.call(this, '');
    };
    Object.defineProperty(NoBase, "static2", {
        get: function () {
            _super.hasOwnProperty.call(this, '');
            return '';
        },
        set: function (n) {
            _super.hasOwnProperty.call(this, '');
        },
        enumerable: false,
        configurable: true
    });
    return NoBase;
}());
var SomeBase = /** @class */ (function () {
    function SomeBase() {
        this.privateMember = 0;
        this.publicMember = 0;
    }
    SomeBase.prototype.privateFunc = function () { };
    SomeBase.prototype.publicFunc = function () { };
    SomeBase.privateStaticFunc = function () { };
    SomeBase.publicStaticFunc = function () { };
    SomeBase.privateStaticMember = 0;
    SomeBase.publicStaticMember = 0;
    return SomeBase;
}());
//super.publicInstanceMemberNotFunction in constructor of derived class
//super.publicInstanceMemberNotFunction in instance member function of derived class
//super.publicInstanceMemberNotFunction in instance member accessor(get and set) of derived class
//super property access only available with typed this
var SomeDerived1 = /** @class */ (function (_super) {
    __extends(SomeDerived1, _super);
    function SomeDerived1() {
        var _this = _super.call(this) || this;
        _super.prototype.publicMember = 1;
        return _this;
    }
    SomeDerived1.prototype.fn = function () {
        var x = _super.prototype.publicMember;
    };
    Object.defineProperty(SomeDerived1.prototype, "a", {
        get: function () {
            var x = _super.prototype.publicMember;
            return undefined;
        },
        set: function (n) {
            n = _super.prototype.publicMember;
        },
        enumerable: false,
        configurable: true
    });
    SomeDerived1.prototype.fn2 = function () {
        function inner() {
            _super.publicFunc.call(this);
        }
        var x = {
            test: function () { return _super.publicFunc.call(this); }
        };
    };
    return SomeDerived1;
}(SomeBase));
//super.privateProperty in constructor of derived class
//super.privateProperty in instance member function of derived class
//super.privateProperty in instance member accessor(get and set) of derived class
var SomeDerived2 = /** @class */ (function (_super) {
    __extends(SomeDerived2, _super);
    function SomeDerived2() {
        var _this = _super.call(this) || this;
        _super.prototype.privateMember = 1;
        return _this;
    }
    SomeDerived2.prototype.fn = function () {
        var x = _super.prototype.privateMember;
    };
    Object.defineProperty(SomeDerived2.prototype, "a", {
        get: function () {
            var x = _super.prototype.privateMember;
            return undefined;
        },
        set: function (n) {
            n = _super.prototype.privateMember;
        },
        enumerable: false,
        configurable: true
    });
    return SomeDerived2;
}(SomeBase));
//super.publicStaticMemberNotFunction in static member function of derived class
//super.publicStaticMemberNotFunction in static member accessor(get and set) of derived class
//super.privateStaticProperty in static member function of derived class
//super.privateStaticProperty in static member accessor(get and set) of derived class
var SomeDerived3 = /** @class */ (function (_super) {
    __extends(SomeDerived3, _super);
    function SomeDerived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SomeDerived3.fn = function () {
        _super.publicStaticMember = 3;
        _super.privateStaticMember = 3;
        _super.privateStaticFunc.call(this);
    };
    Object.defineProperty(SomeDerived3, "a", {
        get: function () {
            _super.publicStaticMember = 3;
            _super.privateStaticMember = 3;
            _super.privateStaticFunc.call(this);
            return '';
        },
        set: function (n) {
            _super.publicStaticMember = 3;
            _super.privateStaticMember = 3;
            _super.privateStaticFunc.call(this);
        },
        enumerable: false,
        configurable: true
    });
    return SomeDerived3;
}(SomeBase));
// In object literal
var obj = { n: _super.wat, p: _super.foo.call(this) };
