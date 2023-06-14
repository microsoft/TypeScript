//// [tests/cases/conformance/enums/enumConstantMembers.ts] ////

//// [enumConstantMembers.ts]
// Constant members allow negatives, but not decimals. Also hex literals are allowed
enum E1 {
    a = 1,
    b
}
enum E2 {
    a = - 1,
    b
}
enum E3 {
    a = 0.1,
    b // Error because 0.1 is not a constant
}

declare enum E4 {
    a = 1,
    b = -1,
    c = 0.1 // Not a constant
}

enum E5 {
    a = 1 / 0,
    b = 2 / 0.0,
    c = 1.0 / 0.0,
    d = 0.0 / 0.0,
    e = NaN,
    f = Infinity,
    g = -Infinity
}

const enum E6 {
    a = 1 / 0,
    b = 2 / 0.0,
    c = 1.0 / 0.0,
    d = 0.0 / 0.0,
    e = NaN,
    f = Infinity,
    g = -Infinity
}


//// [enumConstantMembers.js]
// Constant members allow negatives, but not decimals. Also hex literals are allowed
var E1;
(function (E1) {
    E1[E1["a"] = 1] = "a";
    E1[E1["b"] = 2] = "b";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["a"] = -1] = "a";
    E2[E2["b"] = 0] = "b";
})(E2 || (E2 = {}));
var E3;
(function (E3) {
    E3[E3["a"] = 0.1] = "a";
    E3[E3["b"] = 1.1] = "b"; // Error because 0.1 is not a constant
})(E3 || (E3 = {}));
var E5;
(function (E5) {
    E5[E5["a"] = Infinity] = "a";
    E5[E5["b"] = Infinity] = "b";
    E5[E5["c"] = Infinity] = "c";
    E5[E5["d"] = NaN] = "d";
    E5[E5["e"] = NaN] = "e";
    E5[E5["f"] = Infinity] = "f";
    E5[E5["g"] = -Infinity] = "g";
})(E5 || (E5 = {}));
