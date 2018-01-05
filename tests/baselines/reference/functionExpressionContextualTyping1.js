//// [functionExpressionContextualTyping1.ts]
// When a function expression with no type parameters and no parameter type annotations 
// is contextually typed (section 4.19) by a type T and a contextual signature S can be extracted from T

enum E { red, blue }

// A contextual signature S is extracted from a function type T as follows:
//      If T is a function type with exactly one call signature, and if that call signature is non- generic, S is that signature.

var a0: (n: number, s: string) => number = (num, str) => {
    num.toExponential();
    return 0;
}

class Class<T> {
    foo() { }
}

var a1: (c: Class<Number>) => number = (a1) => {
    a1.foo();
    return 1;
}

// A contextual signature S is extracted from a function type T as follows:
//      If T is a union type, let U be the set of element types in T that have call signatures.
//        If each type in U has exactly one call signature and that call signature is non- generic,
//        and if all of the signatures are identical ignoring return types,
//        then S is a signature with the same parameters and a union of the return types.
var b1: ((s: string, w: boolean) => void) | ((s: string, w: boolean) => string);
b1 = (k, h) => { };
var b2: typeof a0 | ((n: number, s: string) => string);
b2 = (foo, bar) => { return foo + 1; }
b2 = (foo, bar) => { return "hello"; }
var b3: (name: string, num: number, boo: boolean) => void;
b3 = (name, number) => { };

var b4: (n: E) => string = (number = 1) => { return "hello"; };
var b5: (n: {}) => string = (number = "string") => { return "hello"; };

// A contextual signature S is extracted from a function type T as follows:
//      Otherwise, no contextual signature can be extracted from T and S is undefined.
var b6: ((s: string, w: boolean) => void) | ((n: number) => number);
var b7: ((s: string, w: boolean) => void) | ((s: string, w: number) => string);
b6 = (k) => { k.toLowerCase() };
b6 = (i) => {
    i.toExponential();
    return i;
};                   // Per spec, no contextual signature can be extracted in this case. (Otherwise clause)
b7 = (j, m) => { };  // Per spec, no contextual signature can be extracted in this case. (Otherwise clause)

class C<T, U> {
    constructor() {
        var k: ((j: T, k: U) => (T|U)[]) | ((j: number,k :U) => number[]) = (j, k) => {
            return [j, k];
        }   // Per spec, no contextual signature can be extracted in this case.
    }
}

//// [functionExpressionContextualTyping1.js]
// When a function expression with no type parameters and no parameter type annotations 
// is contextually typed (section 4.19) by a type T and a contextual signature S can be extracted from T
var E;
(function (E) {
    E[E["red"] = 0] = "red";
    E[E["blue"] = 1] = "blue";
})(E || (E = {}));
// A contextual signature S is extracted from a function type T as follows:
//      If T is a function type with exactly one call signature, and if that call signature is non- generic, S is that signature.
var a0 = function (num, str) {
    num.toExponential();
    return 0;
};
var Class = /** @class */ (function () {
    function Class() {
    }
    Class.prototype.foo = function () { };
    return Class;
}());
var a1 = function (a1) {
    a1.foo();
    return 1;
};
// A contextual signature S is extracted from a function type T as follows:
//      If T is a union type, let U be the set of element types in T that have call signatures.
//        If each type in U has exactly one call signature and that call signature is non- generic,
//        and if all of the signatures are identical ignoring return types,
//        then S is a signature with the same parameters and a union of the return types.
var b1;
b1 = function (k, h) { };
var b2;
b2 = function (foo, bar) { return foo + 1; };
b2 = function (foo, bar) { return "hello"; };
var b3;
b3 = function (name, number) { };
var b4 = function (number) {
    if (number === void 0) { number = 1; }
    return "hello";
};
var b5 = function (number) {
    if (number === void 0) { number = "string"; }
    return "hello";
};
// A contextual signature S is extracted from a function type T as follows:
//      Otherwise, no contextual signature can be extracted from T and S is undefined.
var b6;
var b7;
b6 = function (k) { k.toLowerCase(); };
b6 = function (i) {
    i.toExponential();
    return i;
}; // Per spec, no contextual signature can be extracted in this case. (Otherwise clause)
b7 = function (j, m) { }; // Per spec, no contextual signature can be extracted in this case. (Otherwise clause)
var C = /** @class */ (function () {
    function C() {
        var k = function (j, k) {
            return [j, k];
        }; // Per spec, no contextual signature can be extracted in this case.
    }
    return C;
}());
