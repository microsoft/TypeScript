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
    }
    static getClass() { return AA; }
}


//// [privateNameStaticMethodCallExpression.js]
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
        var _b, _c, _d;
        __classPrivateFieldGet(_a, _a, "m", _AA_method).call(_a);
        const func = __classPrivateFieldGet(_a, _a, "m", _AA_method);
        func();
        new (__classPrivateFieldGet(_a, _a, "m", _AA_method))();
        const arr = [1, 2];
        __classPrivateFieldGet(_a, _a, "m", _AA_method2).call(_a, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(_a, _a, "m", _AA_method2))(0, ...arr, 3); //Error 
        const str = __classPrivateFieldGet(_a, _a, "m", _AA_method2).bind(_a) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_b = _a.getClass()), _a, "m", _AA_method2).bind(_b) `test${1}and${2}`;
        __classPrivateFieldGet((_c = _a.getClass()), _a, "m", _AA_method2).call(_c, 0, ...arr, 3);
        const b2 = new (__classPrivateFieldGet(_a.getClass(), _a, "m", _AA_method2))(0, ...arr, 3); //Error 
        const str2 = __classPrivateFieldGet((_d = _a.getClass()), _a, "m", _AA_method2).bind(_d) `head${1}middle${2}tail`;
    }
    static getClass() { return _a; }
}
_a = AA, _AA_method = function _AA_method() { this.x = 10; }, _AA_method2 = function _AA_method2(a, ...b) { };
AA.x = 1;
