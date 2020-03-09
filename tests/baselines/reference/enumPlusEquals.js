//// [enumPlusEquals.ts]
enum E { F = "Foo", B = "Bar" }
let s: string = "Foo";
if (s == E.F) s = s + "";
// this should be fine too (GH#35824): the single `s` should be E.F when
// reading and strnig when writing
if (s == E.F) s += "";

enum E1 { F = "Foo", B = "Bar" }
let s1: string = "Foo";
function foo1(c: E1) {
    if (s == c) s += "";
}

enum E2 { F = "Foo", B = 9 }
let s2: string = "Foo";
function foo2(c: E2) {
    if (s == c) s += "";
}

enum E3 { F = "Foo", B = "Bar" }
let s3: string = "Foo";
function foo3(c: E3) {
    if (s == c) {
        s; // it's an E3
        s += "";
        s; // now it's a string
    }
}


//// [enumPlusEquals.js]
var E;
(function (E) {
    E["F"] = "Foo";
    E["B"] = "Bar";
})(E || (E = {}));
var s = "Foo";
if (s == E.F)
    s = s + "";
// this should be fine too (GH#35824): the single `s` should be E.F when
// reading and strnig when writing
if (s == E.F)
    s += "";
var E1;
(function (E1) {
    E1["F"] = "Foo";
    E1["B"] = "Bar";
})(E1 || (E1 = {}));
var s1 = "Foo";
function foo1(c) {
    if (s == c)
        s += "";
}
var E2;
(function (E2) {
    E2["F"] = "Foo";
    E2[E2["B"] = 9] = "B";
})(E2 || (E2 = {}));
var s2 = "Foo";
function foo2(c) {
    if (s == c)
        s += "";
}
var E3;
(function (E3) {
    E3["F"] = "Foo";
    E3["B"] = "Bar";
})(E3 || (E3 = {}));
var s3 = "Foo";
function foo3(c) {
    if (s == c) {
        s; // it's an E3
        s += "";
        s; // now it's a string
    }
}
