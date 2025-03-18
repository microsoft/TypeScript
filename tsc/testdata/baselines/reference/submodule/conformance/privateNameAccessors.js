//// [tests/cases/conformance/classes/members/privateNames/privateNameAccessors.ts] ////

//// [privateNameAccessors.ts]
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


//// [privateNameAccessors.js]
class A1 {
    get #prop() { return ""; }
    set #prop(param) { }
    get #roProp() { return ""; }
    constructor(name) {
        this.#prop = "";
        this.#roProp = "";
        console.log(this.#prop);
        console.log(this.#roProp);
    }
}
