//// [tests/cases/conformance/classes/members/privateNames/privateStaticNameShadowing.ts] ////

//// [privateStaticNameShadowing.ts]
class X {
    static #f = X.#m();
    constructor() {
      X.#m();
    }
    static #m() {
      const X: any = {}; // shadow the class
      const _a: any = {}; // shadow the first generated var
      X.#m(); // Should check with X as the receiver with _b as the class constructor 
      return 1;
    }
  }
  

//// [privateStaticNameShadowing.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _b, _X_f, _X_m;
class X {
    constructor() {
        __classPrivateFieldGet(_b, _b, "m", _X_m).call(_b);
    }
}
_b = X, _X_m = function _X_m() {
    const X = {}; // shadow the class
    const _a = {}; // shadow the first generated var
    __classPrivateFieldGet(X, _b, "m", _X_m).call(X); // Should check with X as the receiver with _b as the class constructor 
    return 1;
};
_X_f = { value: __classPrivateFieldGet(_b, _b, "m", _X_m).call(_b) };
