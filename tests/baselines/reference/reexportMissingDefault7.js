//// [tests/cases/compiler/reexportMissingDefault7.ts] ////

//// [b.ts]
export const b = null;

//// [a.ts]
export { b } from "./b";
export { default } from "./b";

//// [b.js]
export var b = null;
//// [a.js]
export { b } from "./b";
export { default } from "./b";
