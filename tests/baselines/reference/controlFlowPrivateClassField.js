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
