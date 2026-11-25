// @declaration: true
// @module: esnext
// @target: esnext

// @filename: node_modules/dep/src/internal/a.d.ts
interface A { x: number }
export { A as Ok };

// @filename: node_modules/dep/index.d.ts
export { Ok as "a b" } from "./src/internal/a";

// @filename: node_modules/mid/index.d.ts
import { Ok } from "dep/src/internal/a";
export declare function f(): Ok;

// @filename: main.ts
import { f } from "mid";
export const v = f();
