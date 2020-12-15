//@strictFunctionTypes: true

interface S {
    f(a: number | string): void;
}
declare const S: S;
function g(a: number): void { }

// Force type resolution
g;
S.f;

const arr: Array<(a: number | string) => void> = [g, S.f];