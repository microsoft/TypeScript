//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames3_ES5.ts] ////

//// [computedPropertyNames3_ES5.ts]
var id;
class C {
    [0 + 1]() { }
    static [() => { }]() { }
    get [delete id]() { }
    set [[0, 1]](v) { }
    static get [<String>""]() { }
    static set [id.toString()](v) { }
}

//// [computedPropertyNames3_ES5.js]
var id;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[0 + 1] = function () { };
    C[function () { }] = function () { };
    Object.defineProperty(C.prototype, delete id, {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, [0, 1], {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, id.toString(), {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
