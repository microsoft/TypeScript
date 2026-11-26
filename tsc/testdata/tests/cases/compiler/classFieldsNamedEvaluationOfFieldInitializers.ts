// @target: es2015, es2022
// @useDefineForClassFields: true, false
// @noTypesAndSymbols: true

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
