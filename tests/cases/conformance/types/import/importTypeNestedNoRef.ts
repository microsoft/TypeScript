// @declaration: true
// @target: es6
// @noImplicitReferences: true
// @filename: a.d.ts
export type LookAt = "./b";
// @filename: b.d.ts
export type Value = "yes";
// @filename: chainer.ts
export const x: import(import("./a").LookAt).Value = "yes"; // expect outter import to fail, since b.d.ts isn't in the build
