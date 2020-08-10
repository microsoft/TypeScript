// @strict: true
// @target: esnext
class Example {
    #test;

    constructor(test: number) {
        this.#test = test;
    }

    get test() {
        return this.#test
    }
}