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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _AA_method, _AA_method2, _AA_instances;
class AA {
    constructor() {
        _AA_instances.add(this);
        _AA_instances.add(this);
        this.x = 1;
    }
    ;
    ;
    test() {
        var _a, _b, _c;
        __classPrivateMethodGet(this, _AA_instances, _AA_method).call(this);
        const func = __classPrivateMethodGet(this, _AA_instances, _AA_method);
        func();
        new (__classPrivateMethodGet(this, _AA_instances, _AA_method))();
        const arr = [1, 2];
        __classPrivateMethodGet(this, _AA_instances, _AA_method2).call(this, 0, ...arr, 3);
        const b = new (__classPrivateMethodGet(this, _AA_instances, _AA_method2))(0, ...arr, 3); //Error 
        const str = __classPrivateMethodGet(this, _AA_instances, _AA_method2).bind(this) `head${1}middle${2}tail`;
        __classPrivateMethodGet((_a = this.getInstance()), _AA_instances, _AA_method2).bind(_a) `test${1}and${2}`;
        __classPrivateMethodGet((_b = this.getInstance()), _AA_instances, _AA_method2).call(_b, 0, ...arr, 3);
        const b2 = new (__classPrivateMethodGet(this.getInstance(), _AA_instances, _AA_method2))(0, ...arr, 3); //Error 
        const str2 = __classPrivateMethodGet((_c = this.getInstance()), _AA_instances, _AA_method2).bind(_c) `head${1}middle${2}tail`;
    }
    getInstance() { return new AA(); }
}
_AA_instances = new WeakSet(), _AA_method = function _AA_method() { this.x = 10; }, _AA_method2 = function _AA_method2(a, ...b) { };
