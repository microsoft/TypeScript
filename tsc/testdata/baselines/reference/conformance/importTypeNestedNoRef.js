//// [tests/cases/conformance/types/import/importTypeNestedNoRef.ts] ////

//// [a.d.ts]
export type LookAt = "./b";
//// [b.d.ts]
export type Value = "yes";
//// [chainer.ts]
export const x: import(import("./a").LookAt).Value = "yes"; // expect outter import to fail, since b.d.ts isn't in the build


//// [chainer.js]
export const x = "yes"; // expect outter import to fail, since b.d.ts isn't in the build


//// [chainer.d.ts]
export declare const x: import(import("./a").LookAt).Value;
