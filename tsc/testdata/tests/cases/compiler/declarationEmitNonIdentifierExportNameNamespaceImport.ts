// @declaration: true
// @Filename: /dep.ts
interface A { x: number }
interface C { y: number }
export { A as "a b", C as "a c", C as Ok };

// @Filename: /mid.ts
import { "a b" as B, "a c" as C } from "./dep";
export declare function f(): B;
export declare function g(): C;

// @Filename: /main1.ts
import * as dep from "./dep";
import { f } from "./mid";
export const v = f();

// @Filename: /main2.ts
import * as dep from "./dep";
import { g } from "./mid";
export const w = g();
