// @target: esnext
// @allowJS: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: file.js
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
