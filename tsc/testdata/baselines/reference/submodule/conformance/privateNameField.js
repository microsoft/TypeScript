//// [tests/cases/conformance/classes/members/privateNames/privateNameField.ts] ////

//// [privateNameField.ts]
class A {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
}


//// [privateNameField.js]
class A {
    #name;
    constructor(name) {
        this.#name = name;
    }
}
