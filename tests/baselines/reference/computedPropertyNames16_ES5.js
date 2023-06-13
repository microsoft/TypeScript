//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames16_ES5.ts] ////

//// [computedPropertyNames16_ES5.ts]
var s: string;
var n: number;
var a: any;
class C {
    get [s]() { return 0;}
    set [n](v) { }
    static get [s + s]() { return 0; }
    set [s + n](v) { }
    get [+s]() { return 0; }
    static set [""](v) { }
    get [0]() { return 0; }
    set [a](v) { }
    static get [<any>true]() { return 0; }
    set [`hello bye`](v) { }
    get [`hello ${a} bye`]() { return 0; }
}

//// [computedPropertyNames16_ES5.js]
var s;
var n;
var a;
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, s, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, n, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, s + s, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, s + n, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, +s, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, 0, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, a, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, true, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "hello bye", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "hello ".concat(a, " bye"), {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
