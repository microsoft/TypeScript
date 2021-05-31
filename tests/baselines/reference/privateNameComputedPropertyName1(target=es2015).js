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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_a, _A_b, _A_c, _A_d, _A_e;
class A {
    constructor() {
        _A_a.set(this, 'a');
        _A_b.set(this, void 0);
        _A_c.set(this, 'c');
        _A_d.set(this, void 0);
        _A_e.set(this, '');
        __classPrivateFieldSet(this, _A_b, 'b', "f");
        __classPrivateFieldSet(this, _A_d, 'd', "f");
    }
    test() {
        const data = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' };
        const { [__classPrivateFieldGet(this, _A_a, "f")]: a, [__classPrivateFieldGet(this, _A_b, "f")]: b, [__classPrivateFieldGet(this, _A_c, "f")]: c, [__classPrivateFieldGet(this, _A_d, "f")]: d, [__classPrivateFieldSet(this, _A_e, 'e', "f")]: e, } = data;
        console.log(a, b, c, d, e);
        const a1 = data[__classPrivateFieldGet(this, _A_a, "f")];
        const b1 = data[__classPrivateFieldGet(this, _A_b, "f")];
        const c1 = data[__classPrivateFieldGet(this, _A_c, "f")];
        const d1 = data[__classPrivateFieldGet(this, _A_d, "f")];
        const e1 = data[__classPrivateFieldGet(this, _A_e, "f")];
        console.log(a1, b1, c1, d1);
    }
}
_A_a = new WeakMap(), _A_b = new WeakMap(), _A_c = new WeakMap(), _A_d = new WeakMap(), _A_e = new WeakMap();
new A().test();
