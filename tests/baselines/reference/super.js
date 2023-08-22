//// [tests/cases/compiler/super.ts] ////

//// [super.ts]
class Base {
    constructor() {
        var x;
    }
    public foo() {
        return "base";
    }

    public bar() {
        return "basebar";
    }
}

class Sub1 extends Base {
    public foo() {
        return "sub1" + super.foo() + super.bar();
    }
}


class SubSub1 extends Sub1 {
    public foo() {
        return "subsub1" + super.foo();
    }
}

class Base2 {
    public foo() {
        super.foo();
    }
}

var s = new Sub1();
var ss = new SubSub1();
s.foo() + ss.foo();



//// [super.js]
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
        var x;
    }
    Base.prototype.foo = function () {
        return "base";
    };
    Base.prototype.bar = function () {
        return "basebar";
    };
    return Base;
}());
var Sub1 = /** @class */ (function (_super) {
    __extends(Sub1, _super);
    function Sub1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub1.prototype.foo = function () {
        return "sub1" + _super.prototype.foo.call(this) + _super.prototype.bar.call(this);
    };
    return Sub1;
}(Base));
var SubSub1 = /** @class */ (function (_super) {
    __extends(SubSub1, _super);
    function SubSub1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubSub1.prototype.foo = function () {
        return "subsub1" + _super.prototype.foo.call(this);
    };
    return SubSub1;
}(Sub1));
var Base2 = /** @class */ (function () {
    function Base2() {
    }
    Base2.prototype.foo = function () {
        _super.prototype.foo.call(this);
    };
    return Base2;
}());
var s = new Sub1();
var ss = new SubSub1();
s.foo() + ss.foo();
