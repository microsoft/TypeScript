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
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived(a) {
        return _super.call(this, x) || this;
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
