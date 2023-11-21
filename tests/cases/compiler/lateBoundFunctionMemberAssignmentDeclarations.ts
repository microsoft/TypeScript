// @declaration: true
// @target: es6
// @strict: true
// @isolatedDeclarationFixedDiffReason: Function declarations are not fixed
// @filename: index.ts
export function foo() {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";

const x: string = foo[_private];
