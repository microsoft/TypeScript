// @declaration: true
// @noImplicitAny: true
// @module: commonjs

// @filename: file1.ts
export type A = "A";
export type B = "B";

export const a = "A";
export const b = "B";

// @filename: file2.ts
import * as file1 from "./file1";

const a: file1.A = file1.a;
const b: file1.B = file1.b;

let aOrB: file1.A | file1.B;
aOrB = file1.a;
aOrB = file1.b;
