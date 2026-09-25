// @strict: true
// @declaration: true

// @filename: mapped.ts
export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };

// @filename: usage.ts
import type { M } from "./mapped.js";
declare const array: M<string[]>;
declare const tuple: M<[string]>;
export const a = array[0];
export const b = tuple[0];
