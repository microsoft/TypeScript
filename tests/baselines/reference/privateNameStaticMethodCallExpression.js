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
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _AA_method, _AA_method2;
class AA {
    ;
    ;
    test() {
        var _a, _b, _c;
        __classStaticPrivateMethodGet(AA, AA, _AA_method).call(AA);
        const func = __classStaticPrivateMethodGet(AA, AA, _AA_method);
        func();
        new (__classStaticPrivateMethodGet(AA, AA, _AA_method))();
        const arr = [1, 2];
        __classStaticPrivateMethodGet(AA, AA, _AA_method2).call(AA, 0, ...arr, 3);
        const b = new (__classStaticPrivateMethodGet(AA, AA, _AA_method2))(0, ...arr, 3); //Error 
        const str = __classStaticPrivateMethodGet(AA, AA, _AA_method2).bind(AA) `head${1}middle${2}tail`;
        __classStaticPrivateMethodGet((_a = AA.getClass()), AA, _AA_method2).bind(_a) `test${1}and${2}`;
        __classStaticPrivateMethodGet((_b = AA.getClass()), AA, _AA_method2).call(_b, 0, ...arr, 3);
        const b2 = new (__classStaticPrivateMethodGet(AA.getClass(), AA, _AA_method2))(0, ...arr, 3); //Error 
        const str2 = __classStaticPrivateMethodGet((_c = AA.getClass()), AA, _AA_method2).bind(_c) `head${1}middle${2}tail`;
    }
    static getClass() { return AA; }
}
_AA_method = function _AA_method() { this.x = 10; }, _AA_method2 = function _AA_method2(a, ...b) { };
AA.x = 1;
