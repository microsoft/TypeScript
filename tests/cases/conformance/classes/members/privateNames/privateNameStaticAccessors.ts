// @strict: true
// @target: es6

class A1 {
    static get #prop() { return ""; }
    static set #prop(param: string) { }

    static get #roProp() { return ""; }

    constructor(name: string) {
        A1.#prop = "";
        A1.#roProp = ""; // Error
        console.log(A1.#prop);
        console.log(A1.#roProp);
    }
}
