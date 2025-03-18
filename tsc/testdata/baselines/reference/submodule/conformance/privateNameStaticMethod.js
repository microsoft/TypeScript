//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethod.ts] ////

//// [privateNameStaticMethod.ts]
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


//// [privateNameStaticMethod.js]
class A1 {
    static #method(param) {
        return "";
    }
    constructor() {
        A1.#method("");
        A1.#method(1);
        A1.#method();
    }
}
