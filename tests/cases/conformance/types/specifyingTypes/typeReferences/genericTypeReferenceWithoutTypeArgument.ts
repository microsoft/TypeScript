// it is an error to use a generic type without type arguments
// all of these are errors 

class C<T> {
    foo: T;
}

var c: C;

var a: { x: C };
var b: { (x: C): C };
var d: { [x: C]: C };

var e = (x: C) => { var y: C; return y; }

function f(x: C): C { var y: C; return y; }

var g = function f(x: C): C { var y: C; return y; }

class D extends C {
}

interface I extends C {}

module M {
    export class E<T> { foo: T }
}

class D2 extends M.E { }
class D3<T extends M.E> { }
interface I2 extends M.E { }

function h<T extends C>(x: T) { }
function i<T extends M.E>(x: T) { }

var j = <C>null;
var k = <M.E>null;