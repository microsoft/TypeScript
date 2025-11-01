//// [tests/cases/conformance/classes/members/privateNames/privateNameEmitHelpers.ts] ////

//// [main.ts]
export class C {
    #a = 1;
    #b() { this.#c = 42; }
    set #c(v: number) { this.#a += v; }
}

//// [tslib.d.ts]
// these are pre-TS4.3 versions of emit helpers, which only supported private instance fields
export declare function __classPrivateFieldGet<T extends object, V>(receiver: T, state: any): V;
export declare function __classPrivateFieldSet<T extends object, V>(receiver: T, state: any, value: V): V;


//// [main.js]
var _C_instances, _C_a, _C_b, _C_c_set;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
export class C {
    constructor() {
        _C_instances.add(this);
        _C_a.set(this, 1);
    }
}
_C_a = new WeakMap(), _C_instances = new WeakSet(), _C_b = function _C_b() { __classPrivateFieldSet(this, _C_instances, 42, "a", _C_c_set); }, _C_c_set = function _C_c_set(v) { __classPrivateFieldSet(this, _C_a, __classPrivateFieldGet(this, _C_a, "f") + v, "f"); };
