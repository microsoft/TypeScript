// @strict: true
// @target: es6

class A1 {
    static #method(param: string): string {
        return "";
    }
    constructor() {
        A1.#method("")
        A1.#method(1) // Error
        A1.#method()  // Error 

    }
}
