//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypesOfAny.ts] ////

//// [subtypesOfAny.ts]
// every type is a subtype of any, no errors expected

interface I {
    [x: string]: any;
    foo: any;
}


interface I2 {
    [x: string]: any;
    foo: number;
}


interface I3 {
    [x: string]: any;
    foo: string;
}


interface I4 {
    [x: string]: any;
    foo: boolean;
}


interface I5 {
    [x: string]: any;
    foo: Date;
}


interface I6 {
    [x: string]: any;
    foo: RegExp;
}


interface I7 {
    [x: string]: any;
    foo: { bar: number };
}


interface I8 {
    [x: string]: any;
    foo: number[];
}


interface I9 {
    [x: string]: any;
    foo: I8;
}

class A { foo: number; }
interface I10 {
    [x: string]: any;
    foo: A;
}

class A2<T> { foo: T; }
interface I11 {
    [x: string]: any;
    foo: A2<number>;
}


interface I12 {
    [x: string]: any;
    foo: (x) => number;
}


interface I13 {
    [x: string]: any;
    foo: <T>(x:T) => T;
}


enum E { A }
interface I14 {
    [x: string]: any;
    foo: E;
}


function f() { }
module f {
    export var bar = 1;
}
interface I15 {
    [x: string]: any;
    foo: typeof f;
}


class c { baz: string }
module c {
    export var bar = 1;
}
interface I16 {
    [x: string]: any;
    foo: typeof c;
}


interface I17<T> {
    [x: string]: any;
    foo: T;
}


interface I18<T, U> {
    [x: string]: any;
    foo: U;
}
//interface I18<T, U extends T> {
//    [x: string]: any;
//    foo: U;
//}


interface I19 {
    [x: string]: any;
    foo: Object;
}


interface I20 {
    [x: string]: any;
    foo: {};
}

//// [subtypesOfAny.js]
// every type is a subtype of any, no errors expected
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
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
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
