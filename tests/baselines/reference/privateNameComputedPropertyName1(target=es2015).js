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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_a, _A_b, _A_c, _A_d, _A_e;
class A {
    constructor() {
        _A_a.set(this, 'a');
        _A_b.set(this, void 0);
        _A_c.set(this, 'c');
        _A_d.set(this, void 0);
        _A_e.set(this, '');
        __classPrivateFieldSet(this, _A_b, 'b');
        __classPrivateFieldSet(this, _A_d, 'd');
    }
    test() {
        const data = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
        const { [__classPrivateFieldGet(this, _A_a)]: a, [__classPrivateFieldGet(this, _A_b)]: b, [__classPrivateFieldGet(this, _A_c)]: c, [__classPrivateFieldGet(this, _A_d)]: d, [__classPrivateFieldSet(this, _A_e, 'e')]: e, } = data;
        console.log(a, b, c, d, e);
        const a1 = data[__classPrivateFieldGet(this, _A_a)];
        const b1 = data[__classPrivateFieldGet(this, _A_b)];
        const c1 = data[__classPrivateFieldGet(this, _A_c)];
        const d1 = data[__classPrivateFieldGet(this, _A_d)];
        const e1 = data[__classPrivateFieldGet(this, _A_e)];
        console.log(a1, b1, c1, d1);
    }
}
_A_a = new WeakMap(), _A_b = new WeakMap(), _A_c = new WeakMap(), _A_d = new WeakMap(), _A_e = new WeakMap();
new A().test();
