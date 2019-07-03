// Typical case
class Foo {
    prop1: string;
}

let foo: Foo | number;
if (foo.constructor == Foo) {
    foo.prop1; // string
}
if (foo["constructor"] == Foo) {
    foo.prop1; // string
}
if (foo.constructor === Foo) {
    foo.prop1; // string
}
if (foo["constructor"] === Foo) {
    foo.prop1; // string
}
if (Foo == foo.constructor) {
    foo.prop1; // string
}
if (Foo == foo["constructor"]) {
    foo.prop1; // string
}
if (Foo === foo.constructor) {
    foo.prop1; // string
}
if (Foo === foo["constructor"]) {
    foo.prop1; // string
}

if (foo.constructor != Foo) {
    foo.prop1; // ERROR
}
if (foo["constructor"] != Foo) {
    foo.prop1; // ERROR
}
if (foo.constructor !== Foo) {
    foo.prop1; // ERROR
}
if (foo["constructor"] !== Foo) {
    foo.prop1; // ERROR
}
if (Foo != foo.constructor) {
    foo.prop1; // ERROR
}
if (Foo != foo["constructor"]) {
    foo.prop1; // ERROR
}
if (Foo !== foo.constructor) {
    foo.prop1; // ERROR
}
if (Foo !== foo["constructor"]) {
    foo.prop1; // ERROR
}


// Derived class case
class Bar extends Foo {
    prop2: number;
}

let bar: Bar | boolean;
if (bar.constructor === Bar) {
    bar.prop1; // string
    bar.prop2; // number
}
if (bar.constructor === Foo) {
    bar.prop1; // string
    bar.prop2; // number
}


// Union of primitives, number, arrays, and Foo
var x: number | "hello" | "world" | true | false | number[] | string[] | Foo;

if (x.constructor === Number) {
    x; // number
}

if (x.constructor === String) {
    x; // "hello" | "world"
}

if (x.constructor === Boolean) {
    x; // boolean
}

if (x.constructor === Array) {
    x; // number[] | string[]
}

if (x.constructor === Function) {
    x; // declaredType
}

if (x.constructor === Foo) {
    x; // Foo
    x.prop1; // string
}


// Narrowing any
let a: any;

if (a.constructor === Foo) {
    a; // Foo
}
if (a.constructor === "hello") {
    a; // any
}
if (a.constructor === Function) {
    a; // any
}


// If for some reason someone defines a type with it's own constructor property
type S = {
    constructor: () => void;
};

let s: S | string;

if (s.constructor === String) {
    s; // string
}
