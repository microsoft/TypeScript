//// [privateNameAndObjectRestSpread.ts]
class C {
    #prop = 1;

    method(other: C) {
        const obj = { ...other };
        obj.#prop;
        const { ...rest } = other;
        rest.#prop;
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
var _prop;
class C {
    constructor() {
        _prop.set(this, 1);
    }
    method(other) {
        const obj = Object.assign({}, other);
        __classPrivateFieldGet(obj, _prop);
        const rest = __rest(other, []);
        __classPrivateFieldGet(rest, _prop);
    }
}
_prop = new WeakMap();
