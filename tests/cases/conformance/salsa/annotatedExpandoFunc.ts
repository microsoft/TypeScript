// @noEmit: true
interface F {
    (): 1;
    p: 2;
}
// disallowed
const f: F = () => 1;
f.p = 2;
f.extra = 3
const r1 = f() + f.p
// function expressions are still allowed, by analogy with function declarations
const e = () => 4
e.q = 5
const r2 = e() + e.q
// function declarations are still allowed
function g() {
    return 6
}
g.r = 7
const r3 = g() + g.r
