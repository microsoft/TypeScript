//// [recursiveFunctionTypes.ts]
function fn(): typeof fn { return 1; }

var x: number = fn; // error
var y: () => number = fn; // ok

var f: () => typeof g;
var g: () => typeof f;

function f1(d: typeof f1) { }

function f2(): typeof g2 { } 
function g2(): typeof f2 { } 

interface I<T> { }
function f3(): I<typeof f3> { return f3; }

var a: number = f3; // error

class C {
     static g(t: typeof C.g){ }
}
C.g(3); // error

var f4: () => typeof f4;
f4 = 3; // error

function f5() { return f5; }

function f6(): typeof f6;
function f6(a: typeof f6): () => number;
function f6(a?: any) { return f6; }

f6("", 3); // error (arity mismatch)
f6(""); // ok (function takes an any param)
f6(); // ok

declare function f7(): typeof f7;
declare function f7(a: typeof f7): () => number;
declare function f7(a: number): number;
declare function f7(a?: typeof f7): typeof f7;

f7("", 3); // error (arity mismatch)
f7(""); // ok (function takes an any param)
f7(); // ok

//// [recursiveFunctionTypes.js]
function fn() { return 1; }
var x = fn; // error
var y = fn; // ok
var f;
var g;
function f1(d) { }
function f2() { }
function g2() { }
function f3() { return f3; }
var a = f3; // error
var C = /** @class */ (function () {
    function C() {
    }
    C.g = function (t) { };
    return C;
}());
C.g(3); // error
var f4;
f4 = 3; // error
function f5() { return f5; }
function f6(a) { return f6; }
f6("", 3); // error (arity mismatch)
f6(""); // ok (function takes an any param)
f6(); // ok
f7("", 3); // error (arity mismatch)
f7(""); // ok (function takes an any param)
f7(); // ok
