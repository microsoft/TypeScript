//// [noUnnecessaryCasts1.ts]
const a = {};
let b: {};
b = a as {};
interface Foo {
    x?: string;
}
const foo1: Foo = { x: "ok" } as Foo; // cast technically erases type information, not a no-op
const foo2: Foo = foo1 as Foo;
class A {
    item: any;
}
class B {
    item: any;
}
const aCls = new A();
const bCls = new B();
const aCls2: A = bCls as A;
const bCls2: B = aCls as A;
function foo(x: number): number {
    return x!;
}
const a1 = 2;
a1?.toString!.call(2);
function testRequired() {
    let resolve: (value: unknown) => void
    new Promise(resolve0 => {
        resolve = resolve0
    })
    return resolve! // this non-null assertion is required, removing it causes compiler to hard fail
}
let x: unknown;
x! = 2;
x! = undefined;
let y: number;
y! = 2;


//// [noUnnecessaryCasts1.js]
"use strict";
var a = {};
var b;
b = a;
var foo1 = { x: "ok" }; // cast technically erases type information, not a no-op
var foo2 = foo1;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var aCls = new A();
var bCls = new B();
var aCls2 = bCls;
var bCls2 = aCls;
function foo(x) {
    return x;
}
var a1 = 2;
a1 === null || a1 === void 0 ? void 0 : a1.toString.call(2);
function testRequired() {
    var resolve;
    new Promise(function (resolve0) {
        resolve = resolve0;
    });
    return resolve; // this non-null assertion is required, removing it causes compiler to hard fail
}
var x;
x = 2;
x = undefined;
var y;
y = 2;
