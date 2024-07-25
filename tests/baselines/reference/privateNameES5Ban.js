//// [tests/cases/conformance/classes/members/privateNames/privateNameES5Ban.ts] ////

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
    var _A_instances, _a, _A_field, _A_method, _A_sField, _A_sMethod, _A_acc_get, _A_acc_set, _A_sAcc_get, _A_sAcc_set;
    _a = A, _A_field = new WeakMap(), _A_instances = new WeakSet(), _A_method = function _A_method() { }, _A_sMethod = function _A_sMethod() { }, _A_acc_get = function _A_acc_get() { return ""; }, _A_acc_set = function _A_acc_set(x) { }, _A_sAcc_get = function _A_sAcc_get() { return 0; }, _A_sAcc_set = function _A_sAcc_set(x) { };
    _A_sField = { value: "hello world" };
    return A;
}());
