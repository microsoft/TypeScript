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
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, b, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, true, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, [], {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, {}, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, undefined, {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, null, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
