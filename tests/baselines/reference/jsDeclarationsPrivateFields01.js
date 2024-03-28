//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsPrivateFields01.ts] ////

//// [file.js]
export class C {
    #hello = "hello";
    #world = 100;

    #calcHello() {
        return this.#hello;
    }

    get #screamingHello() {
        return this.#hello.toUpperCase();
    }
    /** @param value {string} */
    set #screamingHello(value) {
        throw "NO";
    }

    getWorld() {
        return this.#world;
    }
}




//// [file.d.ts]
export class C {
    getWorld(): number;
    #private;
}
