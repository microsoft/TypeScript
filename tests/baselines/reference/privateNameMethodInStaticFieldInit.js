//// [privateNameMethodInStaticFieldInit.ts]
class C {
    static s = new C().#method();
    #method() { return 42; }
}

console.log(C.s);


//// [privateNameMethodInStaticFieldInit.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _C_instances, _C_method, _a;
class C {
    constructor() {
        _C_instances.add(this);
    }
}
_C_instances = new WeakSet(), _C_method = function _C_method() { return 42; };
C.s = __classPrivateFieldGet((_a = new C()), _C_instances, "m", _C_method).call(_a);
console.log(C.s);
