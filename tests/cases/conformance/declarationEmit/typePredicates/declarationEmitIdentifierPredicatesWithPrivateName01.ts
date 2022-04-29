// @declaration: true
// @module: commonjs

interface I {
    a: number;
}

export function f(x: any): x is I {
    return typeof x.a === "number";
}