//// [computedPropertyNames17_ES5.ts]
var b: boolean;
class C {
    get [b]() { return 0;}
    static set [true](v) { }
    get [[]]() { return 0; }
    set [{}](v) { }
    static get [undefined]() { return 0; }
    set [null](v) { }
}

//// [computedPropertyNames17_ES5.js]
var b;
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, b, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, true, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, [], {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, {}, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, undefined, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, null, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
