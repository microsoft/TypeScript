//// [tests/cases/conformance/classes/members/privateNames/privateNameAndObjectRestSpread.ts] ////

//// [privateNameAndObjectRestSpread.ts]
class C {
    #prop = 1;
    static #propStatic = 1;

    method(other: C) {
        const obj = { ...other };
        obj.#prop;
        const { ...rest } = other;
        rest.#prop;

        const statics = { ... C};
        statics.#propStatic
        const { ...sRest } = C;
        sRest.#propStatic;
    }
}

//// [privateNameAndObjectRestSpread.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _C_prop, _C_propStatic;
class C {
    constructor() {
        _C_prop.set(this, 1);
    }
    method(other) {
        const obj = Object.assign({}, other);
        __classPrivateFieldGet(obj, _C_prop, "f");
        const rest = __rest(other, []);
        __classPrivateFieldGet(rest, _C_prop, "f");
        const statics = Object.assign({}, _a);
        __classPrivateFieldGet(statics, _a, "f", _C_propStatic);
        const sRest = __rest(_a, []);
        __classPrivateFieldGet(sRest, _a, "f", _C_propStatic);
    }
}
_a = C, _C_prop = new WeakMap();
_C_propStatic = { value: 1 };
