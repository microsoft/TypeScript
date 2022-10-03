//// [tests/cases/conformance/types/import/importTypeNested.ts] ////

//// [a.d.ts]
export type LookAt = "./b";
//// [b.d.ts]
export type Value = "yes";
//// [chainer.ts]
export const x: import(import("./a").LookAt).Value = "yes";


//// [chainer.js]
export const x = "yes";


//// [chainer.d.ts]
export declare const x: import(import("./a").LookAt).Value;
