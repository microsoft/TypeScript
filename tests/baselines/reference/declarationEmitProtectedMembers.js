//// [tests/cases/compiler/declarationEmitProtectedMembers.ts] ////

//// [declarationEmitProtectedMembers.ts]
// Class with protected members
class C1 {
    protected x: number;

    protected f() {
        return this.x;
    }

    protected set accessor(a: number) { }
    protected get accessor() { return 0; }

    protected static sx: number;

    protected static sf() {
        return this.sx;
    }

    protected static set staticSetter(a: number) { }
    protected static get staticGetter() { return 0; }
}

// Derived class overriding protected members
class C2 extends C1 {
    protected f() {
        return super.f() + this.x;
    }
    protected static sf() {
        return super.sf() + this.sx;
    }
}

// Derived class making protected members public
class C3 extends C2 {
    x: number;
    static sx: number;
    f() {
        return super.f();
    }
    static sf() {
        return super.sf();
    }

    static get staticGetter() { return 1; }
}

// Protected properties in constructors
class C4 {
    constructor(protected a: number, protected b) { }
}

//// [declarationEmitProtectedMembers.js]
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
// Class with protected members
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.f = function () {
        return this.x;
    };
    Object.defineProperty(C1.prototype, "accessor", {
        get: function () { return 0; },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    C1.sf = function () {
        return this.sx;
    };
    Object.defineProperty(C1, "staticSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1, "staticGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    return C1;
}());
// Derived class overriding protected members
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C2.prototype.f = function () {
        return _super.prototype.f.call(this) + this.x;
    };
    C2.sf = function () {
        return _super.sf.call(this) + this.sx;
    };
    return C2;
}(C1));
// Derived class making protected members public
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C3.prototype.f = function () {
        return _super.prototype.f.call(this);
    };
    C3.sf = function () {
        return _super.sf.call(this);
    };
    Object.defineProperty(C3, "staticGetter", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return C3;
}(C2));
// Protected properties in constructors
var C4 = /** @class */ (function () {
    function C4(a, b) {
        this.a = a;
        this.b = b;
    }
    return C4;
}());


//// [declarationEmitProtectedMembers.d.ts]
declare class C1 {
    protected x: number;
    protected f(): number;
    protected set accessor(a: number);
    protected get accessor(): number;
    protected static sx: number;
    protected static sf(): number;
    protected static set staticSetter(a: number);
    protected static get staticGetter(): number;
}
declare class C2 extends C1 {
    protected f(): number;
    protected static sf(): number;
}
declare class C3 extends C2 {
    x: number;
    static sx: number;
    f(): number;
    static sf(): number;
    static get staticGetter(): number;
}
declare class C4 {
    protected a: number;
    protected b: any;
    constructor(a: number, b: any);
}
