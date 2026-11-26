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
var _a, _b, _c, _d;
class C {
    constructor() {
        this.f = __setFunctionName(function () { }, "f");
        this.g = __setFunctionName(() => { }, "g");
        this.c = class {
            static { __setFunctionName(this, "c"); }
        };
        this["s t"] = __setFunctionName(() => { }, "s t");
        this[1] = __setFunctionName(() => { }, "1");
        this["lit"] = __setFunctionName(() => { }, "lit");
        this[_a] = __setFunctionName(() => { }, _a);
        this[_b] = __setFunctionName(function () { }, _b);
        this.#p = __setFunctionName(() => { }, "#p");
        // A computed key is evaluated once, when the class is defined.
        this[_d] = class {
            static { __setFunctionName(this, _d); }
            static { this.y = 1; }
        };
        // Not anonymous function definitions: nothing to name.
        this.named = function named() { };
        this.conditional = Math.random() ? () => { } : undefined;
    }
    static { _a = __propKey(k), _b = __propKey(sym), _c = __propKey(j), _d = __propKey(i); }
    #p;
    static { this.s = __setFunctionName(function () { }, "s"); }
    static { this[_c] = __setFunctionName(() => { }, _c); }
    static #sp = () => { };
}
