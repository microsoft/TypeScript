//// [tests/cases/compiler/reexportMissingDefault3.ts] ////

//// [b.ts]
export const b = null;

//// [a.ts]
export { b } from "./b";
export { default as a } from "./b";

//// [b.js]
export const b = null;
//// [a.js]
export { b } from "./b";
export { default as a } from "./b";
