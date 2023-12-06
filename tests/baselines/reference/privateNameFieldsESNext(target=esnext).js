//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldsESNext.ts] ////

//// [privateNameFieldsESNext.ts]
class C {
    a = 123;
    #a = 10;
    c = "hello";
    #b;
    method() {
        console.log(this.#a);
        this.#a = "hello";
        console.log(this.#b);
    }
    static #m = "test";
    static #x;
    static test() {
        console.log(this.#m);
        console.log(this.#x = "test");
    }
    #something = () => 1234;
}



//// [privateNameFieldsESNext.js]
class C {
    constructor() {
        this.a = 123;
        this.#a = 10;
        this.c = "hello";
        this.#something = () => 1234;
    }
    #a;
    #b;
    method() {
        console.log(this.#a);
        this.#a = "hello";
        console.log(this.#b);
    }
    static #m = "test";
    static #x;
    static test() {
        console.log(this.#m);
        console.log(this.#x = "test");
    }
    #something;
}
