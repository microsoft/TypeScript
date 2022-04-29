//// [enumIsNotASubtypeOfAnythingButNumber.ts]
// enums are only subtypes of number, any and no other types

enum E { A }
interface I {
    [x: string]: any;
    foo: E; // ok
}


interface I2 {
    [x: string]: number;
    foo: E; // ok
}

// error cases
interface I3 {
    [x: string]: string;
    foo: E;
}


interface I4 {
    [x: string]: boolean;
    foo: E;
}


interface I5 {
    [x: string]: Date;
    foo: E;
}


interface I6 {
    [x: string]: RegExp;
    foo: E;
}


interface I7 {
    [x: string]: { bar: number };
    foo: E;
}


interface I8 {
    [x: string]: number[];
    foo: E;
}


interface I9 {
    [x: string]: I8;
    foo: E;
}

class A { foo: number; }
interface I10 {
    [x: string]: A;
    foo: E;
}

class A2<T> { foo: T; }
interface I11 {
    [x: string]: A2<number>;
    foo: E;
}


interface I12 {
    [x: string]: (x) => number;
    foo: E;
}


interface I13 {
    [x: string]: <T>(x: T) => T;
    foo: E;
}


enum E2 { A }
interface I14 {
    [x: string]: E2;
    foo: E;
}


function f() { }
module f {
    export var bar = 1;
}
interface I15 {
    [x: string]: typeof f;
    foo: E;
}


class c { baz: string }
module c {
    export var bar = 1;
}
interface I16 {
    [x: string]: typeof c;
    foo: E;
}


interface I17<T> {
    [x: string]: T;
    foo: E;
}


interface I18<T, U extends T> {
    [x: string]: U;
    foo: E;
}


interface I19 {
    [x: string]: Object;
    foo: E; // BUG 831833
}


interface I20 {
    [x: string]: {};
    foo: E; // BUG 831833
}

//// [enumIsNotASubtypeOfAnythingButNumber.js]
// enums are only subtypes of number, any and no other types
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var A2 = /** @class */ (function () {
    function A2() {
    }
    return A2;
}());
var E2;
(function (E2) {
    E2[E2["A"] = 0] = "A";
})(E2 || (E2 = {}));
function f() { }
(function (f) {
    f.bar = 1;
})(f || (f = {}));
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
(function (c) {
    c.bar = 1;
})(c || (c = {}));
