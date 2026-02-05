// @target: es2015
// @module: commonjs
// @strict: false
// @lib: es6
// @filename: bar.ts
export async function foo({ foo = await import("./bar") }) {
}

export function* foo2({ foo = yield "a" }) {
}
