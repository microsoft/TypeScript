//// [tests/cases/compiler/privateAccessorLogicalAssignment.ts] ////

//// [privateAccessorLogicalAssignment.ts]
const log: string[] = [];
function rhs() {
    log.push("rhs");
    return 2;
}

class C {
    value: number | null | undefined = 0;
    get #f() {
        log.push("get");
        return this.value;
    }
    set #f(value: number | null | undefined) {
        log.push("set " + value);
        this.value = value;
    }
    and() {
        return this.#f &&= rhs();
    }
    or() {
        return (this.#f) ||= rhs();
    }
    coalesce() {
        return (this.#f as number | null | undefined) ??= rhs();
    }
    static and(receiver: () => C) {
        return receiver().#f &&= rhs();
    }
    static or(receiver: () => C) {
        return receiver().#f ||= rhs();
    }
    static coalesce(receiver: () => C) {
        return receiver().#f ??= rhs();
    }
    static andIdentifier(receiver: C) {
        return receiver.#f &&= rhs();
    }
}

class S {
    static value: number | null | undefined = 0;
    static get #f() {
        log.push("get");
        return this.value;
    }
    static set #f(value: number | null | undefined) {
        log.push("set " + value);
        this.value = value;
    }
    static and() {
        return this.#f &&= rhs();
    }
    static or() {
        return this.#f ||= rhs();
    }
    static coalesce() {
        return this.#f ??= rhs();
    }
}

class ReadOnly {
    get #f() { return 0; }
    #m() {}
    run() {
        // @ts-expect-error
        this.#f &&= rhs();
        // @ts-expect-error
        this.#m ||= rhs();
        // @ts-expect-error
        this.#m ??= rhs();
    }
}


//// [privateAccessorLogicalAssignment.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_instances, _C_f_get, _C_f_set, _a, _S_f_get, _S_f_set, _ReadOnly_instances, _ReadOnly_f_get, _ReadOnly_m;
const log = [];
function rhs() {
    log.push("rhs");
    return 2;
}
class C {
    constructor() {
        _C_instances.add(this);
        this.value = 0;
    }
    and() {
        return __classPrivateFieldSet(this, _C_instances, __classPrivateFieldGet(this, _C_instances, "a", _C_f_get) && rhs(), "a", _C_f_set);
    }
    or() {
        return __classPrivateFieldSet(this, _C_instances, __classPrivateFieldGet(this, _C_instances, "a", _C_f_get) || rhs(), "a", _C_f_set);
    }
    coalesce() {
        var _b;
        return __classPrivateFieldSet(this, _C_instances, (_b = __classPrivateFieldGet(this, _C_instances, "a", _C_f_get)) !== null && _b !== void 0 ? _b : rhs(), "a", _C_f_set);
    }
    static and(receiver) {
        var _b;
        return __classPrivateFieldSet(_b = receiver(), _C_instances, __classPrivateFieldGet(_b, _C_instances, "a", _C_f_get) && rhs(), "a", _C_f_set);
    }
    static or(receiver) {
        var _b;
        return __classPrivateFieldSet(_b = receiver(), _C_instances, __classPrivateFieldGet(_b, _C_instances, "a", _C_f_get) || rhs(), "a", _C_f_set);
    }
    static coalesce(receiver) {
        var _b;
        var _c;
        return __classPrivateFieldSet(_c = receiver(), _C_instances, (_b = __classPrivateFieldGet(_c, _C_instances, "a", _C_f_get)) !== null && _b !== void 0 ? _b : rhs(), "a", _C_f_set);
    }
    static andIdentifier(receiver) {
        var _b;
        return __classPrivateFieldSet(_b = receiver, _C_instances, __classPrivateFieldGet(_b, _C_instances, "a", _C_f_get) && rhs(), "a", _C_f_set);
    }
}
_C_instances = new WeakSet(), _C_f_get = function _C_f_get() {
    log.push("get");
    return this.value;
}, _C_f_set = function _C_f_set(value) {
    log.push("set " + value);
    this.value = value;
};
class S {
    static and() {
        return __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "a", _S_f_get) && rhs(), "a", _S_f_set);
    }
    static or() {
        return __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "a", _S_f_get) || rhs(), "a", _S_f_set);
    }
    static coalesce() {
        var _b;
        return __classPrivateFieldSet(this, _a, (_b = __classPrivateFieldGet(this, _a, "a", _S_f_get)) !== null && _b !== void 0 ? _b : rhs(), "a", _S_f_set);
    }
}
_a = S, _S_f_get = function _S_f_get() {
    log.push("get");
    return this.value;
}, _S_f_set = function _S_f_set(value) {
    log.push("set " + value);
    this.value = value;
};
S.value = 0;
class ReadOnly {
    constructor() {
        _ReadOnly_instances.add(this);
    }
    run() {
        var _b;
        // @ts-expect-error
        __classPrivateFieldSet(this, _ReadOnly_instances, __classPrivateFieldGet(this, _ReadOnly_instances, "a", _ReadOnly_f_get) && rhs(), "a");
        // @ts-expect-error
        __classPrivateFieldSet(this, _ReadOnly_instances, __classPrivateFieldGet(this, _ReadOnly_instances, "m", _ReadOnly_m) || rhs(), "m");
        // @ts-expect-error
        __classPrivateFieldSet(this, _ReadOnly_instances, (_b = __classPrivateFieldGet(this, _ReadOnly_instances, "m", _ReadOnly_m)) !== null && _b !== void 0 ? _b : rhs(), "m");
    }
}
_ReadOnly_instances = new WeakSet(), _ReadOnly_f_get = function _ReadOnly_f_get() { return 0; }, _ReadOnly_m = function _ReadOnly_m() { };
