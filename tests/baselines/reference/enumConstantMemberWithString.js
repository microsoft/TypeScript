//// [tests/cases/conformance/enums/enumConstantMemberWithString.ts] ////

//// [enumConstantMemberWithString.ts]
enum T1 {
    a = "1",
    b = "1" + "2",
    c = "1" + "2" + "3",
    d = "a" - "a",
    e = "a" + 1
}

enum T2 {
    a = "1",
    b = "1" + "2"
}

enum T3 {
    a = "1",
    b = "1" + "2",
    c = 1,
    d = 1 + 2
}

enum T4 {
    a = "1"
}

enum T5 {
    a = "1" + "2"
}

declare enum T6 {
    a = "1",
    b = "1" + "2"
}


//// [enumConstantMemberWithString.js]
var T1;
(function (T1) {
    T1["a"] = "1";
    T1["b"] = "12";
    T1["c"] = "123";
    T1[T1["d"] = "a" - "a"] = "d";
    T1["e"] = "a1";
})(T1 || (T1 = {}));
var T2;
(function (T2) {
    T2["a"] = "1";
    T2["b"] = "12";
})(T2 || (T2 = {}));
var T3;
(function (T3) {
    T3["a"] = "1";
    T3["b"] = "12";
    T3[T3["c"] = 1] = "c";
    T3[T3["d"] = 3] = "d";
})(T3 || (T3 = {}));
var T4;
(function (T4) {
    T4["a"] = "1";
})(T4 || (T4 = {}));
var T5;
(function (T5) {
    T5["a"] = "12";
})(T5 || (T5 = {}));
