// @strictNullChecks: true
// Fixes #15116, which asserted on line 5 but not 6
declare function f<T>(a: T, b: T): boolean;
function g(gut: { n: 12 | undefined }) {
    f(gut.n, 12); // error, no common supertype
    f(12, gut.n); // error, no common supertype
}
