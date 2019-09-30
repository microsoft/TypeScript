// @declaration: true
// @target: es6
// @strict: true
// @filename: index.ts
export function foo() {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";

const x: string = foo[_private];
