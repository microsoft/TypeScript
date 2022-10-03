//// [derivedClassOverridesProtectedMembers2.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
    protected b(a: typeof x) { }
    protected get c() { return x; }
    protected set c(v: typeof x) { }
    protected d: (a: typeof x) => void ;

    protected static r: typeof x;
    protected static s(a: typeof x) { }
    protected static get t() { return x; }
    protected static set t(v: typeof x) { }
    protected static u: (a: typeof x) => void ;

constructor(a: typeof x) { }
}

// Increase visibility of all protected members to public
class Derived extends Base {
    a: typeof y;
    b(a: typeof y) { }
    get c() { return y; }
    set c(v: typeof y) { }
    d: (a: typeof y) => void;

    static r: typeof y;
    static s(a: typeof y) { }
    static get t() { return y; }
    static set t(a: typeof y) { }
    static u: (a: typeof y) => void;

    constructor(a: typeof y) { super(a); }
}

var d: Derived = new Derived(y);
var r1 = d.a;
var r2 = d.b(y);
var r3 = d.c;
var r3a = d.d;
d.c = y;
var r4 = Derived.r;
var r5 = Derived.s(y);
var r6 = Derived.t;
var r6a = Derived.u;
Derived.t = y;

class Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}

class Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1];



//// [derivedClassOverridesProtectedMembers2.js]
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
var x;
var y;
var Base = /** @class */ (function () {
    function Base(a) {
    }
    Base.prototype.b = function (a) { };
    Object.defineProperty(Base.prototype, "c", {
        get: function () { return x; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Base.s = function (a) { };
    Object.defineProperty(Base, "t", {
        get: function () { return x; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return Base;
}());
// Increase visibility of all protected members to public
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived(a) {
        return _super.call(this, a) || this;
    }
    Derived.prototype.b = function (a) { };
    Object.defineProperty(Derived.prototype, "c", {
        get: function () { return y; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Derived.s = function (a) { };
    Object.defineProperty(Derived, "t", {
        get: function () { return y; },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return Derived;
}(Base));
var d = new Derived(y);
var r1 = d.a;
var r2 = d.b(y);
var r3 = d.c;
var r3a = d.d;
d.c = y;
var r4 = Derived.r;
var r5 = Derived.s(y);
var r6 = Derived.t;
var r6a = Derived.u;
Derived.t = y;
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
