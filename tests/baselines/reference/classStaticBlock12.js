//// [classStaticBlock12.ts]
class C {
  static #x = 1;
  
  static {
    C.#x;
  }
}


//// [classStaticBlock12.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _C_x;
class C {
}
_a = C;
_C_x = { value: 1 };
(() => {
    __classPrivateFieldGet(C, _a, "f", _C_x);
})();
