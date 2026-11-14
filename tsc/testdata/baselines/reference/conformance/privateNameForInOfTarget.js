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
var _A_instances, _A_x, _A_y, _A_accessor_set, _A_accessor_get, _a, _B_x;
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
            _b = this, _c = this, [({ set value(_f) { __classPrivateFieldSet(_b, _A_x, _f, "f"); } }).value, ({ set value(_f) { __classPrivateFieldSet(_c, _A_y, _f, "f"); } }).value] = _f;
            { }
        }
        for (let _g of [{ x: 3, y: 4 }]) {
            _d = this, _e = this, { x: ({ set value(_f) { __classPrivateFieldSet(_d, _A_x, _f, "f"); } }).value, y: ({ set value(_f) { __classPrivateFieldSet(_e, _A_y, _f, "f"); } }).value } = _g;
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
