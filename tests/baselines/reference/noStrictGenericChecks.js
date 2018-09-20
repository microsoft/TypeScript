//// [noStrictGenericChecks.ts]
type A = <T, U>(x: T, y: U) => [T, U];
type B = <S>(x: S, y: S) => [S, S];

function f(a: A, b: B) {
    a = b;  // Error disabled here
    b = a;  // Ok
}


//// [noStrictGenericChecks.js]
function f(a, b) {
    a = b; // Error disabled here
    b = a; // Ok
}
