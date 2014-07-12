//// [errorSuperPropertyAccess.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//super property access in constructor of class with no base type
//super property access in instance member function of class with no base type
//super property access in instance member accessor(get and set) of class with no base type
var NoBase = (function () {
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
        _super.prototype.hasOwnProperty.call(this, '');
    };

    Object.defineProperty(NoBase, "static2", {
        get: function () {
            _super.prototype.hasOwnProperty.call(this, '');
            return '';
        },
        set: function (n) {
            _super.prototype.hasOwnProperty.call(this, '');
        },
        enumerable: true,
        configurable: true
    });

    return NoBase;
})();

var SomeBase = (function () {
    function SomeBase() {
        this.privateMember = 0;
        this.publicMember = 0;
    }
    SomeBase.prototype.privateFunc = function () {
    };

    SomeBase.prototype.publicFunc = function () {
    };

    SomeBase.privateStaticFunc = function () {
    };

    SomeBase.publicStaticFunc = function () {
    };
    SomeBase.privateStaticMember = 0;

    SomeBase.publicStaticMember = 0;
    return SomeBase;
})();

//super.publicInstanceMemberNotFunction in constructor of derived class
//super.publicInstanceMemberNotFunction in instance member function of derived class
//super.publicInstanceMemberNotFunction in instance member accessor(get and set) of derived class
//super property access only available with typed this
var SomeDerived1 = (function (_super) {
    __extends(SomeDerived1, _super);
    function SomeDerived1() {
        _super.call(this);
        _super.prototype.publicMember = 1;
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
        enumerable: true,
        configurable: true
    });
    SomeDerived1.prototype.fn2 = function () {
        function inner() {
            _super.prototype.publicFunc.call(this);
        }
        var x = {
            test: function () {
                return _super.prototype.publicFunc.call(this);
            }
        };
    };
    return SomeDerived1;
})(SomeBase);

//super.privateProperty in constructor of derived class
//super.privateProperty in instance member function of derived class
//super.privateProperty in instance member accessor(get and set) of derived class
var SomeDerived2 = (function (_super) {
    __extends(SomeDerived2, _super);
    function SomeDerived2() {
        _super.call(this);
        _super.prototype.privateMember = 1;
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
        enumerable: true,
        configurable: true
    });
    return SomeDerived2;
})(SomeBase);

//super.publicStaticMemberNotFunction in static member function of derived class
//super.publicStaticMemberNotFunction in static member accessor(get and set) of derived class
//super.privateStaticProperty in static member function of derived class
//super.privateStaticProperty in static member accessor(get and set) of derived class
var SomeDerived3 = (function (_super) {
    __extends(SomeDerived3, _super);
    function SomeDerived3() {
        _super.apply(this, arguments);
    }
    SomeDerived3.fn = function () {
        _super.prototype.publicStaticMember = 3;
        _super.prototype.privateStaticMember = 3;
        _super.prototype.privateStaticFunc.call(this);
    };
    Object.defineProperty(SomeDerived3, "a", {
        get: function () {
            _super.prototype.publicStaticMember = 3;
            _super.prototype.privateStaticMember = 3;
            _super.prototype.privateStaticFunc.call(this);
            return '';
        },
        set: function (n) {
            _super.prototype.publicStaticMember = 3;
            _super.prototype.privateStaticMember = 3;
            _super.prototype.privateStaticFunc.call(this);
        },
        enumerable: true,
        configurable: true
    });
    return SomeDerived3;
})(SomeBase);

// In object literal
var obj = { n: _super.prototype.wat, p: _super.prototype.foo.call(this) };
