//// [classIndexer5.ts]
class Foo {
    [key: string]: number;

    #a: boolean;
    #b = false;
}


//// [classIndexer5.js]
class Foo {
    constructor() {
        this.#b = false;
    }
    #a;
    #b;
}
