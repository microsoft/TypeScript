//// [tests/cases/compiler/returnTypeTypeArguments.ts] ////

//// [returnTypeTypeArguments.ts]
class One<T>{
    value: T;
}
class Two<T, U>{
    value: T;
    id: U;
}
class Three<T, U, V>{
    value: T;
    id: U;
    name: V;
}

function A1(): One { return null; }
function A2(): Two { return null; }
function A3(): Three { return null; }

function B1(): Two<number> { return null; }
function B2(): Three<string> { return null; }
function B3(): Three<string, number> { return null; }

class C {
    A1(): One { return null; }
    A2(): Two { return null; }
    A3(): Three { return null; }

    B1(): Two<number> { return null; }
    B2(): Three<string> { return null; }
    B3(): Three<string, number> { return null; }
}

class D<T> {
    A2(): Two<T> { return null; }
    A3(): Three<T> { return null; }

    B1(): Two<T> { return null; }
    B2(): Three<T> { return null; }
    B3(): Three<string, T> { return null; }
}

interface I<T> {
    value: T;
}

class Y<T>
{
    value: T;
}

class X<T>
{
    p1: () => X;
    p2: { [idx: number]: X }
    p3: X[]
    p4: I<X>
    p5: X
    p6: () => Y;
    p7: { [idx: number]: Y }
    p8: Y[]
    p9: I<Y>
    pa: Y
}

declare var a: {
    p1: () => X;
    p2: { [idx: number]: X }
    p3: X[]
    p4: I<X>
    p5: X
    p6: () => Y;
    p7: { [idx: number]: Y }
    p8: Y[]
    p9: I<Y>
    pa: Y
};


//// [returnTypeTypeArguments.js]
var One = /** @class */ (function () {
    function One() {
    }
    return One;
}());
var Two = /** @class */ (function () {
    function Two() {
    }
    return Two;
}());
var Three = /** @class */ (function () {
    function Three() {
    }
    return Three;
}());
function A1() { return null; }
function A2() { return null; }
function A3() { return null; }
function B1() { return null; }
function B2() { return null; }
function B3() { return null; }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.A1 = function () { return null; };
    C.prototype.A2 = function () { return null; };
    C.prototype.A3 = function () { return null; };
    C.prototype.B1 = function () { return null; };
    C.prototype.B2 = function () { return null; };
    C.prototype.B3 = function () { return null; };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.A2 = function () { return null; };
    D.prototype.A3 = function () { return null; };
    D.prototype.B1 = function () { return null; };
    D.prototype.B2 = function () { return null; };
    D.prototype.B3 = function () { return null; };
    return D;
}());
var Y = /** @class */ (function () {
    function Y() {
    }
    return Y;
}());
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
