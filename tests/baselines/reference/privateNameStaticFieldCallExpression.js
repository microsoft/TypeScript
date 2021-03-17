//// [privateNameStaticFieldCallExpression.ts]
class A {
    static #fieldFunc = function () { this.x = 10; };
    static #fieldFunc2 = function (a, ...b) {};
    x = 1;
    test() {
        A.#fieldFunc();
        A.#fieldFunc?.();
        const func = A.#fieldFunc;
        func();
        new A.#fieldFunc();

        const arr = [ 1, 2 ];
        A.#fieldFunc2(0, ...arr, 3);
        const b = new A.#fieldFunc2(0, ...arr, 3);
        const str = A.#fieldFunc2`head${1}middle${2}tail`;
        this.getClass().#fieldFunc2`test${1}and${2}`;
    }
    getClass() { return A; }
}


//// [privateNameStaticFieldCallExpression.js]
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
};
var _a, _A_fieldFunc, _A_fieldFunc2;
class A {
    constructor() {
        this.x = 1;
    }
    test() {
        var _b;
        var _c;
        __classStaticPrivateFieldGet(A, _a, _A_fieldFunc).call(A);
        (_b = __classStaticPrivateFieldGet(A, _a, _A_fieldFunc)) === null || _b === void 0 ? void 0 : _b.call(A);
        const func = __classStaticPrivateFieldGet(A, _a, _A_fieldFunc);
        func();
        new (__classStaticPrivateFieldGet(A, _a, _A_fieldFunc))();
        const arr = [1, 2];
        __classStaticPrivateFieldGet(A, _a, _A_fieldFunc2).call(A, 0, ...arr, 3);
        const b = new (__classStaticPrivateFieldGet(A, _a, _A_fieldFunc2))(0, ...arr, 3);
        const str = __classStaticPrivateFieldGet(A, _a, _A_fieldFunc2).bind(A) `head${1}middle${2}tail`;
        __classStaticPrivateFieldGet((_c = this.getClass()), _a, _A_fieldFunc2).bind(_c) `test${1}and${2}`;
    }
    getClass() { return A; }
}
_a = A;
_A_fieldFunc = { value: function () { this.x = 10; } };
_A_fieldFunc2 = { value: function (a, ...b) { } };
