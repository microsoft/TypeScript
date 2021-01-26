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
    }
    getInstance() { return new A(); }
}


//// [privateNameFieldCallExpression.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_fieldFunc, _A_fieldFunc2;
class A {
    constructor() {
        _A_fieldFunc.set(this, function () { this.x = 10; });
        _A_fieldFunc2.set(this, function (a, ...b) { });
        this.x = 1;
    }
    test() {
        var _a;
        var _b;
        __classPrivateFieldGet(this, _A_fieldFunc).call(this);
        (_a = __classPrivateFieldGet(this, _A_fieldFunc)) === null || _a === void 0 ? void 0 : _a.call(this);
        const func = __classPrivateFieldGet(this, _A_fieldFunc);
        func();
        new (__classPrivateFieldGet(this, _A_fieldFunc))();
        const arr = [1, 2];
        __classPrivateFieldGet(this, _A_fieldFunc2).call(this, 0, ...arr, 3);
        const b = new (__classPrivateFieldGet(this, _A_fieldFunc2))(0, ...arr, 3);
        const str = __classPrivateFieldGet(this, _A_fieldFunc2).bind(this) `head${1}middle${2}tail`;
        __classPrivateFieldGet((_b = this.getInstance()), _A_fieldFunc2).bind(_b) `test${1}and${2}`;
    }
    getInstance() { return new A(); }
}
_A_fieldFunc = new WeakMap(), _A_fieldFunc2 = new WeakMap();
