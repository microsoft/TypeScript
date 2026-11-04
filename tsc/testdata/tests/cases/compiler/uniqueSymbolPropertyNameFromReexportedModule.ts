// @strict: true
// @filename: b.ts
export const key: unique symbol = Symbol();

// @filename: c.ts
export { key } from "./b";

// @filename: a.ts
import { key } from "./c";
declare const o: {};
o[key];
