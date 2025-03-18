//// [tests/cases/compiler/lateBoundFunctionMemberAssignmentDeclarations.ts] ////

//// [index.ts]
export function foo() {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";

const x: string = foo[_private];


//// [index.js]
export function foo() { }
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";
const x = foo[_private];
