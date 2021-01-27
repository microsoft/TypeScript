//// [privateNameAccessorsCallExpression.ts]
class A {
    get #fieldFunc() {  return function() { this.x = 10; } }
    get #fieldFunc2() { return  function(a, ...b) {}; }
    x = 1;
    test() {
        this.#fieldFunc();
        const func = this.#fieldFunc;
        func();
        new this.#fieldFunc();

        const arr = [ 1, 2 ];
        this.#fieldFunc2(0, ...arr, 3);
        const b = new this.#fieldFunc2(0, ...arr, 3);
        const str = this.#fieldFunc2`head${1}middle${2}tail`;
        this.getInstance().#fieldFunc2`test${1}and${2}`;
    }
    getInstance() { return new A(); }
}

//// [privateNameAccessorsCallExpression.js]
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var _A_fieldFunc_get, _A_fieldFunc2_get, _A_instances;
class A {
    constructor() {
        _A_instances.add(this);
        this.x = 1;
    }
    test() {
        var _a;
        __classPrivateAccessorGet(this, _A_instances, _A_fieldFunc_get).call(this);
        const func = __classPrivateAccessorGet(this, _A_instances, _A_fieldFunc_get);
        func();
        new (__classPrivateAccessorGet(this, _A_instances, _A_fieldFunc_get))();
        const arr = [1, 2];
        __classPrivateAccessorGet(this, _A_instances, _A_fieldFunc2_get).call(this, 0, ...arr, 3);
        const b = new (__classPrivateAccessorGet(this, _A_instances, _A_fieldFunc2_get))(0, ...arr, 3);
        const str = __classPrivateAccessorGet(this, _A_instances, _A_fieldFunc2_get).bind(this) `head${1}middle${2}tail`;
        __classPrivateAccessorGet((_a = this.getInstance()), _A_instances, _A_fieldFunc2_get).bind(_a) `test${1}and${2}`;
    }
    getInstance() { return new A(); }
}
_A_instances = new WeakSet(), _A_fieldFunc_get = function _A_fieldFunc_get() { return function () { this.x = 10; }; }, _A_fieldFunc2_get = function _A_fieldFunc2_get() { return function (a, ...b) { }; };
