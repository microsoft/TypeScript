// @declaration: true
// @module: esnext
// @target: esnext

// @filename: dep.ts
interface A { x: number }
interface C { y: number }
export { A as "a b", C as "a c", C as Ok };

// @filename: mid.ts
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;

// @filename: main.ts
import { f, g } from "./mid";
export const v = f();
export const w = g();
