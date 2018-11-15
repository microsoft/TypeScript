// @noUnusedLocals: true
// @noUnusedParameters: true

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
interface I { x: I };
type T = { x: T };
namespace N { N; }

// Avoid a false positive.
// Previously `T` was considered unused due to merging with the property,
// back when all non-blocks were checked for recursion.
export interface A<T> { T: T }

class P { private m() { this.m; } }
P;

// Does not detect mutual recursion.
function g() { D; }
class D { m() { g; } }
