// @Filename: a.ts
export type A = "a";

// @Filename: b.ts
import type { A } from "./a";
const A: A = "a";
A.toUpperCase();
