// @module: commonjs

// @filename: a.ts
export interface A { }

// @filename: b.ts
import { A } from "./a"
export function f(): A {
    return {};
}
export { f as fV2 };
