// @target: esnext
// @module: esnext
// @declaration: true
// @filename: sub.ts
export function a() {}
// @filename: index.ts
export const x = add(import("./sub"));
export * as Q from "./sub";
declare function add<T>(x: Promise<T>): T;