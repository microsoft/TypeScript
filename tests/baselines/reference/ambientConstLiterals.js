//// [tests/cases/compiler/ambientConstLiterals.ts] ////

//// [ambientConstLiterals.ts]
function f<T>(x: T): T {
    return x;
}

enum E { A, B, C, "non identifier" }

const c1 = "abc";
const c2 = 123;
const c3 = c1;
const c4 = c2;
const c5 = f(123);
const c6 = f(-123);
const c7 = true;
const c8 = E.A;
const c8b = E["non identifier"];
const c9 = { x: "abc" };
const c10 = [123];
const c11 = "abc" + "def";
const c12 = 123 + 456;
const c13 = Math.random() > 0.5 ? "abc" : "def";
const c14 = Math.random() > 0.5 ? 123 : 456;

//// [ambientConstLiterals.js]
function f(x) {
    return x;
}
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
    E[E["non identifier"] = 3] = "non identifier";
})(E || (E = {}));
var c1 = "abc";
var c2 = 123;
var c3 = c1;
var c4 = c2;
var c5 = f(123);
var c6 = f(-123);
var c7 = true;
var c8 = E.A;
var c8b = E["non identifier"];
var c9 = { x: "abc" };
var c10 = [123];
var c11 = "abc" + "def";
var c12 = 123 + 456;
var c13 = Math.random() > 0.5 ? "abc" : "def";
var c14 = Math.random() > 0.5 ? 123 : 456;


//// [ambientConstLiterals.d.ts]
declare function f<T>(x: T): T;
declare enum E {
    A = 0,
    B = 1,
    C = 2,
    "non identifier" = 3
}
declare const c1 = "abc";
declare const c2 = 123;
declare const c3 = "abc";
declare const c4 = 123;
declare const c5 = 123;
declare const c6 = -123;
declare const c7 = true;
declare const c8 = E.A;
declare const c8b = E["non identifier"];
declare const c9: {
    x: string;
};
declare const c10: number[];
declare const c11: string;
declare const c12: number;
declare const c13: string;
declare const c14: number;
