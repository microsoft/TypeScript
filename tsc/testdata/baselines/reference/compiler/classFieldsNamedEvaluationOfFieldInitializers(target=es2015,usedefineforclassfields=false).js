//// [tests/cases/compiler/classFieldsNamedEvaluationOfFieldInitializers.ts] ////

//// [classFieldsNamedEvaluationOfFieldInitializers.ts]
// A function or class defined by a field initializer is named after the field (NamedEvaluation). A lowered
// field becomes an assignment, an `Object.defineProperty` call or a private-field initializer, none of which
// names it, so it must be named explicitly.

declare const k: "k";
declare const j: "j";
declare const i: "i";
declare const sym: unique symbol;

class C {
    f = function () {};
    g = () => {};
    c = class {};
    "s t" = () => {};
    1 = () => {};
    ["lit"] = () => {};
    [k] = () => {};
    [sym] = function () {};
    #p = () => {};
    static s = function () {};
    static [j] = () => {};
    static #sp = () => {};

    // A computed key is evaluated once, when the class is defined.
    [i] = class { static y = 1; };

    // Not anonymous function definitions: nothing to name.
    named = function named() {};
    conditional = Math.random() ? () => {} : undefined;
}


//// [classFieldsNamedEvaluationOfFieldInitializers.js]
"use strict";
// A function or class defined by a field initializer is named after the field (NamedEvaluation). A lowered
// field becomes an assignment, an `Object.defineProperty` call or a private-field initializer, none of which
// names it, so it must be named explicitly.
var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _C_p, _C_sp, _b, _c, _d, _e;
class C {
    constructor() {
        var _f, _g;
        this.f = __setFunctionName(function () { }, "f");
        this.g = __setFunctionName(() => { }, "g");
        this.c = (_f = class {
            },
            __setFunctionName(_f, "c"),
            _f);
        this["s t"] = __setFunctionName(() => { }, "s t");
        this[1] = __setFunctionName(() => { }, "1");
        this["lit"] = __setFunctionName(() => { }, "lit");
        this[_b] = __setFunctionName(() => { }, _b);
        this[_c] = __setFunctionName(function () { }, _c);
        _C_p.set(this, __setFunctionName(() => { }, "#p"));
        // A computed key is evaluated once, when the class is defined.
        this[_e] = (_g = class {
            },
            __setFunctionName(_g, _e),
            _g.y = 1,
            _g);
        // Not anonymous function definitions: nothing to name.
        this.named = function named() { };
        this.conditional = Math.random() ? () => { } : undefined;
    }
}
_a = C, _C_p = new WeakMap(), _b = __propKey(k), _c = __propKey(sym), _d = __propKey(j), _e = __propKey(i);
C.s = __setFunctionName(function () { }, "s");
C[_d] = __setFunctionName(() => { }, _d);
_C_sp = { value: __setFunctionName(() => { }, "#sp") };
