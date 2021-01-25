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
        _method.add(this);
        _field.set(this, 123);
    }
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
    var _field, _method, _method_1, _sField, _sMethod, _sMethod_1, _acc, _acc_1, _sAcc, _sAcc_1;
    _field = new WeakMap(), _method = new WeakSet(), _sField = new WeakMap(), _sMethod = new WeakSet(), _method_1 = function _method_1() { }, _sMethod_1 = function _sMethod_1() { };
    _sField.set(A, "hello world");
    return A;
}());
