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
var _a, _b, _c, _d, _e;
class A {
    constructor() {
        _a.set(this, 'a');
        _b.set(this, void 0);
        _c.set(this, 'c');
        _d.set(this, void 0);
        _e.set(this, '');
        __classPrivateFieldSet(this, _b, 'b');
        __classPrivateFieldSet(this, _d, 'd');
    }
    test() {
        const data = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
        const { [__classPrivateFieldGet(this, _a)]: a, [__classPrivateFieldGet(this, _b)]: b, [__classPrivateFieldGet(this, _c)]: c, [__classPrivateFieldGet(this, _d)]: d, [__classPrivateFieldSet(this, _e, 'e')]: e, } = data;
        console.log(a, b, c, d, e);
        const a1 = data[__classPrivateFieldGet(this, _a)];
        const b1 = data[__classPrivateFieldGet(this, _b)];
        const c1 = data[__classPrivateFieldGet(this, _c)];
        const d1 = data[__classPrivateFieldGet(this, _d)];
        const e1 = data[__classPrivateFieldGet(this, _e)];
        console.log(a1, b1, c1, d1);
    }
}
_a = new WeakMap(), _b = new WeakMap(), _c = new WeakMap(), _d = new WeakMap(), _e = new WeakMap();
new A().test();
