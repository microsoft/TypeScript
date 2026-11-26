//// [tests/cases/conformance/classes/classExpressions/genericClassExpressionInFunction.ts] ////

//// [genericClassExpressionInFunction.ts]
class A<T> {
    genericVar: T
}
function B1<U>() {
    // class expression can use T
    return class extends A<U> { }
}
class B2<V> {
    anon = class extends A<V> { }
}
function B3<W>() {
    return class Inner<TInner> extends A<W> { }
}
// extends can call B
class K extends B1<number>() {
    namae: string;
}
class C extends (new B2<number>().anon) {
    name: string;
}
let b3Number = B3<number>();
class S extends b3Number<string> {
    nom: string;
}
var c = new C();
var k = new K();
var s = new S();
c.genericVar = 12;
k.genericVar = 12;
s.genericVar = 12;


//// [genericClassExpressionInFunction.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class A {
}
function B1() {
    // class expression can use T
    return class extends A {
    };
}
class B2 {
    constructor() {
        var _a;
        this.anon = (_a = class extends A {
            },
            __setFunctionName(_a, "anon"),
            _a);
    }
}
function B3() {
    return class Inner extends A {
    };
}
// extends can call B
class K extends B1() {
}
class C extends (new B2().anon) {
}
let b3Number = B3();
class S extends b3Number {
}
var c = new C();
var k = new K();
var s = new S();
c.genericVar = 12;
k.genericVar = 12;
s.genericVar = 12;
