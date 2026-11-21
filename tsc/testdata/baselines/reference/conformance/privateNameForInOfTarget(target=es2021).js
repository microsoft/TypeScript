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
var _A_instances, _A_x, _A_y, _A_accessor_set, _A_accessor_get, _a, _B_x, _Ordering_x;
class A {
    constructor() {
        _A_instances.add(this);
        _A_x.set(this, 0);
        _A_y.set(this, 0);
    }
    run(o) {
        for (let _b of [11]) {
            __classPrivateFieldSet(this, _A_x, _b, "f");
            { }
        }
        for (let _c in o) {
            __classPrivateFieldSet(this, _A_x, _c, "f");
            { }
        }
        return __classPrivateFieldGet(this, _A_x, "f");
    }
    receiver(o) {
        let calls = 0;
        const get = () => { calls++; return o; };
        for (let _b of [10, 20]) {
            __classPrivateFieldSet(get(), _A_x, _b, "f");
            { }
        }
        for (let _c in { k: 1 }) {
            __classPrivateFieldSet(o, _A_x, _c, "f");
            { }
        }
        return { calls, value: __classPrivateFieldGet(o, _A_x, "f") };
    }
    accessor() {
        for (let _b of [1, 2, 3]) {
            __classPrivateFieldSet(this, _A_instances, _b, "a", _A_accessor_set);
            { }
        }
        return __classPrivateFieldGet(this, _A_instances, "a", _A_accessor_get);
    }
    pattern() {
        var _b, _c, _d, _e;
        for (let _f of [[1, 2]]) {
            [(_b = this, ({ set value(_f) { __classPrivateFieldSet(_b, _A_x, _f, "f"); } })).value, (_c = this, ({ set value(_f) { __classPrivateFieldSet(_c, _A_y, _f, "f"); } })).value] = _f;
            { }
        }
        for (let _g of [{ x: 3, y: 4 }]) {
            ({ x: (_d = this, ({ set value(_f) { __classPrivateFieldSet(_d, _A_x, _f, "f"); } })).value, y: (_e = this, ({ set value(_f) { __classPrivateFieldSet(_e, _A_y, _f, "f"); } })).value } = _g);
            { }
        }
        return [__classPrivateFieldGet(this, _A_x, "f"), __classPrivateFieldGet(this, _A_y, "f")];
    }
    async asyncTargets() {
        var _b, _c, _d;
        for await (let _e of [1, 2]) {
            __classPrivateFieldSet(this, _A_x, _e, "f");
            { }
        }
        for await (let _f of [[3, 4]]) {
            [(_b = this, ({ set value(_e) { __classPrivateFieldSet(_b, _A_x, _e, "f"); } })).value, (_c = this, ({ set value(_e) { __classPrivateFieldSet(_c, _A_y, _e, "f"); } })).value] = _f;
            { }
        }
        for await (let _g of [{ x: 5 }]) {
            ({ x: (_d = this, ({ set value(_e) { __classPrivateFieldSet(_d, _A_x, _e, "f"); } })).value } = _g);
            { }
        }
        return [__classPrivateFieldGet(this, _A_x, "f"), __classPrivateFieldGet(this, _A_y, "f")];
    }
    shadow(o) {
        for (let _b of [5]) {
            __classPrivateFieldSet(o, _A_x, _b, "f");
            {
                let o;
            }
        }
        for (let _c in { k: 1 }) {
            __classPrivateFieldSet(o, _A_y, _c, "f");
            {
                let o;
            }
        }
        return [__classPrivateFieldGet(o, _A_x, "f"), __classPrivateFieldGet(o, _A_y, "f")];
    }
}
_A_x = new WeakMap(), _A_y = new WeakMap(), _A_instances = new WeakSet(), _A_accessor_set = function _A_accessor_set(value) { __classPrivateFieldSet(this, _A_y, value, "f"); }, _A_accessor_get = function _A_accessor_get() { return __classPrivateFieldGet(this, _A_y, "f"); };
class B {
    static run() {
        for (let _b of [1, 2]) {
            __classPrivateFieldSet(_a, _a, _b, "f", _B_x);
            { }
        }
        return __classPrivateFieldGet(_a, _a, "f", _B_x);
    }
}
_a = B;
_B_x = { value: 0 };
class Ordering {
    constructor() {
        _Ordering_x.set(this, 0);
    }
    static assignment() {
        var _b;
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        [o, (_b = get(), ({ set value(_c) { __classPrivateFieldSet(_b, _Ordering_x, _c, "f"); } })).value] = [b, 7];
        return [__classPrivateFieldGet(a, _Ordering_x, "f"), __classPrivateFieldGet(b, _Ordering_x, "f")];
    }
    static loop() {
        var _b;
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for (let _c of [[b, 7]]) {
            [o, (_b = get(), ({ set value(_c) { __classPrivateFieldSet(_b, _Ordering_x, _c, "f"); } })).value] = _c;
            { }
        }
        return [__classPrivateFieldGet(a, _Ordering_x, "f"), __classPrivateFieldGet(b, _Ordering_x, "f")];
    }
    static objectLoop() {
        var _b;
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for (let _c of [{ o: b, x: 7 }]) {
            ({ o, x: (_b = get(), ({ set value(_c) { __classPrivateFieldSet(_b, _Ordering_x, _c, "f"); } })).value } = _c);
            { }
        }
        return [__classPrivateFieldGet(a, _Ordering_x, "f"), __classPrivateFieldGet(b, _Ordering_x, "f")];
    }
    static async asyncLoop() {
        var _b;
        const a = new Ordering();
        const b = new Ordering();
        let o = a;
        const get = () => o;
        for await (let _c of [[b, 7]]) {
            [o, (_b = get(), ({ set value(_c) { __classPrivateFieldSet(_b, _Ordering_x, _c, "f"); } })).value] = _c;
            { }
        }
        return [__classPrivateFieldGet(a, _Ordering_x, "f"), __classPrivateFieldGet(b, _Ordering_x, "f")];
    }
}
_Ordering_x = new WeakMap();
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
