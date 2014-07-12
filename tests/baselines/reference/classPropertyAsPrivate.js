//// [classPropertyAsPrivate.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "y", {
        get: function () {
            return null;
        },
        set: function (x) {
        },
        enumerable: true,
        configurable: true
    });
    C.prototype.foo = function () {
    };

    Object.defineProperty(C, "b", {
        get: function () {
            return null;
        },
        set: function (x) {
        },
        enumerable: true,
        configurable: true
    });
    C.foo = function () {
    };
    return C;
})();

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
