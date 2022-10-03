// @filename: b.d.ts
declare var b: number;
export { b };

// @filename: a.ts
export { b } from "./b";
export { default } from "./b";