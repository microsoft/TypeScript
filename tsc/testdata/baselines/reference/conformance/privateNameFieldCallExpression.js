//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldCallExpression.ts] ////

//// [privateNameFieldCallExpression.ts]
class A {
    #fieldFunc = function() { this.x = 10; };
    #fieldFunc2 = function(a, ...b) {};
    x = 1;
    test() {
        this.#fieldFunc();
        this.#fieldFunc?.();
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


//// [privateNameFieldCallExpression.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _A_fieldFunc, _A_fieldFunc2;
class A {
    constructor() {
        _A_fieldFunc.set(this, __setFunctionName(function () { this.x = 10; }, "#fieldFunc"));
        _A_fieldFunc2.set(this, __setFunctionName(function (a, ...b) { }, "#fieldFunc2"));
        this.x = 1;
    }
    test() {
        var _a, _b, _c;
        var _d, _e;
        __classPrivateFieldGet(this, _A_fieldFunc, "f").call(this);
        (_a = __classPrivateFieldGet(this, _A_fieldFunc, "f")) === null || _a === void 0 ? void 0 : _a.call(this);
        const func = __classPrivateFieldGet(this, _A_fieldFunc, "f");
        func();
        new (__classPrivateFieldGet(this, _A_fieldFunc, "f"))();
        const arr = [1, 2];
        __classPrivateFieldGet(this, _A_fieldFunc2, "f").call(this, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(this, _A_fieldFunc2, "f"))(0, ...arr, 3);
        const str = __classPrivateFieldGet(this, _A_fieldFunc2, "f").bind(this) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_d = this.getInstance()), _A_fieldFunc2, "f").bind(_d) `test${1}and${2}`;
        (__classPrivateFieldGet(this, _A_fieldFunc, "f")).call(this);
        __classPrivateFieldGet(this, _A_fieldFunc, "f").call(this);
        __classPrivateFieldGet(this, _A_fieldFunc, "f").call(this);
        __classPrivateFieldGet(this, _A_fieldFunc, "f").call(this);
        (_b = (__classPrivateFieldGet(this, _A_fieldFunc, "f"))) === null || _b === void 0 ? void 0 : _b.call(this);
        (_c = __classPrivateFieldGet(this, _A_fieldFunc, "f")) === null || _c === void 0 ? void 0 : _c.call(this);
        (__classPrivateFieldGet((_e = this.getInstance()), _A_fieldFunc, "f")).call(_e);
        (__classPrivateFieldGet(this, _A_fieldFunc2, "f")).bind(this) `test${1}and${2}`;
    }
    getInstance() { return new A(); }
}
_A_fieldFunc = new WeakMap(), _A_fieldFunc2 = new WeakMap();
