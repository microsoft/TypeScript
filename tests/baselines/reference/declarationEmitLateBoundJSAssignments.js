//// [tests/cases/compiler/declarationEmitLateBoundJSAssignments.ts] ////

//// [file.js]
export function foo() {}
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";
const strMem = "strMemName";
foo[strMem] = "ok";
const dashStrMem = "dashed-str-mem";
foo[dashStrMem] = "ok";
const numMem = 42;
foo[numMem] = "ok";

/** @type {string} */
const x = foo[_private];
/** @type {string} */
const y = foo[strMem];
/** @type {string} */
const z = foo[numMem];
/** @type {string} */
const a = foo[dashStrMem];




//// [file.d.ts]
export function foo(): void;
export namespace foo {
    let bar: number;
    let strMemName: string;
}
