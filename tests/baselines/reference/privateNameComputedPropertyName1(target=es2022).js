//// [tests/cases/conformance/classes/members/privateNames/privateNameComputedPropertyName1.ts] ////

//// [privateNameComputedPropertyName1.ts]
class A {
    #a = 'a';
    #b: string;

    readonly #c = 'c';
    readonly #d: string;

    #e = '';

    constructor() {
        this.#b = 'b';
        this.#d = 'd';
    }

    test() {
        const data: Record<string, string> = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
        const {
            [this.#a]: a,
            [this.#b]: b,
            [this.#c]: c,
            [this.#d]: d,
            [this.#e = 'e']: e,
        } = data;
        console.log(a, b, c, d, e);

        const a1 = data[this.#a];
        const b1 = data[this.#b];
        const c1 = data[this.#c];
        const d1 = data[this.#d];
        const e1 = data[this.#e];
        console.log(a1, b1, c1, d1);
    }
}

new A().test();



//// [privateNameComputedPropertyName1.js]
class A {
    #a = 'a';
    #b;
    #c = 'c';
    #d;
    #e = '';
    constructor() {
        this.#b = 'b';
        this.#d = 'd';
    }
    test() {
        const data = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
        const { [this.#a]: a, [this.#b]: b, [this.#c]: c, [this.#d]: d, [this.#e = 'e']: e, } = data;
        console.log(a, b, c, d, e);
        const a1 = data[this.#a];
        const b1 = data[this.#b];
        const c1 = data[this.#c];
        const d1 = data[this.#d];
        const e1 = data[this.#e];
        console.log(a1, b1, c1, d1);
    }
}
new A().test();
