//// [typeGuardConstructor.ts]
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


//// [typeGuardConstructor.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Typical case
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var foo;
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
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar;
}(Foo));
var bar;
if (bar.constructor === Bar) {
    bar.prop1; // string
    bar.prop2; // number
}
if (bar.constructor === Foo) {
    bar.prop1; // string
    bar.prop2; // number
}
// Union of primitives, number, arrays, and Foo
var x;
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
var a;
if (a.constructor === Foo) {
    a; // Foo
}
if (a.constructor === "hello") {
    a; // any
}
if (a.constructor === Function) {
    a; // any
}
var s;
if (s.constructor === String) {
    s; // string
}
