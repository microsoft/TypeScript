// @target: es2015

class C {
    static s = C.#method();
    static #method() { return 42; }
}

console.log(C.s);
