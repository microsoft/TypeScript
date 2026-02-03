//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesProtectedMembers3.ts] ////

//// [derivedClassOverridesProtectedMembers3.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    a: typeof x;
    b(a: typeof x) { }
    get c() { return x; }
    set c(v: typeof x) { }
    d: (a: typeof x) => void;

    static r: typeof x;
    static s(a: typeof x) { }
    static get t() { return x; }
    static set t(v: typeof x) { }
    static u: (a: typeof x) => void;

    constructor(a: typeof x) {}
}

// Errors
// decrease visibility of all public members to protected
class Derived1 extends Base {
    protected a: typeof x;
    constructor(a: typeof x) { super(a); }
}

class Derived2 extends Base {
    protected b(a: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived3 extends Base {
    protected get c() { return x; }
    constructor(a: typeof x) { super(a); }
}

class Derived4 extends Base {
    protected set c(v: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived5 extends Base {
    protected d: (a: typeof x) => void ;
    constructor(a: typeof x) { super(a); }
}

class Derived6 extends Base {
    protected static r: typeof x;
    constructor(a: typeof x) { super(a); }
}

class Derived7 extends Base {
    protected static s(a: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived8 extends Base {
    protected static get t() { return x; }
    constructor(a: typeof x) { super(a); }
}

class Derived9 extends Base {
    protected static set t(v: typeof x) { }
    constructor(a: typeof x) { super(a); }
}

class Derived10 extends Base {
    protected static u: (a: typeof x) => void ;
    constructor(a: typeof x) { super(a); }
}

//// [derivedClassOverridesProtectedMembers3.js]
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
// Errors
// decrease visibility of all public members to protected
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1(a) {
        return _super.call(this, a) || this;
    }
    return Derived1;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2(a) {
        return _super.call(this, a) || this;
    }
    Derived2.prototype.b = function (a) { };
    return Derived2;
}(Base));
var Derived3 = /** @class */ (function (_super) {
    __extends(Derived3, _super);
    function Derived3(a) {
        return _super.call(this, a) || this;
    }
    Object.defineProperty(Derived3.prototype, "c", {
        get: function () { return x; },
        enumerable: false,
        configurable: true
    });
    return Derived3;
}(Base));
var Derived4 = /** @class */ (function (_super) {
    __extends(Derived4, _super);
    function Derived4(a) {
        return _super.call(this, a) || this;
    }
    Object.defineProperty(Derived4.prototype, "c", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return Derived4;
}(Base));
var Derived5 = /** @class */ (function (_super) {
    __extends(Derived5, _super);
    function Derived5(a) {
        return _super.call(this, a) || this;
    }
    return Derived5;
}(Base));
var Derived6 = /** @class */ (function (_super) {
    __extends(Derived6, _super);
    function Derived6(a) {
        return _super.call(this, a) || this;
    }
    return Derived6;
}(Base));
var Derived7 = /** @class */ (function (_super) {
    __extends(Derived7, _super);
    function Derived7(a) {
        return _super.call(this, a) || this;
    }
    Derived7.s = function (a) { };
    return Derived7;
}(Base));
var Derived8 = /** @class */ (function (_super) {
    __extends(Derived8, _super);
    function Derived8(a) {
        return _super.call(this, a) || this;
    }
    Object.defineProperty(Derived8, "t", {
        get: function () { return x; },
        enumerable: false,
        configurable: true
    });
    return Derived8;
}(Base));
var Derived9 = /** @class */ (function (_super) {
    __extends(Derived9, _super);
    function Derived9(a) {
        return _super.call(this, a) || this;
    }
    Object.defineProperty(Derived9, "t", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return Derived9;
}(Base));
var Derived10 = /** @class */ (function (_super) {
    __extends(Derived10, _super);
    function Derived10(a) {
        return _super.call(this, a) || this;
    }
    return Derived10;
}(Base));
