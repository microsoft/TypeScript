//// [tests/cases/conformance/classes/members/accessibility/classPropertyIsPublicByDefault.ts] ////

//// [classPropertyIsPublicByDefault.ts]
class C {
    x: string;
    get y() { return null; }
    set y(x) { }
    foo() { }

    static a: string;
    static get b() { return null; }
    static set b(x) { }
    static foo() { }
}

var c: C;
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();

//// [classPropertyIsPublicByDefault.js]
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
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
