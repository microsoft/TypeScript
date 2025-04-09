//// [tests/cases/compiler/sourceMapValidationEnums.ts] ////

//// [sourceMapValidationEnums.ts]
enum e {
    x,
    y,
    x
}
enum e2 {
    x = 10,
    y = 10,
    z,
    x2
}
enum e3 {
}

//// [sourceMapValidationEnums.js]
var e;
(function (e) {
    e[e["x"] = 0] = "x";
    e[e["y"] = 1] = "y";
    e[e["x"] = 2] = "x";
})(e || (e = {}));
var e2;
(function (e2) {
    e2[e2["x"] = 10] = "x";
    e2[e2["y"] = 10] = "y";
    e2[e2["z"] = 11] = "z";
    e2[e2["x2"] = 12] = "x2";
})(e2 || (e2 = {}));
var e3;
(function (e3) {
})(e3 || (e3 = {}));
//# sourceMappingURL=sourceMapValidationEnums.js.map