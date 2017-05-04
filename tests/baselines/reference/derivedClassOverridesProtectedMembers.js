//// [derivedClassOverridesProtectedMembers.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
    protected b(a: typeof x) { }
    protected get c() { return x; }
    protected set c(v: typeof x) { }
    protected d: (a: typeof x) => void;

    protected static r: typeof x;
    protected static s(a: typeof x) { }
    protected static get t() { return x; }
    protected static set t(v: typeof x) { }
    protected static u: (a: typeof x) => void;

    constructor(a: typeof x) { }
}

class Derived extends Base {
    protected a: typeof y;
    protected b(a: typeof y) { }
    protected get c() { return y; }
    protected set c(v: typeof y) { }
    protected d: (a: typeof y) => void;

    protected static r: typeof y;
    protected static s(a: typeof y) { }
    protected static get t() { return y; }
    protected static set t(a: typeof y) { }
    protected static u: (a: typeof y) => void;

    constructor(a: typeof y) { super(x) }
}


//// [derivedClassOverridesProtectedMembers.js]
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
var x;
var y;
var Base = (function () {
    function Base(a) {
    }
    Base.prototype.b = function (a) { };
    Object.defineProperty(Base.prototype, "c", {
        get: function () { return x; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Base.s = function (a) { };
    Object.defineProperty(Base, "t", {
        get: function () { return x; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived(a) {
        return _super.call(this, x) || this;
    }
    Derived.prototype.b = function (a) { };
    Object.defineProperty(Derived.prototype, "c", {
        get: function () { return y; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Derived.s = function (a) { };
    Object.defineProperty(Derived, "t", {
        get: function () { return y; },
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return Derived;
}(Base));
