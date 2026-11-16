// @module: commonjs
// @target: es2020

// @filename: /a.ts
export function f(this: unknown, ...args: any[]) { return this; }

// @filename: /index.ts
import { f } from "./a";
type F = () => unknown;
console.log(f() === undefined);
console.log((f)() === undefined);
console.log((f as F)() === undefined);
console.log((f!)() === undefined);
console.log((f satisfies F)() === undefined);
console.log((f)`x` === undefined);
