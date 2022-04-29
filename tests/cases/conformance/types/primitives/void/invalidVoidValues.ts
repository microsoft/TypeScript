var x: void;
x = 1;
x = '';
x = true;

enum E { A }
x = E;
x = E.A;

class C { foo: string }
var a: C;
x = a;

interface I { foo: string }
var b: I;
x = b;

x = { f() {} }

module M { export var x = 1; }
x = M;

function f<T>(a: T) {
    x = a;
}
x = f;