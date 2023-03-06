// @strict: true
// @target: esnext
// @useDefineForClassFields: false
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