//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithObjectTypeArgsAndConstraints.ts] ////

//// [genericCallWithObjectTypeArgsAndConstraints.ts]
// Generic call with constraints infering type parameter from object member properties
// No errors expected

class C {
    x: string;
}

class D {
    x: string;
    y: string;
}

class X<T> {
    x: T;
}

function foo<T extends { x: string }>(t: X<T>, t2: X<T>) {
    var x: T;
    return x;
}

var c1 = new X<C>();
var d1 = new X<D>();
var r = foo(c1, d1); 
var r2 = foo(c1, c1);

function foo2<T extends C>(t: X<T>, t2: X<T>) {
    var x: T;
    return x;
}

var r = foo2(c1, d1); 
var r2 = foo2(c1, c1);

//// [genericCallWithObjectTypeArgsAndConstraints.js]
// Generic call with constraints infering type parameter from object member properties
// No errors expected
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
function foo(t, t2) {
    var x;
    return x;
}
var c1 = new X();
var d1 = new X();
var r = foo(c1, d1);
var r2 = foo(c1, c1);
function foo2(t, t2) {
    var x;
    return x;
}
var r = foo2(c1, d1);
var r2 = foo2(c1, c1);
