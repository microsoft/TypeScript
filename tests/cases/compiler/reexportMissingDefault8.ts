// @esModuleInterop: true
// @filename: b.ts
const b = null;
export = b;

// @filename: a.ts
export { default } from "./b";