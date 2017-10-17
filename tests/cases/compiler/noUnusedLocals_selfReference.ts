// @noUnusedLocals: true

export {}; // Make this a module scope, so these are local variables.

function f() {
    f;
    function g() {
        g;
    }
}
class C {
    m() { C; }
}
enum E { A = 0, B = E.A }

class P { private m() { this.m; } }
P;

// Does not detect mutual recursion.
function g() { D; }
class D { m() { g; } }
