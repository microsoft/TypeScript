//// [privateNameMethodInStaticFieldInit.ts]
class C {
    static s = new C().#method();
    #method() { return 42; }
}

console.log(C.s);


//// [privateNameMethodInStaticFieldInit.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _C_method, _C_instances, _a;
class C {
    constructor() {
        _C_instances.add(this);
    }
}
_C_instances = new WeakSet(), _C_method = function _C_method() { return 42; };
C.s = __classPrivateMethodGet((_a = new C()), _C_instances, _C_method).call(_a);
console.log(C.s);
