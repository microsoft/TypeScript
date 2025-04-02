//// [tests/cases/compiler/declFileEnums.ts] ////

//// [declFileEnums.ts]
enum e1 {
    a,
    b,
    c
}

enum e2 {
    a = 10,
    b = a + 2,
    c = 10,
}

enum e3 {
    a = 10,
    b = Math.PI,
    c = a + 3
}

enum e4 {
    a,
    b,
    c,
    d = 10,
    e
}

enum e5 {
    "Friday",
    "Saturday",
    "Sunday",
    "Weekend days"
}




//// [declFileEnums.js]
var e1;
(function (e1) {
    e1[e1["a"] = 0] = "a";
    e1[e1["b"] = 1] = "b";
    e1[e1["c"] = 2] = "c";
})(e1 || (e1 = {}));
var e2;
(function (e2) {
    e2[e2["a"] = 10] = "a";
    e2[e2["b"] = 12] = "b";
    e2[e2["c"] = 10] = "c";
})(e2 || (e2 = {}));
var e3;
(function (e3) {
    e3[e3["a"] = 10] = "a";
    e3[e3["b"] = Math.PI] = "b";
    e3[e3["c"] = 13] = "c";
})(e3 || (e3 = {}));
var e4;
(function (e4) {
    e4[e4["a"] = 0] = "a";
    e4[e4["b"] = 1] = "b";
    e4[e4["c"] = 2] = "c";
    e4[e4["d"] = 10] = "d";
    e4[e4["e"] = 11] = "e";
})(e4 || (e4 = {}));
var e5;
(function (e5) {
    e5[e5["Friday"] = 0] = "Friday";
    e5[e5["Saturday"] = 1] = "Saturday";
    e5[e5["Sunday"] = 2] = "Sunday";
    e5[e5["Weekend days"] = 3] = "Weekend days";
})(e5 || (e5 = {}));


//// [declFileEnums.d.ts]
declare enum e1 {
    a = 0,
    b = 1,
    c = 2
}
declare enum e2 {
    a = 10,
    b = 12,
    c = 10
}
declare enum e3 {
    a = 10,
    b,
    c = 13
}
declare enum e4 {
    a = 0,
    b = 1,
    c = 2,
    d = 10,
    e = 11
}
declare enum e5 {
    "Friday" = 0,
    "Saturday" = 1,
    "Sunday" = 2,
    "Weekend days" = 3
}
