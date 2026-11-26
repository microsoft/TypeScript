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
var _a, _b, _c, _d;
class C {
    constructor() {
        this.f = function () { };
        this.g = () => { };
        this.c = class {
        };
        this["s t"] = () => { };
        this[1] = () => { };
        this["lit"] = () => { };
        this[_a] = () => { };
        this[_b] = function () { };
        this.#p = () => { };
        // A computed key is evaluated once, when the class is defined.
        this[_d] = class {
            static { this.y = 1; }
        };
        // Not anonymous function definitions: nothing to name.
        this.named = function named() { };
        this.conditional = Math.random() ? () => { } : undefined;
    }
    static { _a = k, _b = sym, _c = j, _d = i; }
    #p;
    static { this.s = function () { }; }
    static { this[_c] = () => { }; }
    static #sp = () => { };
}
