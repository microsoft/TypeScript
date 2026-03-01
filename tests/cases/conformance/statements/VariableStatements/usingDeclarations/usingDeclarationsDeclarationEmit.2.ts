// @target: esnext
// @module: esnext
// @declaration: true
// @noTypesAndSymbols: true

using r1 = { [Symbol.dispose]() {} };
export type R1 = typeof r1;

await using r2 = { async [Symbol.asyncDispose]() {} };
export type R2 = typeof r2;
