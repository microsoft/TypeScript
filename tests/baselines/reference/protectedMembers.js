//// [protectedMembers.ts]
// Class with protected members
class C1 {
    protected x: number;
    protected static sx: number;
    protected f() {
        return this.x;
    }
    protected static sf() {
        return this.sx;
    }
}

// Derived class accessing protected members
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
}

var c1: C1;
var c2: C2;
var c3: C3;

// All of these should be errors
c1.x;
c1.f();
C1.sx;
C1.sf();

// All of these should be errors
c2.x;
c2.f();
C2.sx;
C2.sf();

// All of these should be ok
c3.x;
c3.f();
C3.sx;
C3.sf();

class A {
    protected x;
}

class B extends A {
    y;
}

class C extends A {
    z;
    static foo(a: A, b: B, c: C, d: D, e: E) {
        a.x = 1;  // Error, access must be through C or type derived from C
        b.x = 1;  // Error, access must be through C or type derived from C
        c.x = 1;
        d.x = 1;
        e.x = 1;
    }
}

class D extends C {
    d;
}

interface E extends C {
    e;
}

class CC {
    protected constructor() {
    }
}

class A1 {
    protected x;
}
class B1 {
    x;
}
var a1: A1;
var b1: B1;
a1 = b1;  // Error, B1 doesn't derive from A1
b1 = a1;  // Error, x is protected in A1 but public in B1

class A2 {
    protected x;
}
class B2 extends A2 {
    x;
}

class A3 {
    x;
}
// Error x is protected in B3 but public in A3
class B3 extends A3 {
    protected x;
}



//// [protectedMembers.js]
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
    C1.sf = function () {
        return this.sx;
    };
    return C1;
}());
// Derived class accessing protected members
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
    return C3;
}(C2));
var c1;
var c2;
var c3;
// All of these should be errors
c1.x;
c1.f();
C1.sx;
C1.sf();
// All of these should be errors
c2.x;
c2.f();
C2.sx;
C2.sf();
// All of these should be ok
c3.x;
c3.f();
C3.sx;
C3.sf();
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.foo = function (a, b, c, d, e) {
        a.x = 1; // Error, access must be through C or type derived from C
        b.x = 1; // Error, access must be through C or type derived from C
        c.x = 1;
        d.x = 1;
        e.x = 1;
    };
    return C;
}(A));
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
var CC = /** @class */ (function () {
    function CC() {
    }
    return CC;
}());
var A1 = /** @class */ (function () {
    function A1() {
    }
    return A1;
}());
var B1 = /** @class */ (function () {
    function B1() {
    }
    return B1;
}());
var a1;
var b1;
a1 = b1; // Error, B1 doesn't derive from A1
b1 = a1; // Error, x is protected in A1 but public in B1
var A2 = /** @class */ (function () {
    function A2() {
    }
    return A2;
}());
var B2 = /** @class */ (function (_super) {
    __extends(B2, _super);
    function B2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B2;
}(A2));
var A3 = /** @class */ (function () {
    function A3() {
    }
    return A3;
}());
// Error x is protected in B3 but public in A3
var B3 = /** @class */ (function (_super) {
    __extends(B3, _super);
    function B3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B3;
}(A3));
