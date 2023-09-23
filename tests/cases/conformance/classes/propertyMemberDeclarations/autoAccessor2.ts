// @target: esnext, es2022, es2015

class C1 {
    accessor #a: any;
    accessor #b = 1;
    static accessor #c: any;
    static accessor #d = 2;

    constructor() {
        this.#a = 3;
        this.#b = 4;
    }

    static {
        this.#c = 5;
        this.#d = 6;
    }
}
