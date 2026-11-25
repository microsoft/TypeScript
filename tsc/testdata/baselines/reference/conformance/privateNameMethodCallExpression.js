//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.ts] ////

//// [privateNameMethodCallExpression.ts]
class AA {
    #method() { this.x = 10; };
    #method2(a, ...b) {};
    x = 1;
    test() {
        this.#method();
        const func = this.#method;
        func();
        new this.#method();

        const arr = [ 1, 2 ];
        this.#method2(0, ...arr, 3);

        const b = new this.#method2(0, ...arr, 3); //Error 
        const str = this.#method2`head${1}middle${2}tail`;
        this.getInstance().#method2`test${1}and${2}`;

        this.getInstance().#method2(0, ...arr, 3); 
        const b2 = new (this.getInstance().#method2)(0, ...arr, 3); //Error 
        const str2 = this.getInstance().#method2`head${1}middle${2}tail`;

        (this.#method)();
        this.#method!();
        (this.#method as () => void)();
        (this.#method satisfies () => void)();
        (((this.#method as () => void)!))();
        (this.#method)?.();
        this.#method!?.();
        (this.getInstance().#method2)(0, ...arr, 3);
        (this.#method2)`test${1}and${2}`;
        this.#method2!`test${1}and${2}`;
        (this.#method2 as any)`test${1}and${2}`;
        (this.#method2 satisfies Function)`test${1}and${2}`;
        (0, this.#method)();
    }
    getInstance() { return new AA(); }
}


//// [privateNameMethodCallExpression.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AA_instances, _AA_method, _AA_method2;
class AA {
    constructor() {
        _AA_instances.add(this);
        this.x = 1;
    }
    ;
    ;
    test() {
        var _a, _b;
        var _c, _d, _e, _f;
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method).call(this);
        const func = __classPrivateFieldGet(this, _AA_instances, "m", _AA_method);
        func();
        new (__classPrivateFieldGet(this, _AA_instances, "m", _AA_method))();
        const arr = [1, 2];
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method2).call(this, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(this, _AA_instances, "m", _AA_method2))(0, ...arr, 3); //Error 
        const str = __classPrivateFieldGet(this, _AA_instances, "m", _AA_method2).bind(this) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_c = this.getInstance()), _AA_instances, "m", _AA_method2).bind(_c) `test${1}and${2}`;
        __classPrivateFieldGet((_d = this.getInstance()), _AA_instances, "m", _AA_method2).call(_d, 0, ...arr, 3);
        const b2 = new (__classPrivateFieldGet(this.getInstance(), _AA_instances, "m", _AA_method2))(0, ...arr, 3); //Error 
        const str2 = __classPrivateFieldGet((_e = this.getInstance()), _AA_instances, "m", _AA_method2).bind(_e) `head${1}middle${2}tail`;
        (__classPrivateFieldGet(this, _AA_instances, "m", _AA_method)).call(this);
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method).call(this);
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method).call(this);
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method).call(this);
        ((__classPrivateFieldGet(this, _AA_instances, "m", _AA_method))).call(this);
        (_a = (__classPrivateFieldGet(this, _AA_instances, "m", _AA_method))) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = __classPrivateFieldGet(this, _AA_instances, "m", _AA_method)) === null || _b === void 0 ? void 0 : _b.call(this);
        (__classPrivateFieldGet((_f = this.getInstance()), _AA_instances, "m", _AA_method2)).call(_f, 0, ...arr, 3);
        (__classPrivateFieldGet(this, _AA_instances, "m", _AA_method2)).bind(this) `test${1}and${2}`;
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method2).bind(this) `test${1}and${2}`;
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method2).bind(this) `test${1}and${2}`;
        __classPrivateFieldGet(this, _AA_instances, "m", _AA_method2).bind(this) `test${1}and${2}`;
        (0, __classPrivateFieldGet(this, _AA_instances, "m", _AA_method))();
    }
    getInstance() { return new AA(); }
}
_AA_instances = new WeakSet(), _AA_method = function _AA_method() { this.x = 10; }, _AA_method2 = function _AA_method2(a, ...b) { };
