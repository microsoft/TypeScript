// @target: es2015

const C = class D {
    static #field = D.#method();
    static #method() { return 42; }
    static getClass() { return D; }
    static getField() { return C.#field };
}

console.log(C.getClass().getField());
C.getClass().#method; // Error
C.getClass().#field; // Error

