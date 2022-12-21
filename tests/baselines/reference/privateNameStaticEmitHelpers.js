//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticEmitHelpers.ts] ////

//// [main.ts]
export class S {
    static #a = 1;
    static #b() { this.#a = 42; }
    static get #c() { return S.#b(); }
}

//// [tslib.d.ts]
// these are pre-TS4.3 versions of emit helpers, which only supported private instance fields
export declare function __classPrivateFieldGet<T extends object, V>(receiver: T, state: any): V;
export declare function __classPrivateFieldSet<T extends object, V>(receiver: T, state: any, value: V): V;


//// [main.js]
var _a, _S_a, _S_b, _S_c_get;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
export class S {
}
_a = S, _S_b = function _S_b() { __classPrivateFieldSet(this, _a, 42, "f", _S_a); }, _S_c_get = function _S_c_get() { return __classPrivateFieldGet(S, _a, "m", _S_b).call(S); };
_S_a = { value: 1 };
