//// [tests/cases/compiler/privateNameWrappedAssignmentTarget.ts] ////

//// [privateNameWrappedAssignmentTarget.ts]
// A private name target wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is
// still a reference, and must be lowered like the bare target.

declare function other(): C;

class C {
    #x: any = 0;
    static #s: any = 0;
    get #a(): any { return 0; }
    set #a(v: any) {}

    destructuring(arr: any[], obj: any) {
        [(this.#x)] = arr;
        [this.#x!] = arr;
        [(this.#x as any)] = arr;
        [(this.#x satisfies any)] = arr;
        [(<any>this.#x)] = arr;
        [((this.#x))] = arr;
        ({ a: (this.#x) } = obj);
        ({ a: this.#x! } = obj);
        ({ a: (this.#x as any) } = obj);
        [(this.#x) = 1] = arr;
        ({ a: (this.#x as any) = 2 } = obj);
        [, ...(this.#x)] = arr;
        ({ ...(this.#x as any) } = obj);
        [[(this.#x)]] = arr;
        [(other().#x)] = arr;
        [(C.#s)] = arr;
        ({ a: (this.#a as any) } = obj);
    }

    update() {
        (this.#x as any)++;
        --(this.#x as any);
        this.#x!++;
        ++this.#x!;
        (this.#x satisfies any)--;
        (<any>this.#x)++;
        ((this.#x) as any)++;
        const v = (this.#x as any)++;
        (other().#x as any)++;
        (C.#s as any)++;
        (this.#a as any)++;
    }
}


//// [privateNameWrappedAssignmentTarget.js]
"use strict";
// A private name target wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is
// still a reference, and must be lowered like the bare target.
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
var _C_instances, _a, _C_x, _C_s, _C_a_get, _C_a_set;
class C {
    constructor() {
        _C_instances.add(this);
        _C_x.set(this, 0);
    }
    destructuring(arr, obj) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        _b = this, [({ set value(_t) { __classPrivateFieldSet(_b, _C_x, _t, "f"); } }).value] = arr;
        _c = this, [({ set value(_t) { __classPrivateFieldSet(_c, _C_x, _t, "f"); } }).value] = arr;
        _d = this, [({ set value(_t) { __classPrivateFieldSet(_d, _C_x, _t, "f"); } }).value] = arr;
        _e = this, [({ set value(_t) { __classPrivateFieldSet(_e, _C_x, _t, "f"); } }).value] = arr;
        _f = this, [({ set value(_t) { __classPrivateFieldSet(_f, _C_x, _t, "f"); } }).value] = arr;
        _g = this, [({ set value(_t) { __classPrivateFieldSet(_g, _C_x, _t, "f"); } }).value] = arr;
        (_h = this, { a: ({ set value(_t) { __classPrivateFieldSet(_h, _C_x, _t, "f"); } }).value } = obj);
        (_j = this, { a: ({ set value(_t) { __classPrivateFieldSet(_j, _C_x, _t, "f"); } }).value } = obj);
        (_k = this, { a: ({ set value(_t) { __classPrivateFieldSet(_k, _C_x, _t, "f"); } }).value } = obj);
        _l = this, [({ set value(_t) { __classPrivateFieldSet(_l, _C_x, _t, "f"); } }).value = 1] = arr;
        (_m = this, { a: ({ set value(_t) { __classPrivateFieldSet(_m, _C_x, _t, "f"); } }).value = 2 } = obj);
        _o = this, [, ...({ set value(_t) { __classPrivateFieldSet(_o, _C_x, _t, "f"); } }).value] = arr;
        (_p = this, { ...({ set value(_t) { __classPrivateFieldSet(_p, _C_x, _t, "f"); } }).value } = obj);
        _q = this, [[({ set value(_t) { __classPrivateFieldSet(_q, _C_x, _t, "f"); } }).value]] = arr;
        _r = other(), [({ set value(_t) { __classPrivateFieldSet(_r, _C_x, _t, "f"); } }).value] = arr;
        [({ set value(_t) { __classPrivateFieldSet(_a, _a, _t, "f", _C_s); } }).value] = arr;
        (_s = this, { a: ({ set value(_t) { __classPrivateFieldSet(_s, _C_instances, _t, "a", _C_a_set); } }).value } = obj);
    }
    update() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        __classPrivateFieldSet(this, _C_x, (_b = __classPrivateFieldGet(this, _C_x, "f"), _b++, _b), "f");
        __classPrivateFieldSet(this, _C_x, (_c = __classPrivateFieldGet(this, _C_x, "f"), --_c), "f");
        __classPrivateFieldSet(this, _C_x, (_d = __classPrivateFieldGet(this, _C_x, "f"), _d++, _d), "f");
        __classPrivateFieldSet(this, _C_x, (_e = __classPrivateFieldGet(this, _C_x, "f"), ++_e), "f");
        __classPrivateFieldSet(this, _C_x, (_f = __classPrivateFieldGet(this, _C_x, "f"), _f--, _f), "f");
        __classPrivateFieldSet(this, _C_x, (_g = __classPrivateFieldGet(this, _C_x, "f"), _g++, _g), "f");
        __classPrivateFieldSet(this, _C_x, (_h = __classPrivateFieldGet(this, _C_x, "f"), _h++, _h), "f");
        const v = (__classPrivateFieldSet(this, _C_x, (_k = __classPrivateFieldGet(this, _C_x, "f"), _j = _k++, _k), "f"), _j);
        __classPrivateFieldSet(_l = other(), _C_x, (_m = __classPrivateFieldGet(_l, _C_x, "f"), _m++, _m), "f");
        __classPrivateFieldSet(_o = _a, _a, (_p = __classPrivateFieldGet(_o, _a, "f", _C_s), _p++, _p), "f", _C_s);
        __classPrivateFieldSet(this, _C_instances, (_q = __classPrivateFieldGet(this, _C_instances, "a", _C_a_get), _q++, _q), "a", _C_a_set);
    }
}
_a = C, _C_x = new WeakMap(), _C_instances = new WeakSet(), _C_a_get = function _C_a_get() { return 0; }, _C_a_set = function _C_a_set(v) { };
_C_s = { value: 0 };
