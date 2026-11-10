// @target: es2017

class A {
    #x: any = 0;
    #y: any = 0;
    set #accessor(value: any) { this.#y = value; }
    get #accessor() { return this.#y; }

    run(o: object) {
        for (this.#x of [11]) {}
        for (this.#x in o) {}
        return this.#x;
    }

    receiver(o: A) {
        let calls = 0;
        const get = () => { calls++; return o; };
        for (get().#x of [10, 20]) {}
        for (o.#x in { k: 1 }) {}
        return { calls, value: o.#x };
    }

    accessor() {
        for (this.#accessor of [1, 2, 3]) {}
        return this.#accessor;
    }

    pattern() {
        for ([this.#x, this.#y] of [[1, 2]]) {}
        for ({ x: this.#x, y: this.#y } of [{ x: 3, y: 4 }]) {}
        return [this.#x, this.#y];
    }

    shadow(o: A) {
        for (o.#x of [5]) {
            let o: A;
        }
        for (o.#y in { k: 1 }) {
            let o: A;
        }
        return [o.#x, o.#y];
    }
}

class B {
    static #x: any = 0;

    static run() {
        for (B.#x of [1, 2]) {}
        return B.#x;
    }
}
