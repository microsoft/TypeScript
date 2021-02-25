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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
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
var _C_prop, _C_propStatic;
class C {
    constructor() {
        _C_prop.set(this, 1);
    }
    method(other) {
        const obj = Object.assign({}, other);
        __classPrivateFieldGet(obj, _C_prop);
        const rest = __rest(other, []);
        __classPrivateFieldGet(rest, _C_prop);
        const statics = Object.assign({}, C);
        __classStaticPrivateFieldGet(statics, C, _C_propStatic);
        const sRest = __rest(C, []);
        __classStaticPrivateFieldGet(sRest, C, _C_propStatic);
    }
}
_C_prop = new WeakMap();
_C_propStatic = { value: 1 };
