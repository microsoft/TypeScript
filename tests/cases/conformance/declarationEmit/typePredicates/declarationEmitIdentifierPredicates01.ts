// @declaration: true
// @module: commonjs

export function f(x: any): x is number {
    return typeof x === "number";
}