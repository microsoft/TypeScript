// @target: es2015

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
  