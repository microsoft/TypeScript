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
class X {
    static #f = X.#m();
    constructor() {
        X.#m();
    }
    static #m() {
        const X = {}; // shadow the class
        const _a = {}; // shadow the first generated var
        X.#m(); // Should check with X as the receiver with _b as the class constructor 
        return 1;
    }
}
