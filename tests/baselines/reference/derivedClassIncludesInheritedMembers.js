//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassIncludesInheritedMembers.ts] ////

//// [derivedClassIncludesInheritedMembers.ts]
class Base {
    a: string;
    b() { }
    get c() { return ''; }
    set c(v) { }

    static r: string;
    static s() { }
    static get t() { return ''; }
    static set t(v) { }

    constructor(x) { }
}

class Derived extends Base {
}

var d: Derived = new Derived(1);
var r1 = d.a;
var r2 = d.b();
var r3 = d.c;
d.c = '';
var r4 = Derived.r;
var r5 = Derived.s();
var r6 = Derived.t;
Derived.t = '';

class Base2 {
    [x: string]: Object;
    [x: number]: Date;
}

class Derived2 extends Base2 {
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1];



//// [derivedClassIncludesInheritedMembers.js]
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
    function Base(x) {
    }
    Base.prototype.b = function () { };
    Object.defineProperty(Base.prototype, "c", {
        get: function () { return ''; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Base.s = function () { };
    Object.defineProperty(Base, "t", {
        get: function () { return ''; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var d = new Derived(1);
var r1 = d.a;
var r2 = d.b();
var r3 = d.c;
d.c = '';
var r4 = Derived.r;
var r5 = Derived.s();
var r6 = Derived.t;
Derived.t = '';
var Base2 = /** @class */ (function () {
    function Base2() {
    }
    return Base2;
}());
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base2));
var d2;
var r7 = d2[''];
var r8 = d2[1];
