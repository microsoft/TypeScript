// @noEmit: true

// @Filename: other.ts
export type A = string;
function A() {}
export { A };

export type B = string;
var B = 10;
export { B };

// @Filename: main.ts
import { A, B } from "./other";

A();

export const C = B;
