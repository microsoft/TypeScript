//// [enumConstantMembers.ts]
// Enum members with no initilizer increment from last valid constant value.
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
    b // b is 1.1
}

declare enum E4 {
    a = 1,
    b = -1,
    c = 0.1,
    d, // d is 1.1
    e = invalid,
    f // f is 2.1
}

const enum E5 {
    a = 1,
    b = -1,
    c = 0.1,
    d, // d is 1.1
    e = invalid,
    f // f is 2.1
}


//// [enumConstantMembers.js]
// Enum members with no initilizer increment from last valid constant value.
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
    E3[E3["b"] = 1.1] = "b"; // b is 1.1
})(E3 || (E3 = {}));
