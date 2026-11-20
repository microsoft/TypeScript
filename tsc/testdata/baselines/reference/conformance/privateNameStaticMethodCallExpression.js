//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethodCallExpression.ts] ////

//// [privateNameStaticMethodCallExpression.ts]
class AA {
    static #method() { this.x = 10; };
    static #method2(a, ...b) {};
    static x = 1;
    test() {
        AA.#method();
        const func = AA.#method;
        func();
        new AA.#method();

        const arr = [ 1, 2 ];
        AA.#method2(0, ...arr, 3);

        const b = new AA.#method2(0, ...arr, 3); //Error 
        const str = AA.#method2`head${1}middle${2}tail`;
        AA.getClass().#method2`test${1}and${2}`;

        AA.getClass().#method2(0, ...arr, 3); 
        const b2 = new (AA.getClass().#method2)(0, ...arr, 3); //Error 
        const str2 = AA.getClass().#method2`head${1}middle${2}tail`;

        (AA.#method)();
        AA.#method!();
        (AA.#method as () => void)();
        (AA.#method satisfies () => void)();
        (AA.#method)?.();
        AA.#method!?.();
        (AA.getClass().#method2)(0, ...arr, 3);
        (AA.#method2)`test${1}and${2}`;
    }
    static getClass() { return AA; }
}


//// [privateNameStaticMethodCallExpression.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _AA_method, _AA_method2;
class AA {
    ;
    ;
    test() {
        var _b, _c;
        var _d, _e, _f, _g;
        __classPrivateFieldGet(_a, _a, "m", _AA_method).call(_a);
        const func = __classPrivateFieldGet(_a, _a, "m", _AA_method);
        func();
        new (__classPrivateFieldGet(_a, _a, "m", _AA_method))();
        const arr = [1, 2];
        __classPrivateFieldGet(_a, _a, "m", _AA_method2).call(_a, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(_a, _a, "m", _AA_method2))(0, ...arr, 3); //Error 
        const str = __classPrivateFieldGet(_a, _a, "m", _AA_method2).bind(_a) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_d = _a.getClass()), _a, "m", _AA_method2).bind(_d) `test${1}and${2}`;
        __classPrivateFieldGet((_e = _a.getClass()), _a, "m", _AA_method2).call(_e, 0, ...arr, 3);
        const b2 = new (__classPrivateFieldGet(_a.getClass(), _a, "m", _AA_method2))(0, ...arr, 3); //Error 
        const str2 = __classPrivateFieldGet((_f = _a.getClass()), _a, "m", _AA_method2).bind(_f) `head${1}middle${2}tail`;
        (__classPrivateFieldGet(_a, _a, "m", _AA_method)).call(_a);
        __classPrivateFieldGet(_a, _a, "m", _AA_method).call(_a);
        __classPrivateFieldGet(_a, _a, "m", _AA_method).call(_a);
        __classPrivateFieldGet(_a, _a, "m", _AA_method).call(_a);
        (_b = (__classPrivateFieldGet(_a, _a, "m", _AA_method))) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_c = __classPrivateFieldGet(_a, _a, "m", _AA_method)) === null || _c === void 0 ? void 0 : _c.call(_a);
        (__classPrivateFieldGet((_g = _a.getClass()), _a, "m", _AA_method2)).call(_g, 0, ...arr, 3);
        (__classPrivateFieldGet(_a, _a, "m", _AA_method2)).bind(_a) `test${1}and${2}`;
    }
    static getClass() { return _a; }
}
_a = AA, _AA_method = function _AA_method() { this.x = 10; }, _AA_method2 = function _AA_method2(a, ...b) { };
AA.x = 1;
