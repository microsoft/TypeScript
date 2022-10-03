// @esModuleInterop: true
// @filename: b.ts
export const b = null;

// @filename: a.ts
export { b } from "./b";
export { default } from "./b";
