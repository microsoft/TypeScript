//// [subtypeReduceBivariance2.ts]
interface S {
    f(a: number | string): void;
}
declare const S: S;
function g(a: number): void { }

// Force type resolution
S.f;
g;

const arr: Array<(a: number | string) => void> = [g, S.f];

//// [subtypeReduceBivariance2.js]
function g(a) { }
// Force type resolution
S.f;
g;
var arr = [g, S.f];
