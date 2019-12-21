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
    "__#1@#hello": string;
    "__#1@#world": number;
    "__#1@#calcHello"(): string;
    /** @param value {string} */
    set "__#1@#screamingHello"(arg: string);
    get "__#1@#screamingHello"(): string;
    getWorld(): number;
}
