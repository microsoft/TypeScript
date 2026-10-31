// @target: es2015
// @noCheck: true
// @emitDeclarationOnly: true
// @declaration: true

const k = "bar";
export function foo() {}
foo[k] = 1;
