//// [definePropertyES5.ts]
class A {
    a = 12
    b
    m() { }
}


//// [definePropertyES5.js]
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
    }
    Object.defineProperty(A.prototype, "m", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () { }
    });
    return A;
}());
