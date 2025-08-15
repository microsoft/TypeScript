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
class C {
    #prop = 1;
    static #propStatic = 1;
    method(other) {
        const obj = Object.assign({}, other);
        obj.#prop;
        const rest = __rest(other, []);
        rest.#prop;
        const statics = Object.assign({}, C);
        statics.#propStatic;
        const sRest = __rest(C, []);
        sRest.#propStatic;
    }
}
