// @strict: true
// @noEmit: true

declare function q(x: object): x is { b: number };

function foo<T extends { a: string } | { b: number }>(x: T): T extends { a: string } ? number : (string | number) {
    if (q(x)) {
        x.b;
        return "";
    }
}

let y = { a: "", b: 1 }
const r = foo<{ a: string }>(y); // number