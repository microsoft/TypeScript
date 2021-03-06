//// [privateNameES5Ban.ts]
class A {
    constructor() {}
    #field = 123;
    #method() {}
    static #sField = "hello world";
    static #sMethod() {}
    get #acc() { return ""; }
    set #acc(x: string) {}
    static get #sAcc() { return 0; }
    static set #sAcc(x: number) {}
}



//// [privateNameES5Ban.js]
var A = /** @class */ (function () {
    function A() {
        _field.set(this, 123);
    }
    A.prototype. = function () { };
    A. = function () { };
    Object.defineProperty(A.prototype, "", {
        get: function () { return ""; },
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(A, "", {
        get: function () { return 0; },
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    var _field, _sField;
    _field = new WeakMap(), _sField = new WeakMap();
    _sField.set(A, "hello world");
    return A;
}());
