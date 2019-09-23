//// [definePropertyES5.ts]
var x: "p" = "p"
class A {
    a = 12
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
}


//// [definePropertyES5.js]
var _a;
var x = "p";
var A = /** @class */ (function () {
    function A() {
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 12
        });
        Object.defineProperty(this, "b", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "computed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 13
        });
        Object.defineProperty(this, _a, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 14
        });
    }
    Object.defineProperty(A.prototype, "m", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    });
    return A;
}());
_a = x;
