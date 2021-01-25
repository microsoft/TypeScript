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
    }
    getInstance() { return new AA(); }
}


//// [privateNameMethodCallExpression.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _method, _method_1, _method2, _method2_1;
class AA {
    constructor() {
        _method.add(this);
        _method2.add(this);
        this.x = 1;
    }
    ;
    ;
    test() {
        var _a, _b, _c;
        __classPrivateMethodGet(this, _method, _method_1).call(this);
        const func = __classPrivateMethodGet(this, _method, _method_1);
        func();
        new (__classPrivateMethodGet(this, _method, _method_1))();
        const arr = [1, 2];
        __classPrivateMethodGet(this, _method2, _method2_1).call(this, 0, ...arr, 3);
        const b = new (__classPrivateMethodGet(this, _method2, _method2_1))(0, ...arr, 3); //Error 
        const str = __classPrivateMethodGet(this, _method2, _method2_1).bind(this) `head${1}middle${2}tail`;
        __classPrivateMethodGet((_a = this.getInstance()), _method2, _method2_1).bind(_a) `test${1}and${2}`;
        __classPrivateMethodGet((_b = this.getInstance()), _method2, _method2_1).call(_b, 0, ...arr, 3);
        const b2 = new (__classPrivateMethodGet(this.getInstance(), _method2, _method2_1))(0, ...arr, 3); //Error 
        const str2 = __classPrivateMethodGet((_c = this.getInstance()), _method2, _method2_1).bind(_c) `head${1}middle${2}tail`;
    }
    getInstance() { return new AA(); }
}
_method = new WeakSet(), _method2 = new WeakSet(), _method_1 = function _method_1() { this.x = 10; }, _method2_1 = function _method2_1(a, ...b) { };
