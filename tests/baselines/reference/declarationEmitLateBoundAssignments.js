//// [tests/cases/compiler/declarationEmitLateBoundAssignments.ts] ////

//// [declarationEmitLateBoundAssignments.ts]
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

const x: string = foo[_private];
const y: string = foo[strMem];
const z: string = foo[numMem];
const a: string = foo[dashStrMem];

//// [declarationEmitLateBoundAssignments.js]
export function foo() { }
foo.bar = 12;
const _private = Symbol();
foo[_private] = "ok";
const strMem = "strMemName";
foo[strMem] = "ok";
const dashStrMem = "dashed-str-mem";
foo[dashStrMem] = "ok";
const numMem = 42;
foo[numMem] = "ok";
const x = foo[_private];
const y = foo[strMem];
const z = foo[numMem];
const a = foo[dashStrMem];


//// [declarationEmitLateBoundAssignments.d.ts]
export declare function foo(): void;
export declare namespace foo {
    var bar: number;
    var strMemName: string;
}
