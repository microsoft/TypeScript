//// [tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.ts] ////

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

        (this.#fieldFunc)();
        this.#fieldFunc!();
        (this.#fieldFunc as () => void)();
        (this.#fieldFunc satisfies () => void)();
        (this.#fieldFunc)?.();
        this.#fieldFunc!?.();
        (this.getInstance().#fieldFunc)();
        (this.#fieldFunc2)`test${1}and${2}`;
    }
    getInstance() { return new A(); }
}

//// [privateNameAccessorsCallExpression.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_instances, _A_fieldFunc_get, _A_fieldFunc2_get;
class A {
    constructor() {
        _A_instances.add(this);
        this.x = 1;
    }
    test() {
        var _a, _b;
        var _c, _d;
        __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get).call(this);
        const func = __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get);
        func();
        new (__classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get))();
        const arr = [1, 2];
        __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc2_get).call(this, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc2_get))(0, ...arr, 3);
        const str = __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc2_get).bind(this) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_c = this.getInstance()), _A_instances, "a", _A_fieldFunc2_get).bind(_c) `test${1}and${2}`;
        (__classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get)).call(this);
        __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get).call(this);
        __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get).call(this);
        __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get).call(this);
        (_a = (__classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get))) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = __classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc_get)) === null || _b === void 0 ? void 0 : _b.call(this);
        (__classPrivateFieldGet((_d = this.getInstance()), _A_instances, "a", _A_fieldFunc_get)).call(_d);
        (__classPrivateFieldGet(this, _A_instances, "a", _A_fieldFunc2_get)).bind(this) `test${1}and${2}`;
    }
    getInstance() { return new A(); }
}
_A_instances = new WeakSet(), _A_fieldFunc_get = function _A_fieldFunc_get() { return function () { this.x = 10; }; }, _A_fieldFunc2_get = function _A_fieldFunc2_get() { return function (a, ...b) { }; };
