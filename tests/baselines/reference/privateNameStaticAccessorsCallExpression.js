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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_fieldFunc_get, _A_fieldFunc2_get, _A_x;
class A {
    static test() {
        var _b;
        __classPrivateFieldGet(this, _a, "a", _A_fieldFunc_get).call(this);
        const func = __classPrivateFieldGet(this, _a, "a", _A_fieldFunc_get);
        func();
        new (__classPrivateFieldGet(this, _a, "a", _A_fieldFunc_get))();
        const arr = [1, 2];
        __classPrivateFieldGet(this, _a, "a", _A_fieldFunc2_get).call(this, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(this, _a, "a", _A_fieldFunc2_get))(0, ...arr, 3);
        const str = __classPrivateFieldGet(this, _a, "a", _A_fieldFunc2_get).bind(this) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_b = this.getClass()), _a, "a", _A_fieldFunc2_get).bind(_b) `test${1}and${2}`;
    }
    static getClass() { return A; }
}
_a = A, _A_fieldFunc_get = function _A_fieldFunc_get() { return function () { __classPrivateFieldSet(A, _a, 10, "f", _A_x); }; }, _A_fieldFunc2_get = function _A_fieldFunc2_get() { return function (a, ...b) { }; };
_A_x = { value: 1 };
