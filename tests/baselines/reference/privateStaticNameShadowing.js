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
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _b, _X_f, _X_m;
class X {
    constructor() {
        __classStaticPrivateMethodGet(X, _b, _X_m).call(X);
    }
}
_b = X, _X_m = function _X_m() {
    const X = {}; // shadow the class
    const _a = {}; // shadow the first generated var
    __classStaticPrivateMethodGet(X, _b, _X_m).call(// shadow the first generated var
    X); // Should check with X as the receiver with _b as the class constructor 
    return 1;
};
_X_f = { value: __classStaticPrivateMethodGet(X, _b, _X_m).call(X) };
