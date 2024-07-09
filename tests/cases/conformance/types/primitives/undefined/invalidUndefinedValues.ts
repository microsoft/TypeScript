var x: typeof undefined;

x = 1;
x = '';
x = true;
var a: void;
x = a;
x = null;

class C { foo: string }
var b: C;
x = C;
x = b;

interface I { foo: string }
var c: I;
x = c;

module M { export var x = 1; }
x = M;

x = { f() { } }

function f<T>(a: T) {
    x = a;
}
x = f;

enum E { A }
x = E;
x = E.A;