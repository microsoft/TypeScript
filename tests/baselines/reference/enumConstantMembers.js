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
