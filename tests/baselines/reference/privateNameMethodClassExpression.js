//// [privateNameMethodClassExpression.ts]
const C = class {
    #field = this.#method();
    #method() { return 42; }
    static getInstance() { return new C(); }
    getField() { return this.#field };
}

console.log(C.getInstance().getField());
C.getInstance().#method; // Error
C.getInstance().#field; // Error



//// [privateNameMethodClassExpression.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _C_field, _C_method, _C_instances, _a;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
            _C_field.set(this, __classPrivateMethodGet(this, _C_instances, _C_method).call(this));
        }
        static getInstance() { return new C(); }
        getField() { return __classPrivateFieldGet(this, _C_field); }
        ;
    },
    _C_field = new WeakMap(),
    _C_instances = new WeakSet(),
    _C_method = function _C_method() { return 42; },
    _a);
console.log(C.getInstance().getField());
C.getInstance().; // Error
C.getInstance().; // Error
