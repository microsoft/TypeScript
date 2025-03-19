//// [tests/cases/conformance/classes/members/privateNames/privateNameMethod.ts] ////

//// [privateNameMethod.ts]
class A1 {
    #method(param: string): string {
        return "";
    }
    constructor(name: string) {
        this.#method("")
        this.#method(1) // Error
        this.#method()  // Error 

    }
}


//// [privateNameMethod.js]
class A1 {
    #method(param) {
        return "";
    }
    constructor(name) {
        this.#method("");
        this.#method(1); // Error
        this.#method(); // Error 
    }
}
