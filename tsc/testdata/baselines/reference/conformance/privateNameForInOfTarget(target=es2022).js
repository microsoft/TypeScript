//// [tests/cases/conformance/classes/members/privateNames/privateNameForInOfTarget.ts] ////

//// [privateNameForInOfTarget.ts]
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

    async asyncTargets() {
        for await (this.#x of [1, 2]) {}
        for await ([this.#x, this.#y] of [[3, 4]]) {}
        for await ({ x: this.#x } of [{ x: 5 }]) {}
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

class Ordering {
    #x = 0;

    static assignment() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        [o, get().#x] = [b, 7];
        return [a.#x, b.#x];
    }

    static loop() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for ([o, get().#x] of [[b, 7] as [Ordering, number]]) {}
        return [a.#x, b.#x];
    }

    static objectLoop() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for ({ o, x: get().#x } of [{ o: b, x: 7 }]) {}
        return [a.#x, b.#x];
    }

    static async asyncLoop() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for await ([o, get().#x] of [[b, 7] as [Ordering, number]]) {}
        return [a.#x, b.#x];
    }
}

function assertResult(actual: unknown, expected: unknown) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}

assertResult(Ordering.assignment(), [0, 7]);
assertResult(Ordering.loop(), [0, 7]);
assertResult(Ordering.objectLoop(), [0, 7]);
Promise.all([new A().asyncTargets(), Ordering.asyncLoop()]).then(([targets, ordering]) => {
    assertResult(targets, [5, 4]);
    assertResult(ordering, [0, 7]);
    console.log("private loop targets: direct/destructured async and receiver ordering passed");
});


//// [privateNameForInOfTarget.js]
"use strict";
class A {
    #x = 0;
    #y = 0;
    set #accessor(value) { this.#y = value; }
    get #accessor() { return this.#y; }
    run(o) {
        for (this.#x of [11]) { }
        for (this.#x in o) { }
        return this.#x;
    }
    receiver(o) {
        let calls = 0;
        const get = () => { calls++; return o; };
        for (get().#x of [10, 20]) { }
        for (o.#x in { k: 1 }) { }
        return { calls, value: o.#x };
    }
    accessor() {
        for (this.#accessor of [1, 2, 3]) { }
        return this.#accessor;
    }
    pattern() {
        for ([this.#x, this.#y] of [[1, 2]]) { }
        for ({ x: this.#x, y: this.#y } of [{ x: 3, y: 4 }]) { }
        return [this.#x, this.#y];
    }
    async asyncTargets() {
        for await (this.#x of [1, 2]) { }
        for await ([this.#x, this.#y] of [[3, 4]]) { }
        for await ({ x: this.#x } of [{ x: 5 }]) { }
        return [this.#x, this.#y];
    }
    shadow(o) {
        for (o.#x of [5]) {
            let o;
        }
        for (o.#y in { k: 1 }) {
            let o;
        }
        return [o.#x, o.#y];
    }
}
class B {
    static #x = 0;
    static run() {
        for (B.#x of [1, 2]) { }
        return B.#x;
    }
}
class Ordering {
    #x = 0;
    static assignment() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        [o, get().#x] = [b, 7];
        return [a.#x, b.#x];
    }
    static loop() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for ([o, get().#x] of [[b, 7]]) { }
        return [a.#x, b.#x];
    }
    static objectLoop() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for ({ o, x: get().#x } of [{ o: b, x: 7 }]) { }
        return [a.#x, b.#x];
    }
    static async asyncLoop() {
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for await ([o, get().#x] of [[b, 7]]) { }
        return [a.#x, b.#x];
    }
}
function assertResult(actual, expected) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}
assertResult(Ordering.assignment(), [0, 7]);
assertResult(Ordering.loop(), [0, 7]);
assertResult(Ordering.objectLoop(), [0, 7]);
Promise.all([new A().asyncTargets(), Ordering.asyncLoop()]).then(([targets, ordering]) => {
    assertResult(targets, [5, 4]);
    assertResult(ordering, [0, 7]);
    console.log("private loop targets: direct/destructured async and receiver ordering passed");
});
