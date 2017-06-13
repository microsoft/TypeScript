// @strictNullChecks: true
// Fixes #15116, which asserted on line 5 but not 6
declare function f<T>(a: T, b: T): boolean;
function g(gut: { n: 12 | undefined }) {
    f(gut.n, 12); // ok, T = number | undefined
    f(12, gut.n); // ok, T = number | undefined
}
