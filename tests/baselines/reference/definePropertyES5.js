//// [definePropertyES5.ts]
var x: "p" = "p"
class A {
    a = this.y
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    z = this.y
    declare notEmitted: boolean;
}


//// [definePropertyES5.js]
var _a;
var x = "p";
var A = /** @class */ (function () {
    function A(y) {
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: y
        });
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.y
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
        Object.defineProperty(this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.y
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
