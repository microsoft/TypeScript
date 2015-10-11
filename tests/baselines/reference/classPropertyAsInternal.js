//// [classPropertyAsInternal.ts]
class C {
    internal x: string;
    internal get y() { return null; }
    internal set y(x) { }
    internal foo() { }

    internal static a: string;
    internal static get b() { return null; }
    internal static set b(x) { }
    internal static foo() { }
}

var c: C;
// all OK
c.x;
c.y;
c.y = 1;
c.foo();

C.a;
C.b();
C.b = 1;
C.foo();

//// [classPropertyAsInternal.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "y", {
        get: function () { return null; },
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    C.prototype.foo = function () { };
    Object.defineProperty(C, "b", {
        get: function () { return null; },
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    C.foo = function () { };
    return C;
})();
var c;
// all OK
c.x;
c.y;
c.y = 1;
c.foo();
C.a;
C.b();
C.b = 1;
C.foo();
