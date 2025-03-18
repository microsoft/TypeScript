//// [tests/cases/conformance/types/specifyingTypes/typeReferences/genericTypeReferenceWithoutTypeArgument2.ts] ////

//// [genericTypeReferenceWithoutTypeArgument2.ts]
// it is an error to use a generic type without type arguments
// all of these are errors 

interface I<T> {
    foo: T;
}

var c: I;

var a: { x: I };
var b: { (x: I): I };
var d: { [x: I]: I };

var e = (x: I) => { var y: I; return y; }

function f(x: I): I { var y: I; return y; }

var g = function f(x: I): I { var y: I; return y; }

class D extends I {
}

interface U extends I {}

module M {
    export interface E<T> { foo: T }
}

class D2 extends M.C { }
interface D3<T extends M.E> { }
interface I2 extends M.C { }

function h<T extends I>(x: T) { }
function i<T extends M.E>(x: T) { }

var j = <C>null;
var k = <M.E>null;

//// [genericTypeReferenceWithoutTypeArgument2.js]
var c;
var a;
var b;
var d;
var e = (x) => { var y; return y; };
function f(x) { var y; return y; }
var g = function f(x) { var y; return y; };
class D extends I {
}
class D2 extends M.C {
}
function h(x) { }
function i(x) { }
var j = null;
var k = null;
