// @declaration: true
// @target: es6
// @filename: a.d.ts
export type LookAt = "./b";
// @filename: b.d.ts
export type Value = "yes";
// @filename: chainer.ts
export const x: import(import("./a").LookAt).Value = "yes";
