var x: typeof undefined;

enum E { A }
E = x;
E.A = x;

class C { foo: string }
var f: C;
C = x;

interface I { foo: string }
var g: I;
g = x;
I = x;

module M { export var x = 1; }
M = x;

function i<T>(a: T) { }
// BUG 767030
i = x; 