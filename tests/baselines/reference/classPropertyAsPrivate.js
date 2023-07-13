//// [tests/cases/conformance/classes/members/accessibility/classPropertyAsPrivate.ts] ////

//// [classPropertyAsPrivate.ts]
class C {
    private x: string;
    private get y() { return null; }
    private set y(x) { }
    private foo() { }

    private static a: string;
    private static get b() { return null; }
    private static set b(x) { }
    private static foo() { }
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

//// [classPropertyAsPrivate.js]
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
