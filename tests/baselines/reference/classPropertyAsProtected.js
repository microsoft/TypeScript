//// [tests/cases/conformance/classes/members/accessibility/classPropertyAsProtected.ts] ////

//// [classPropertyAsProtected.ts]
class C {
    protected x: string;
    protected get y() { return null; }
    protected set y(x) { }
    protected foo() { }

    protected static a: string;
    protected static get b() { return null; }
    protected static set b(x) { }
    protected static foo() { }
}

var c: C;
// all errors
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();

//// [classPropertyAsProtected.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "y", {
        get: function () { return null; },
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    C.prototype.foo = function () { };
    Object.defineProperty(C, "b", {
        get: function () { return null; },
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    C.foo = function () { };
    return C;
}());
var c;
// all errors
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
