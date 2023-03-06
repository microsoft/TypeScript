//// [privateNameStaticMethodInStaticFieldInit.ts]
class C {
    static s = C.#method();
    static #method() { return 42; }
}

console.log(C.s);


//// [privateNameStaticMethodInStaticFieldInit.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _C_method;
class C {
}
_a = C, _C_method = function _C_method() { return 42; };
C.s = __classPrivateFieldGet(C, _a, "m", _C_method).call(C);
console.log(C.s);
