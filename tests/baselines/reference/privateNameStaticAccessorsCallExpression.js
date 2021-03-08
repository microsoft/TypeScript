//// [privateNameStaticAccessorsCallExpression.ts]
class A {
    static get #fieldFunc() {  return function() { A.#x = 10; } }
    static get #fieldFunc2() { return  function(a, ...b) {}; }
    static #x = 1;
    static test() {
        this.#fieldFunc();
        const func = this.#fieldFunc;
        func();
        new this.#fieldFunc();

        const arr = [ 1, 2 ];
        this.#fieldFunc2(0, ...arr, 3);
        const b = new this.#fieldFunc2(0, ...arr, 3);
        const str = this.#fieldFunc2`head${1}middle${2}tail`;
        this.getClass().#fieldFunc2`test${1}and${2}`;
    }
    static getClass() { return A; }
}

//// [privateNameStaticAccessorsCallExpression.js]
var __classStaticPrivateFieldSet = (this && this.__classStaticPrivateFieldSet) || function (receiver, classConstructor, propertyDescriptor, value) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    propertyDescriptor.value = value;
    return value;
};
var __classStaticPrivateAccessorGet = (this && this.__classStaticPrivateAccessorGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn.call(receiver);
};
var _a, _A_fieldFunc_get, _A_fieldFunc2_get, _A_x;
class A {
    static test() {
        var _b;
        __classStaticPrivateAccessorGet(this, _a, _A_fieldFunc_get).call(this);
        const func = __classStaticPrivateAccessorGet(this, _a, _A_fieldFunc_get);
        func();
        new (__classStaticPrivateAccessorGet(this, _a, _A_fieldFunc_get))();
        const arr = [1, 2];
        __classStaticPrivateAccessorGet(this, _a, _A_fieldFunc2_get).call(this, 0, ...arr, 3);
        const b = new (__classStaticPrivateAccessorGet(this, _a, _A_fieldFunc2_get))(0, ...arr, 3);
        const str = __classStaticPrivateAccessorGet(this, _a, _A_fieldFunc2_get).bind(this) `head${1}middle${2}tail`;
        __classStaticPrivateAccessorGet((_b = this.getClass()), _a, _A_fieldFunc2_get).bind(_b) `test${1}and${2}`;
    }
    static getClass() { return A; }
}
_a = A, _A_fieldFunc_get = function _A_fieldFunc_get() { return function () { __classStaticPrivateFieldSet(A, _a, _A_x, 10); }; }, _A_fieldFunc2_get = function _A_fieldFunc2_get() { return function (a, ...b) { }; };
_A_x = { value: 1 };
