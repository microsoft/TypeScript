//// [controlFlowPrivateClassField.ts]
class Example {
    #test;

    constructor(test: number) {
        this.#test = test;
    }

    get test() {
        return this.#test
    }
}

class Example2 {
    #test;

    constructor(test: number | undefined) {
        this.#test = test;
    }

    get test() {
        if (this.#test) {
            return this.#test
        }
        return 0;
    }
}

//// [controlFlowPrivateClassField.js]
"use strict";
class Example {
    constructor(test) {
        this.#test = test;
    }
    #test;
    get test() {
        return this.#test;
    }
}
class Example2 {
    constructor(test) {
        this.#test = test;
    }
    #test;
    get test() {
        if (this.#test) {
            return this.#test;
        }
        return 0;
    }
}
