// @noUnusedLocals: true

export {}; // Make this a module scope, so these are local variables.

function f() { f; }
class C {
    m() { C; }
}
enum E { A = 0, B = E.A }

// Does not detect mutual recursion.
function g() { D; }
class D { m() { g; } }

// Does not work on private methods.
class P { private m() { this.m; } }
P;
