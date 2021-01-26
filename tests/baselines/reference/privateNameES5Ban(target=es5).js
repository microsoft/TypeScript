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
        _A_instances.add(this);
        _A_field.set(this, 123);
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
    var _A_field, _A_method, _A_sField, _A_sMethod, _A_acc, _A_acc_1, _A_sAcc, _A_sAcc_1, _A_instances;
    _A_field = new WeakMap(), _A_sField = new WeakMap(), _A_instances = new WeakSet(), _A_method = function _A_method() { }, _A_sMethod = function _A_sMethod() { };
    _A_sField.set(A, "hello world");
    return A;
}());
