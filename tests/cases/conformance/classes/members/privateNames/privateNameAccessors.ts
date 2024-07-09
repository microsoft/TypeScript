// @strict: true
// @target: es6

class A1 {
    get #prop() { return ""; }
    set #prop(param: string) { }

    get #roProp() { return ""; }

    constructor(name: string) {
        this.#prop = "";
        this.#roProp = ""; // Error
        console.log(this.#prop);
        console.log(this.#roProp);
    }
}
