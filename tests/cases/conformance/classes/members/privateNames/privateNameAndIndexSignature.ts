// @strict: true
// @target es6

class A {
    [k: string]: any;
    constructor(message: string) {
        this.#f = 3                 // Error Property '#f' does not exist on type 'A'.
    }
}
