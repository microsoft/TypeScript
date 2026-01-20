var x: void;
x = 1;
x = true;
x = '';
x = {}

class C { foo!: string; }
declare var c: C;
x = C;
x = c;

interface I { foo: string; }
declare var i: I;
x = i;

namespace M { export var x = 1; }
x = M;

function f<T>(a: T) {
    x = a;
}
x = f;