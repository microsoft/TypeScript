var a: number = null;
var b: boolean = null;
var c: string = null;
var d: void = null;

var e: typeof undefined = null;
e = null; // ok

enum E { A }
E.A = null; // error

class C { foo: string }
var f: C;
f = null; // ok
C = null; // error

interface I { foo: string }
var g: I;
g = null; // ok
I = null; // error

module M { export var x = 1; }
M = null; // error

var h: { f(): void } = null;

function i<T>(a: T) {
    a = null;
}
i = null; // error